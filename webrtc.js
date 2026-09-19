/**
 * WEBRTC & P2P CONNECTION MANAGER (P2PClient)
 * Gerencia a sinalização PeerJS, DataChannel direto e chamadas de mídia (áudio/vídeo).
 */

class P2PClient {
  constructor() {
    this.peer = null;
    this.dataConnection = null;
    this.mediaConnection = null;
    this.localStream = null;
    this.remoteStream = null;
    this.myPeerId = null;
    this.remotePeerId = null;
    this.myNickname = 'Utilizador';
    this.remoteNickname = 'Par';
    this.myAvatar = null;
    this.remoteAvatar = null;

    // File transfer state
    this.incomingFiles = new Map(); // fileId -> { meta, chunks: [], receivedBytes }
    this.CHUNK_SIZE = 64 * 1024; // 64 KB por pedaço

    // Ping / Latency & Heartbeat Watchdog
    this.pingInterval = null;
    this.currentLatency = null;
    this.lastRemoteActivity = 0;

    // Callbacks da UI
    this.onPeerReady = () => {};
    this.onConnected = () => {};
    this.onDisconnected = () => {};
    this.onPeerProfileUpdate = () => {};
    this.onMessageReceived = () => {};
    this.onTyping = () => {};
    this.onFileTransferProgress = () => {};
    this.onFileReceived = () => {};
    this.onVoiceNoteReceived = () => {};
    this.onLatencyUpdate = () => {};
    this.onIncomingCall = () => {};
    this.onCallAccepted = () => {};
    this.onCallEnded = () => {};
    this.currentFacingMode = 'user';
    this.onRemoteVideoToggle = () => {};
    this.onNudgeReceived = () => {};
    this.onFriendPresence = () => {};
    this.probingPeers = new Map(); // peerId -> { promise, cleanup, startedAt }
    this.onError = () => {};
  }

  /**
   * Inicializa o nó PeerJS com suporte a ID fixo, nickname e foto
   */
  init(customId = null, nickname = 'Utilizador', avatar = null) {
    if (this.peer && !this.peer.destroyed) {
      try { this.disconnect(); } catch (e) {}
      try { this.peer.destroy(); } catch (e) {}
      this.peer = null;
    }

    this.myNickname = nickname || 'Utilizador';
    this.myAvatar = avatar || null;
    
    // Gerar um ID amigável se não for fornecido
    const peerId = customId || 'nexus-' + Math.random().toString(36).substring(2, 9);

    try {
      this.peer = new Peer(peerId, {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' },
            { urls: 'stun:stun3.l.google.com:19302' },
            { urls: 'stun:stun4.l.google.com:19302' },
            // TURN / STUN Relay Servers para atravessar 4G/5G, CGNAT e Redes Móveis
            {
              urls: [
                'stun:openrelay.metered.ca:80',
                'turn:openrelay.metered.ca:80',
                'turn:openrelay.metered.ca:443',
                'turn:openrelay.metered.ca:443?transport=tcp'
              ],
              username: 'openrelayproject',
              credential: 'openrelayproject'
            }
          ]
        }
      });

      this.peer.on('open', (id) => {
        this.myPeerId = id;
        this.onPeerReady(id);
      });

      // Escutar conexões DataChannel recebidas
      this.peer.on('connection', (conn) => {
        // Se for apenas uma sondagem rápida de presença online em segundo plano
        if (conn.metadata && conn.metadata.type === 'presence_probe') {
          const senderId = conn.metadata.senderId || conn.peer;
          if (senderId && this.onFriendPresence) {
            this.onFriendPresence(senderId, true, conn.metadata);
          }
          conn.on('open', () => {
            try {
              conn.send({
                type: 'presence_pong',
                senderId: this.myPeerId,
                nickname: this.myNickname,
                avatar: this.myAvatar
              });
            } catch (e) {}
            setTimeout(() => {
              try { conn.close(); } catch (e) {}
            }, 300);
          });
          return; // Não inicializar como sessão de chat ativa!
        }

        this.setupDataConnection(conn);
      });

      // Escutar chamadas de áudio/vídeo recebidas
      this.peer.on('call', (call) => {
        this.mediaConnection = call;
        this.onIncomingCall(call);
      });

      this.peer.on('error', (err) => {
        // Se o erro foi gerado por uma sondagem em background a um amigo offline, suprimir!
        if (err && err.type === 'peer-unavailable') {
          let handledProbe = false;
          for (const [probedId, probeObj] of this.probingPeers.entries()) {
            if (err.message && err.message.includes(probedId)) {
              probeObj.cleanup(false);
              handledProbe = true;
              break;
            }
          }
          if (!handledProbe && this.probingPeers.size > 0) {
            for (const [probedId, probeObj] of this.probingPeers.entries()) {
              probeObj.cleanup(false);
            }
            handledProbe = true;
          }
          if (handledProbe) return; // Não polui a UI com toasts de erro ao sondar amigos offline
        }

        // Se for o erro "Cannot connect to new peer after disconnecting"
        if (err && (err.type === 'cannot-connect' || (err.message && err.message.includes('disconnecting')))) {
          console.warn('Detetada desconexão de sinalização. A restabelecer nó PeerJS automaticamente...');
          try {
            if (this.peer && !this.peer.destroyed) {
              this.peer.reconnect();
            } else {
              this.init(this.myPeerId, this.myNickname, this.myAvatar);
            }
          } catch (e) {}
          return; // Suprime erro técnico para não incomodar o utilizador
        }

        console.error('Erro PeerJS:', err);
        this.onError(err);
      });

      this.peer.on('disconnected', () => {
        console.warn('PeerJS desconectado do servidor de sinalização. A reconectar automaticamente...');
        try {
          if (this.peer && !this.peer.destroyed) {
            this.peer.reconnect();
          }
        } catch (e) {}
      });
    } catch (e) {
      console.error('Falha ao inicializar PeerJS:', e);
      this.onError(e);
    }
  }

  /**
   * Garante que o nó PeerJS está ativo, conectado ao servidor de sinalização e pronto a enviar/receber conexões
   */
  async ensurePeerConnected() {
    if (!this.peer || this.peer.destroyed) {
      this.init(this.myPeerId, this.myNickname, this.myAvatar);
    }

    if (this.peer && this.peer.disconnected) {
      console.log('Nó PeerJS estava desconectado. A reconectar ao servidor de sinalização...');
      try {
        this.peer.reconnect();
      } catch (e) {
        this.init(this.myPeerId, this.myNickname, this.myAvatar);
      }
    }

    return new Promise((resolve) => {
      if (this.peer && !this.peer.destroyed && !this.peer.disconnected && this.myPeerId) {
        return resolve(true);
      }
      let resolved = false;
      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve(!!this.peer && !this.peer.destroyed);
        }
      }, 2000);

      if (this.peer) {
        this.peer.once('open', () => {
          if (!resolved) {
            resolved = true;
            clearTimeout(timeout);
            resolve(true);
          }
        });
      }
    });
  }

  /**
   * Conecta ativamente a outro par pelo ID de forma resiliente e auto-recuperável
   */
  async connect(remoteId) {
    if (!remoteId) return;

    // Garante que o nó está 100% pronto antes de tentar conectar
    await this.ensurePeerConnected();

    if (!this.peer || this.peer.destroyed) {
      throw new Error('Nó P2P a inicializar. Tente novamente em 2 segundos.');
    }

    if (this.peer.disconnected) {
      try {
        this.peer.reconnect();
        await new Promise(r => setTimeout(r, 500));
      } catch (e) {}
    }

    if (this.dataConnection && this.dataConnection.open) {
      try { this.dataConnection.close(); } catch (e) {}
    }

    try {
      const conn = this.peer.connect(remoteId, {
        reliable: true
      });
      this.setupDataConnection(conn);
    } catch (err) {
      console.warn('Erro ao chamar peer.connect, a reiniciar nó:', err);
      try {
        this.init(this.myPeerId, this.myNickname, this.myAvatar);
        setTimeout(() => {
          try {
            if (this.peer && !this.peer.destroyed && !this.peer.disconnected) {
              const conn = this.peer.connect(remoteId, { reliable: true });
              this.setupDataConnection(conn);
            }
          } catch (e) {}
        }, 1200);
      } catch (e) {}
    }
  }

  /**
   * Configura os eventos do DataChannel P2P
   */
  setupDataConnection(conn) {
    this.dataConnection = conn;
    this.remotePeerId = conn.peer;

    conn.on('open', () => {
      this.lastRemoteActivity = Date.now();
      // Trocar perfil imediatamente ao conectar (nome e foto)
      this.sendPacket({
        type: 'profile',
        nickname: this.myNickname,
        avatar: this.myAvatar
      });

      // Iniciar medição de latência periódica (Ping/Pong P2P)
      this.startPingLoop();
      if (this.onFriendPresence) {
        this.onFriendPresence(this.remotePeerId, true);
      }
      this.onConnected(this.remotePeerId);
    });

    conn.on('data', (packet) => {
      this.handleIncomingData(packet);
    });

    conn.on('close', () => {
      const closedPeerId = this.remotePeerId;
      this.stopPingLoop();
      this.dataConnection = null;
      if (this.onFriendPresence && closedPeerId) {
        this.onFriendPresence(closedPeerId, false);
      }
      this.onDisconnected();
    });

    conn.on('error', (err) => {
      console.error('Erro DataConnection:', err);
      this.onError(err);
    });
  }

  /**
   * Sonda se um amigo está online de forma silenciosa e não intrusiva via WebRTC/PeerJS
   */
  checkPeerPresence(targetPeerId) {
    if (!this.peer || this.peer.destroyed || !targetPeerId) {
      return Promise.resolve(false);
    }
    if (this.peer.disconnected) {
      try { this.peer.reconnect(); } catch (e) {}
      return Promise.resolve(false);
    }
    if (targetPeerId === this.myPeerId) {
      return Promise.resolve(true);
    }
    if (this.dataConnection && this.dataConnection.open && this.remotePeerId === targetPeerId) {
      return Promise.resolve(true);
    }
    if (this.probingPeers.has(targetPeerId)) {
      return this.probingPeers.get(targetPeerId).promise;
    }

    let probeConn = null;
    let timer = null;

    const promise = new Promise((resolve) => {
      let isDone = false;

      const cleanup = (isOnline, meta = null) => {
        if (isDone) return;
        isDone = true;
        if (timer) clearTimeout(timer);
        this.probingPeers.delete(targetPeerId);

        if (probeConn) {
          try { probeConn.close(); } catch (e) {}
        }

        if (this.onFriendPresence) {
          this.onFriendPresence(targetPeerId, isOnline, meta);
        }
        resolve(isOnline);
      };

      this.probingPeers.set(targetPeerId, {
        promise,
        cleanup,
        startedAt: Date.now()
      });

      try {
        probeConn = this.peer.connect(targetPeerId, {
          metadata: { type: 'presence_probe', senderId: this.myPeerId },
          reliable: false
        });

        probeConn.on('open', () => {
          cleanup(true);
        });

        probeConn.on('data', (data) => {
          if (data && data.type === 'presence_pong') {
            cleanup(true, data);
          }
        });

        probeConn.on('error', () => {
          cleanup(false);
        });

        timer = setTimeout(() => {
          cleanup(false);
        }, 3500);
      } catch (err) {
        cleanup(false);
      }
    });

    return promise;
  }

  /**
   * Envia um pacote genérico pelo DataChannel
   */
  sendPacket(packet) {
    if (this.dataConnection && this.dataConnection.open) {
      this.dataConnection.send(packet);
      return true;
    }
    return false;
  }

  /**
   * Processador de pacotes recebidos
   */
  handleIncomingData(packet) {
    if (!packet || !packet.type) return;
    this.lastRemoteActivity = Date.now();

    switch (packet.type) {
      case 'leave':
        console.log('Par avisou que saiu da conversa.');
        this.disconnect(false);
        break;

      case 'profile':
        this.remoteNickname = packet.nickname || 'Par';
        this.remoteAvatar = packet.avatar || null;
        if (this.onPeerProfileUpdate) {
          this.onPeerProfileUpdate(this.remoteNickname, this.remoteAvatar);
        }
        break;

      case 'text':
        // Confirmar entrega (ACK)
        this.sendPacket({ type: 'ack', messageId: packet.id });
        this.onMessageReceived({
          id: packet.id,
          type: 'text',
          text: packet.text,
          time: packet.time || Date.now(),
          sender: 'peer',
          senderName: this.remoteNickname
        });
        break;

      case 'ack':
        if (this.onMessageAck) {
          this.onMessageAck(packet.messageId);
        }
        break;

      case 'typing':
        this.onTyping(packet.isTyping, this.remoteNickname);
        break;

      case 'ping':
        this.sendPacket({ type: 'pong', pingTime: packet.time });
        break;

      case 'pong':
        if (packet.pingTime) {
          this.currentLatency = Math.max(1, Date.now() - packet.pingTime);
          this.onLatencyUpdate(this.currentLatency);
        }
        break;

      case 'call_hangup':
        this.endCall(false);
        break;

      case 'call_video_toggle':
        if (this.onRemoteVideoToggle) {
          this.onRemoteVideoToggle(packet.enabled);
        }
        break;

      case 'nudge':
        if (this.onNudgeReceived) {
          this.onNudgeReceived(packet.senderName || this.remoteNickname);
        }
        break;

      case 'file_meta':
        this.incomingFiles.set(packet.fileId, {
          meta: packet,
          chunks: [],
          receivedBytes: 0
        });
        this.onFileTransferProgress(packet.fileId, 0, packet.name, packet.size, 'receiving');
        break;

      case 'file_chunk':
        const fileState = this.incomingFiles.get(packet.fileId);
        if (fileState) {
          fileState.chunks.push(packet.chunk);
          fileState.receivedBytes += (packet.chunk.byteLength || packet.chunk.length || 0);

          const pct = Math.min(100, Math.round((fileState.receivedBytes / fileState.meta.size) * 100));
          this.onFileTransferProgress(packet.fileId, pct, fileState.meta.name, fileState.meta.size, 'receiving');

          if (packet.isLast) {
            // Reconstruir Blob
            const blob = new Blob(fileState.chunks, { type: fileState.meta.mimeType || 'application/octet-stream' });
            this.incomingFiles.delete(packet.fileId);

            this.onFileReceived({
              id: packet.fileId,
              name: fileState.meta.name,
              size: fileState.meta.size,
              mimeType: fileState.meta.mimeType,
              blob: blob,
              url: URL.createObjectURL(blob),
              time: Date.now(),
              senderName: this.remoteNickname
            });
          }
        }
        break;

      case 'voice_note':
        this.onVoiceNoteReceived({
          id: packet.id,
          audioData: packet.audioData,
          duration: packet.duration,
          time: packet.time || Date.now(),
          senderName: this.remoteNickname
        });
        break;
    }
  }

  /**
   * Envia uma mensagem de texto simples
   */
  sendTextMessage(text) {
    const id = 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
    const msg = {
      type: 'text',
      id: id,
      text: text,
      time: Date.now()
    };
    if (this.sendPacket(msg)) {
      return id;
    }
    return null;
  }

  /**
   * Envia indicador de digitação
   */
  sendTypingStatus(isTyping) {
    this.sendPacket({
      type: 'typing',
      isTyping: isTyping
    });
  }

  /**
   * Transfere um ficheiro em pedaços (Chunks) de 64KB via DataChannel
   */
  async sendFile(file, onProgress) {
    const fileId = 'file-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
    const totalSize = file.size;
    const mimeType = file.type || 'application/octet-stream';
    const totalChunks = Math.ceil(totalSize / this.CHUNK_SIZE);

    // 1. Enviar cabeçalho/metadados
    this.sendPacket({
      type: 'file_meta',
      fileId: fileId,
      name: file.name,
      size: totalSize,
      mimeType: mimeType,
      totalChunks: totalChunks
    });

    let offset = 0;
    let chunkIndex = 0;

    // Função de leitura e envio progressivo respeitando buffer
    const sendNextChunk = () => {
      if (offset < totalSize) {
        const slice = file.slice(offset, offset + this.CHUNK_SIZE);
        const reader = new FileReader();

        reader.onload = (e) => {
          const buffer = e.target.result;
          const isLast = (offset + this.CHUNK_SIZE) >= totalSize;

          this.sendPacket({
            type: 'file_chunk',
            fileId: fileId,
            chunkIndex: chunkIndex,
            chunk: buffer,
            isLast: isLast
          });

          offset += this.CHUNK_SIZE;
          chunkIndex++;

          const percent = Math.min(100, Math.round((offset / totalSize) * 100));
          if (onProgress) onProgress(fileId, percent, offset, totalSize);

          // Verificar se o buffer interno do DataChannel está saturado
          const dc = this.dataConnection?.dataChannel;
          if (dc && dc.bufferedAmount > 16 * 1024 * 1024) {
            // Esperar o buffer esvaziar um pouco
            setTimeout(sendNextChunk, 50);
          } else {
            // Continua imediatamente no próximo ciclo
            setTimeout(sendNextChunk, 2);
          }
        };

        reader.readAsArrayBuffer(slice);
      }
    };

    sendNextChunk();
    return fileId;
  }

  /**
   * Envia uma nota de voz gravada
   */
  sendVoiceNote(audioBlob, duration) {
    const id = 'voice-' + Date.now();
    const reader = new FileReader();
    reader.onload = () => {
      this.sendPacket({
        type: 'voice_note',
        id: id,
        audioData: reader.result,
        duration: duration,
        time: Date.now()
      });
    };
    reader.readAsDataURL(audioBlob);
    return id;
  }

  /**
   * Envia um sinal de Chamar a Atenção (Nudge / Zumbido / Tremer ecrã)
   */
  sendNudge() {
    if (!this.dataConnection || !this.dataConnection.open) return false;
    this.sendPacket({
      type: 'nudge',
      senderName: this.myNickname,
      time: Date.now()
    });
    return true;
  }

  /**
   * Inicia loop de ping para medir latência P2P e watchdog de presença
   */
  startPingLoop() {
    this.stopPingLoop();
    this.lastRemoteActivity = Date.now();
    this.pingInterval = setInterval(() => {
      if (this.dataConnection && this.dataConnection.open) {
        // Se passarem mais de 6.5 segundos sem qualquer sinal de vida do par (2 pings perdidos)
        if (this.lastRemoteActivity && (Date.now() - this.lastRemoteActivity > 6500)) {
          console.warn('Watchdog P2P: timeout de resposta do par. Marcando como offline.');
          this.disconnect(false);
          return;
        }
        this.sendPacket({ type: 'ping', time: Date.now() });
      } else {
        this.stopPingLoop();
      }
    }, 2500);
  }

  stopPingLoop() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  /**
   * Atualiza nickname e notifica o par
   */
  /**
   * Atualiza o perfil (nome e/ou foto) e notifica o par em tempo real
   */
  updateProfile(newName, newAvatar = undefined) {
    if (newName !== undefined) this.myNickname = newName;
    if (newAvatar !== undefined) this.myAvatar = newAvatar;
    if (this.dataConnection && this.dataConnection.open) {
      this.sendPacket({
        type: 'profile',
        nickname: this.myNickname,
        avatar: this.myAvatar
      });
    }
  }

  updateNickname(newName) {
    this.updateProfile(newName);
  }

  /**
   * =========================================================================
   * CHAMADAS DE ÁUDIO / VÍDEO (WEBRTC MEDIASTREAM)
   * =========================================================================
   */

  /**
   * Solicita câmara e microfone locais com suporte otimizado a smartphones
   */
  async getLocalMedia(video = true, audio = true) {
    try {
      // 1. Tentar primeiro com restrições otimizadas para mobile e desktop
      const constraints = {
        audio: audio,
        video: video ? {
          facingMode: 'user',
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 }
        } : false
      };
      this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
      return this.localStream;
    } catch (err) {
      console.warn('Tentando restrições simplificadas para a câmara/microfone:', err);
      try {
        // 2. Fallback: restrições básicas sem resolução forçada
        this.localStream = await navigator.mediaDevices.getUserMedia({
          video: video ? { facingMode: 'user' } : false,
          audio: audio
        });
        return this.localStream;
      } catch (err2) {
        console.warn('Tentando apenas qualquer câmara disponível:', err2);
        try {
          this.localStream = await navigator.mediaDevices.getUserMedia({
            video: video,
            audio: audio
          });
          return this.localStream;
        } catch (err3) {
          // 3. Se a câmara falhar, tentar pelo menos microfone
          if (video && audio) {
            console.warn('Câmara indisponível, ativando chamada em modo de voz...');
            this.localStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
            return this.localStream;
          }
          throw err3;
        }
      }
    }
  }

  /**
   * Inicia chamada de vídeo ou voz para o par conectado
   */
  async callPeer(withVideo = true) {
    if (!this.remotePeerId) throw new Error('Nenhum par conectado para chamada');
    this.isCurrentCallVideo = withVideo;
    
    try {
      await this.getLocalMedia(withVideo, true);
    } catch (err) {
      if (withVideo) {
        console.warn('Câmara local bloqueada pelo navegador ao chamar:', err);
        this.localStream = this.getFallbackStream();
      } else {
        throw err;
      }
    }

    const call = this.peer.call(this.remotePeerId, this.localStream, {
      metadata: {
        withVideo: withVideo,
        callerName: this.myNickname,
        callerAvatar: this.myAvatar
      }
    });

    this.setupCallEvents(call, withVideo);
    return call;
  }

  /**
   * Atende uma chamada recebida
   */
  async answerCall(call, withVideo = true) {
    this.isCurrentCallVideo = withVideo;
    try {
      await this.getLocalMedia(withVideo, true);
    } catch (err) {
      if (withVideo) {
        console.warn('Câmara local bloqueada pelo navegador ao atender:', err);
        this.localStream = this.getFallbackStream();
      } else {
        throw err;
      }
    }
    call.answer(this.localStream);
    this.setupCallEvents(call, withVideo);
  }

  /**
   * Cria stream visual de fallback informativo caso a câmara esteja bloqueada pelo navegador
   */
  getFallbackStream() {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      
      // Fundo escuro com gradiente
      const grad = ctx.createLinearGradient(0, 0, 640, 480);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#1e293b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 480);

      // Círculo de Avatar
      ctx.beginPath();
      ctx.arc(320, 200, 60, 0, Math.PI * 2);
      ctx.fillStyle = '#0284c7';
      ctx.fill();

      // Iniciais do Utilizador
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const initials = (this.myNickname || 'P').substring(0, 2).toUpperCase();
      ctx.fillText(initials, 320, 200);

      // Nome
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(this.myNickname || 'Utilizador', 320, 290);

      // Aviso claro
      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px sans-serif';
      ctx.fillText('(Câmara desativada / sem permissão)', 320, 325);

      return canvas.captureStream ? canvas.captureStream(10) : null;
    } catch (e) {
      return null;
    }
  }

  /**
   * Configura fluxo de áudio/vídeo da chamada
   */
  setupCallEvents(call, isVideo = null) {
    this.mediaConnection = call;
    const callHasVideo = isVideo !== null ? isVideo : (call.metadata?.withVideo !== false);
    this.isCurrentCallVideo = callHasVideo;

    call.on('stream', (remoteStream) => {
      this.remoteStream = remoteStream;
      this.onCallAccepted(this.localStream, remoteStream, callHasVideo);
    });

    // Escutar também diretamente na RTCPeerConnection para entrega imediata dos tracks
    if (call.peerConnection) {
      call.peerConnection.ontrack = (event) => {
        if (event.streams && event.streams[0]) {
          this.remoteStream = event.streams[0];
          this.onCallAccepted(this.localStream, event.streams[0], callHasVideo);
        }
      };
      call.peerConnection.oniceconnectionstatechange = () => {
        const state = call.peerConnection.iceConnectionState;
        console.log('Estado ICE da Chamada:', state);
        if (state === 'failed' && call.peerConnection.restartIce) {
          try { call.peerConnection.restartIce(); } catch (e) {}
        }
      };
    }

    call.on('close', () => {
      this.endCall(false);
    });

    call.on('error', (err) => {
      console.error('Erro na chamada P2P:', err);
      this.endCall(false);
    });
  }

  /**
   * Alterna microfone (Mute/Unmute)
   */
  toggleMicrophone() {
    if (this.localStream) {
      const audioTracks = this.localStream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = !audioTracks[0].enabled;
        return audioTracks[0].enabled;
      }
    }
    return false;
  }

  /**
   * Alterna câmara (Vídeo On/Off)
   */
  toggleCamera() {
    if (this.localStream) {
      const videoTracks = this.localStream.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks[0].enabled = !videoTracks[0].enabled;
        const isEnabled = videoTracks[0].enabled;
        this.sendPacket({ type: 'call_video_toggle', enabled: isEnabled });
        return isEnabled;
      }
    }
    return false;
  }

  /**
   * Alterna entre câmara frontal e traseira (Mobile / Flip Camera)
   */
  async flipCamera() {
    if (!this.localStream) return null;
    this.currentFacingMode = this.currentFacingMode === 'user' ? 'environment' : 'user';
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: this.currentFacingMode } },
        audio: false
      }).catch(() => {
        // Fallback se exact não funcionar
        return navigator.mediaDevices.getUserMedia({
          video: { facingMode: this.currentFacingMode },
          audio: false
        });
      });

      const newTrack = newStream.getVideoTracks()[0];
      const oldTrack = this.localStream.getVideoTracks()[0];
      if (oldTrack) {
        oldTrack.stop();
        this.localStream.removeTrack(oldTrack);
      }
      this.localStream.addTrack(newTrack);

      // Substitui o track no sender WebRTC sem interromper a chamada
      if (this.mediaConnection && this.mediaConnection.peerConnection) {
        const senders = this.mediaConnection.peerConnection.getSenders();
        const videoSender = senders.find(s => s.track && s.track.kind === 'video');
        if (videoSender) {
          await videoSender.replaceTrack(newTrack);
        }
      }
      return this.localStream;
    } catch (e) {
      console.warn('Erro ao alternar câmara (flip):', e);
      return null;
    }
  }

  /**
   * Encerra a chamada de mídia
   */
  endCall(notifyPeer = true) {
    if (notifyPeer) {
      this.sendPacket({ type: 'call_hangup' });
    }
    if (this.mediaConnection) {
      try { this.mediaConnection.close(); } catch (e) {}
      this.mediaConnection = null;
    }
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        try { track.stop(); } catch (e) {}
      });
      this.localStream = null;
    }
    this.remoteStream = null;
    this.onCallEnded();
  }

  /**
   * Desconecta completamente
   */
  disconnect(notifyPeer = true) {
    this.endCall();
    this.stopPingLoop();
    if (this.dataConnection) {
      if (notifyPeer) {
        try {
          if (this.dataConnection.open) {
            this.dataConnection.send({ type: 'leave' });
          }
        } catch (e) {}
      }
      try {
        this.dataConnection.close();
      } catch (e) {}
      this.dataConnection = null;
    }
    this.onDisconnected();
  }
}

// Export global instance
window.P2PClient = P2PClient;
