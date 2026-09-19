/**
 * NEXUS P2P - APP CONTROLLER
 * Interface fiel à imagem de referência com arquitetura P2P WebRTC.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  const client = new P2PClient();

  // Seletores DOM
  const elements = {
    // Sidebar
    sidebar: document.getElementById('sidebar'),
    menuConnectionsBtn: document.getElementById('menuConnectionsBtn'),
    menuDiscoverBtn: document.getElementById('menuDiscoverBtn'),
    menuSettingsBtn: document.getElementById('menuSettingsBtn'),
    connectionsSection: document.querySelector('.connections-section'),
    connectionsCountText: document.getElementById('connectionsCountText'),
    connectionsList: document.getElementById('connectionsList'),
    activePeerCard: document.getElementById('activePeerCard'),
    sidebarPeerAvatar: document.getElementById('sidebarPeerAvatar'),
    sidebarPeerName: document.getElementById('sidebarPeerName'),
    sidebarPeerStatus: document.getElementById('sidebarPeerStatus'),
    remotePeerIdInput: document.getElementById('remotePeerIdInput'),
    inlineQrScanBtn: document.getElementById('inlineQrScanBtn'),
    connectPeerBtn: document.getElementById('connectPeerBtn'),
    addFriendBtn: document.getElementById('addFriendBtn'),
    openShareModalBtn: document.getElementById('openShareModalBtn'),
    sidebarStatusDot: document.getElementById('sidebarStatusDot'),
    sidebarStatusText: document.getElementById('sidebarStatusText'),

    // Main Chat
    backToSidebarBtn: document.getElementById('backToSidebarBtn'),
    chatHeaderAvatar: document.getElementById('chatHeaderAvatar'),
    chatHeaderStatusDot: document.getElementById('chatHeaderStatusDot'),
    chatHeaderName: document.getElementById('chatHeaderName'),
    chatHeaderStatusText: document.getElementById('chatHeaderStatusText'),
    searchChatBtn: document.getElementById('searchChatBtn'),
    headerAudioCallBtn: document.getElementById('headerAudioCallBtn'),
    headerVideoCallBtn: document.getElementById('headerVideoCallBtn'),
    headerLeaveBtn: document.getElementById('headerLeaveBtn'),
    headerMoreOptionsBtn: document.getElementById('headerMoreOptionsBtn'),

    chatBodyContainer: document.getElementById('chatBodyContainer'),
    chatHeroState: document.getElementById('chatHeroState'),
    heroShareBtn: document.getElementById('heroShareBtn'),
    messagesFlowContainer: document.getElementById('messagesFlowContainer'),
    typingIndicatorBar: document.getElementById('typingIndicatorBar'),
    typingSenderText: document.getElementById('typingSenderText'),

    // Input Bar
    pillChatForm: document.getElementById('pillChatForm'),
    fileAttachmentInput: document.getElementById('fileAttachmentInput'),
    emojiButton: document.getElementById('emojiButton'),
    mainMessageInput: document.getElementById('mainMessageInput'),
    paperclipBtn: document.getElementById('paperclipBtn'),
    micVoiceBtn: document.getElementById('micVoiceBtn'),
    nudgeBtn: document.getElementById('nudgeBtn'),
    mainSendBtn: document.getElementById('mainSendBtn'),
    emojisPopup: document.getElementById('emojisPopup'),

    // Voice Bar
    floatingVoiceBar: document.getElementById('floatingVoiceBar'),
    recClockDisplay: document.getElementById('recClockDisplay'),
    cancelRecBtn: document.getElementById('cancelRecBtn'),
    sendRecBtn: document.getElementById('sendRecBtn'),

    // Right Sidebar
    rightPanelAvatar: document.getElementById('rightPanelAvatar'),
    rightPanelName: document.getElementById('rightPanelName'),
    rightPanelStatus: document.getElementById('rightPanelStatus'),
    detailModeVal: document.getElementById('detailModeVal'),
    detailCryptoVal: document.getElementById('detailCryptoVal'),
    rightPanelPeerId: document.getElementById('rightPanelPeerId'),
    copyPartnerIdBtn: document.getElementById('copyPartnerIdBtn'),
    detailStatusVal: document.getElementById('detailStatusVal'),
    rightPanelAudioCallBtn: document.getElementById('rightPanelAudioCallBtn'),
    rightPanelVideoCallBtn: document.getElementById('rightPanelVideoCallBtn'),
    rightPanelNudgeBtn: document.getElementById('rightPanelNudgeBtn'),
    rightPanelClearChatBtn: document.getElementById('rightPanelClearChatBtn'),

    // Modals
    shareModal: document.getElementById('shareModal'),
    closeShareModalBtn: document.getElementById('closeShareModalBtn'),
    qrcodeBox: document.getElementById('qrcodeBox'),
    shareLinkInput: document.getElementById('shareLinkInput'),
    copyShareLinkBtn: document.getElementById('copyShareLinkBtn'),
    myIdModalInput: document.getElementById('myIdModalInput'),
    copyMyIdModalBtn: document.getElementById('copyMyIdModalBtn'),

    // Call Modal
    callOverlay: document.getElementById('callOverlay'),
    callModalTitle: document.getElementById('callModalTitle'),
    callDurationDisplay: document.getElementById('callDurationDisplay'),
    callVideoStage: document.getElementById('callVideoStage'),
    remoteVideoFeed: document.getElementById('remoteVideoFeed'),
    callVideoFallback: document.getElementById('callVideoFallback'),
    callFallbackAvatar: document.getElementById('callFallbackAvatar'),
    callFallbackText: document.getElementById('callFallbackText'),
    localVideoPip: document.getElementById('localVideoPip'),
    localVideoFeed: document.getElementById('localVideoFeed'),
    callAudioStage: document.getElementById('callAudioStage'),
    remoteAudioFeed: document.getElementById('remoteAudioFeed'),
    audioCallAvatar: document.getElementById('audioCallAvatar'),
    audioCallName: document.getElementById('audioCallName'),
    callMuteBtn: document.getElementById('callMuteBtn'),
    callCameraBtn: document.getElementById('callCameraBtn'),
    callHangupBtn: document.getElementById('callHangupBtn'),

    // Incoming Call
    incomingRingBanner: document.getElementById('incomingRingBanner'),
    incomingRingAvatar: document.getElementById('incomingRingAvatar'),
    incomingRingName: document.getElementById('incomingRingName'),
    incomingRingType: document.getElementById('incomingRingType'),
    rejectIncomingCallBtn: document.getElementById('rejectIncomingCallBtn'),
    acceptIncomingCallBtn: document.getElementById('acceptIncomingCallBtn'),

    // Lightbox & Toasts
    imageLightbox: document.getElementById('imageLightbox'),
    lightboxImageEl: document.getElementById('lightboxImageEl'),
    closeLightboxBtn: document.getElementById('closeLightboxBtn'),
    toastsShelf: document.getElementById('toastsShelf'),

    // Perfil e Configurações (Desktop)
    myProfileMiniBtn: document.getElementById('myProfileMiniBtn'),
    mySidebarAvatar: document.getElementById('mySidebarAvatar'),
    mySidebarName: document.getElementById('mySidebarName'),
    mySidebarIdBadge: document.getElementById('mySidebarIdBadge'),
    settingsModal: document.getElementById('settingsModal'),
    closeSettingsModalBtn: document.getElementById('closeSettingsModalBtn'),
    settingsAvatarPreview: document.getElementById('settingsAvatarPreview'),
    desktopPhotoInput: document.getElementById('desktopPhotoInput'),
    desktopUploadPhotoBtn: document.getElementById('desktopUploadPhotoBtn'),
    desktopRemovePhotoBtn: document.getElementById('desktopRemovePhotoBtn'),
    settingsNickInput: document.getElementById('settingsNickInput'),
    btnSaveDesktopNick: document.getElementById('btnSaveDesktopNick'),
    settingsCustomIdInput: document.getElementById('settingsCustomIdInput'),
    btnSaveDesktopId: document.getElementById('btnSaveDesktopId'),
    btnRegenDesktopId: document.getElementById('btnRegenDesktopId')
  };

  let isConnected = false;
  let typingTimeout = null;
  let mediaRecorder = null;
  let audioChunks = [];
  let recordingStartTime = null;
  let recInterval = null;
  let pendingCall = null;
  let callStartTime = null;
  let callInterval = null;

  // =========================================================================
  // PERFIL PERSISTENTE (ID FIXO, NOME E FOTO)
  // =========================================================================
  function getPersistentId() {
    let id = localStorage.getItem('nexus_peer_id');
    if (!id) {
      id = 'nexus-' + Math.random().toString(36).substring(2, 8);
      localStorage.setItem('nexus_peer_id', id);
    }
    return id;
  }

  let savedId = getPersistentId();
  let savedNick = localStorage.getItem('nexus_nickname') || 'Utilizador-' + Math.floor(100 + Math.random() * 900);
  let savedAvatar = localStorage.getItem('nexus_avatar') || null;

  function renderAvatar(el, name, photoUrl) {
    if (!el) return;
    if (photoUrl) {
      el.innerHTML = `<img src="${photoUrl}" alt="${escapeHtml(name || '')}" class="avatar-img-fit">`;
      el.classList.add('has-photo');
    } else {
      el.classList.remove('has-photo');
      el.textContent = (name || 'P').substring(0, 2).toUpperCase();
    }
  }

  function processAvatarFile(file, callback) {
    if (!file || !file.type.startsWith('image/')) return showToast('Por favor selecione uma imagem válida.');
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX = 220;
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;
        canvas.width = MAX;
        canvas.height = MAX;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, MAX, MAX);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        callback(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // =========================================================================
  // SONS WEB AUDIO API
  // =========================================================================
  let audioCtx = null;
  function getCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  const Sound = {
    send() {
      try {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(540, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      } catch (e) {}
    },
    receive() {
      try {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } catch (e) {}
    },
    ring() {
      try {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      } catch (e) {}
    },
    nudge() {
      try {
        const ctx = getCtx();
        const now = ctx.currentTime;
        // Pulse 1
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(220, now);
        osc1.frequency.exponentialRampToValueAtTime(50, now + 0.12);
        gain1.gain.setValueAtTime(0.3, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.12);

        // Pulse 2
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(280, now + 0.14);
        osc2.frequency.exponentialRampToValueAtTime(55, now + 0.32);
        gain2.gain.setValueAtTime(0.35, now + 0.14);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.14);
        osc2.stop(now + 0.33);
      } catch (e) {}
    }
  };

  let ringInterval = null;
  function startRinging() {
    stopRinging();
    Sound.ring();
    ringInterval = setInterval(() => Sound.ring(), 2400);
  }
  function stopRinging() {
    if (ringInterval) {
      clearInterval(ringInterval);
      ringInterval = null;
    }
  }

  function showToast(text) {
    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML = `<i data-lucide="info"></i> <span>${escapeHtml(text)}</span>`;
    elements.toastsShelf.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // =========================================================================
  // GERAÇÃO DE QR CODE & LINKS DE PARTILHA
  // =========================================================================
  async function updateShareInfo(id) {
    let host = window.location.host;
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      try {
        const res = await fetch('/api/network-ip');
        if (res.ok) {
          const data = await res.json();
          if (data.ip && data.ip !== 'localhost') {
            host = `${data.ip}:${data.port || 3300}`;
          }
        }
      } catch (e) {}
    }

    // Link otimizado para o telemóvel abrir diretamente mobile.html com auto-conexão
    const mobileUrl = `${window.location.protocol}//${host}/mobile.html#connect=${id}`;

    elements.shareLinkInput.value = mobileUrl;
    elements.myIdModalInput.value = id;

    if (window.QRCode) {
      elements.qrcodeBox.innerHTML = '';
      new QRCode(elements.qrcodeBox, {
        text: mobileUrl,
        width: 170,
        height: 170,
        colorDark: "#0f172a",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
      });
    }
  }

  // Modais de Partilha
  elements.openShareModalBtn.addEventListener('click', () => elements.shareModal.classList.remove('hidden'));
  elements.inlineQrScanBtn.addEventListener('click', () => elements.shareModal.classList.remove('hidden'));
  elements.heroShareBtn.addEventListener('click', () => elements.shareModal.classList.remove('hidden'));
  elements.closeShareModalBtn.addEventListener('click', () => elements.shareModal.classList.add('hidden'));

  elements.copyShareLinkBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(elements.shareLinkInput.value);
    showToast('Link de convite copiado!');
  });
  elements.copyMyIdModalBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(elements.myIdModalInput.value);
    showToast('ID copiado!');
  });
  elements.copyPartnerIdBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(elements.rightPanelPeerId.textContent);
    showToast('ID do par copiado!');
  });

  // Atualizar visual do meu perfil
  function updateMyProfileUI() {
    if (elements.mySidebarName) elements.mySidebarName.textContent = savedNick;
    if (elements.mySidebarIdBadge) elements.mySidebarIdBadge.textContent = `ID: ${savedId}`;
    if (elements.settingsNickInput) elements.settingsNickInput.value = savedNick;
    if (elements.settingsCustomIdInput) elements.settingsCustomIdInput.value = savedId;
    renderAvatar(elements.mySidebarAvatar, savedNick, savedAvatar);
    renderAvatar(elements.settingsAvatarPreview, savedNick, savedAvatar);

    if (savedAvatar) {
      elements.desktopRemovePhotoBtn?.classList.remove('hidden');
    } else {
      elements.desktopRemovePhotoBtn?.classList.add('hidden');
    }
  }

  // =========================================================================
  // GESTÃO DE CONTACTOS / AMIGOS (LISTA PERSISTENTE E BOLINHA VERDE/VERMELHA)
  // =========================================================================
  function cleanPeerId(input) {
    if (!input) return '';
    let id = input.trim();
    if (id.includes('#connect=')) {
      id = id.split('#connect=')[1].split('&')[0];
    } else if (id.includes('connect=')) {
      id = id.split('connect=')[1].split('&')[0];
    }
    id = id.replace(/^ID:\s*/i, '').trim();
    return id;
  }

  function getStoredContacts() {
    try {
      const raw = localStorage.getItem('nexus_contacts');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveStoredContact(peerId, name, avatar) {
    const cleanId = cleanPeerId(peerId);
    if (!cleanId || cleanId === savedId) return; // Não guardar o próprio ID
    const list = getStoredContacts();
    const idx = list.findIndex(c => c.id === cleanId);

    // Se não passou nome, ou se é apenas "Par"/"Amigo" e já tínhamos nome antes, mantém o melhor
    let finalName = name;
    if (!finalName || finalName === 'Par' || finalName === 'Amigo') {
      finalName = idx >= 0 && list[idx].name ? list[idx].name : cleanId;
    }

    let finalAvatar = avatar;
    if (finalAvatar === undefined || finalAvatar === null) {
      finalAvatar = idx >= 0 ? list[idx].avatar : null;
    }

    const item = {
      id: cleanId,
      name: finalName,
      avatar: finalAvatar,
      lastSeen: Date.now()
    };

    if (idx >= 0) {
      list[idx] = { ...list[idx], ...item };
    } else {
      list.unshift(item);
    }
    localStorage.setItem('nexus_contacts', JSON.stringify(list));
  }

  function removeStoredContact(peerId) {
    const cleanId = cleanPeerId(peerId);
    const list = getStoredContacts().filter(c => c.id !== cleanId);
    localStorage.setItem('nexus_contacts', JSON.stringify(list));
  }

  function renderDesktopContacts() {
    if (!elements.connectionsList) return;
    const contacts = getStoredContacts();
    const activeId = isConnected && client.remotePeerId ? client.remotePeerId : null;
    const onlineCount = activeId ? 1 : 0;

    if (elements.connectionsCountText) {
      elements.connectionsCountText.textContent = `${onlineCount} online`;
    }

    if (contacts.length === 0) {
      elements.connectionsList.innerHTML = `
        <div class="empty-contacts-hint">
          Nenhum amigo guardado.<br>
          <span style="opacity:0.8; font-size:0.7rem;">Insira o ID e clique em Guardar ou Conectar.</span>
        </div>
      `;
      return;
    }

    elements.connectionsList.innerHTML = '';

    contacts.forEach(contact => {
      const isOnline = activeId === contact.id;

      const card = document.createElement('div');
      card.className = `connection-item-card ${isOnline ? 'active' : ''}`;
      card.setAttribute('data-id', contact.id);

      const avatarHtml = contact.avatar
        ? `<img src="${contact.avatar}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`
        : escapeHtml((contact.name || contact.id || 'A').substring(0, 2).toUpperCase());

      card.innerHTML = `
        <div class="connection-avatar-wrap">
          <div class="avatar-circle">${avatarHtml}</div>
          <span class="status-dot ${isOnline ? 'online' : 'offline'}" title="${isOnline ? 'Online • Conectado' : 'Offline • Desconectado'}"></span>
        </div>
        <div class="connection-info">
          <h4 class="connection-name" title="${escapeHtml(contact.name)}">${escapeHtml(contact.name)}</h4>
          <span class="connection-status">
            <span class="${isOnline ? 'dot-green-tiny' : 'dot-red-tiny'}"></span>
            <span>${isOnline ? 'Online • conectado' : 'Offline'}</span>
            <small style="opacity:0.4; font-family:monospace; margin-left:4px;">(${escapeHtml(contact.id)})</small>
          </span>
        </div>
        <div style="display:flex; align-items:center; gap:2px;">
          <button type="button" class="btn-edit-contact" title="Mudar nome do amigo">
            <i data-lucide="edit-2"></i>
          </button>
          <button type="button" class="btn-remove-contact" title="Remover amigo da lista">
            <i data-lucide="x"></i>
          </button>
        </div>
      `;

      // Clicar no amigo conecta automaticamente
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-remove-contact') || e.target.closest('.btn-edit-contact')) return;
        if (isOnline) return;

        elements.remotePeerIdInput.value = contact.id;
        showToast(`A ligar a ${contact.name}...`);
        client.connect(contact.id);
      });

      // Botão para renomear/mudar nome
      const editBtn = card.querySelector('.btn-edit-contact');
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const newName = prompt(`Nome para este amigo (${contact.id}):`, contact.name);
        if (newName && newName.trim()) {
          saveStoredContact(contact.id, newName.trim(), contact.avatar);
          renderDesktopContacts();
          showToast('Nome atualizado!');
        }
      });

      // Botão para remover amigo da lista
      const removeBtn = card.querySelector('.btn-remove-contact');
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`Deseja remover "${contact.name}" dos seus amigos?`)) {
          removeStoredContact(contact.id);
          renderDesktopContacts();
          showToast('Contacto removido.');
        }
      });

      elements.connectionsList.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // Eventos do Modal de Configurações Desktop
  if (elements.menuSettingsBtn) {
    elements.menuSettingsBtn.addEventListener('click', () => {
      updateMyProfileUI();
      elements.settingsModal.classList.remove('hidden');
    });
  }
  if (elements.myProfileMiniBtn) {
    elements.myProfileMiniBtn.addEventListener('click', () => {
      updateMyProfileUI();
      elements.settingsModal.classList.remove('hidden');
    });
  }
  if (elements.closeSettingsModalBtn) {
    elements.closeSettingsModalBtn.addEventListener('click', () => {
      elements.settingsModal.classList.add('hidden');
    });
  }

  // Guardar Nome de Exibição
  if (elements.btnSaveDesktopNick) {
    elements.btnSaveDesktopNick.addEventListener('click', () => {
      const newNick = elements.settingsNickInput.value.trim();
      if (!newNick) return showToast('Insira um nome válido.');
      savedNick = newNick;
      localStorage.setItem('nexus_nickname', newNick);
      client.updateProfile(savedNick, savedAvatar);
      updateMyProfileUI();
      showToast('Nome atualizado com sucesso!');
    });
  }

  // Guardar ID Personalizado Fixo
  if (elements.btnSaveDesktopId) {
    elements.btnSaveDesktopId.addEventListener('click', () => {
      const newId = elements.settingsCustomIdInput.value.trim().toLowerCase();
      if (!/^[a-z0-9_-]{3,24}$/.test(newId)) {
        return showToast('O ID deve ter entre 3 e 24 caracteres (letras, números ou hífens).');
      }
      savedId = newId;
      localStorage.setItem('nexus_peer_id', newId);
      showToast('A reiniciar conexão com o seu novo ID fixo...');
      client.init(savedId, savedNick, savedAvatar);
      updateMyProfileUI();
    });
  }

  // Gerar Novo ID Aleatório
  if (elements.btnRegenDesktopId) {
    elements.btnRegenDesktopId.addEventListener('click', () => {
      const newId = 'nexus-' + Math.random().toString(36).substring(2, 8);
      elements.settingsCustomIdInput.value = newId;
      savedId = newId;
      localStorage.setItem('nexus_peer_id', newId);
      showToast('Novo ID permanente gerado!');
      client.init(savedId, savedNick, savedAvatar);
      updateMyProfileUI();
    });
  }

  // Carregar Foto de Perfil
  if (elements.desktopUploadPhotoBtn) {
    elements.desktopUploadPhotoBtn.addEventListener('click', () => elements.desktopPhotoInput.click());
  }
  if (elements.desktopPhotoInput) {
    elements.desktopPhotoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      processAvatarFile(file, (dataUrl) => {
        savedAvatar = dataUrl;
        localStorage.setItem('nexus_avatar', dataUrl);
        client.updateProfile(savedNick, savedAvatar);
        updateMyProfileUI();
        showToast('Foto de perfil atualizada!');
      });
    });
  }

  // Remover Foto
  if (elements.desktopRemovePhotoBtn) {
    elements.desktopRemovePhotoBtn.addEventListener('click', () => {
      savedAvatar = null;
      localStorage.removeItem('nexus_avatar');
      client.updateProfile(savedNick, null);
      updateMyProfileUI();
      showToast('Foto de perfil removida.');
    });
  }

  // =========================================================================
  // EVENTOS DO CLIENTE WEBRTC
  // =========================================================================
  client.onPeerReady = (id) => {
    savedId = id;
    localStorage.setItem('nexus_peer_id', id);
    elements.sidebarStatusText.textContent = 'Pronto para conectar';
    updateMyProfileUI();
    updateShareInfo(id);
    checkUrlHash();
  };

  client.onConnected = (remoteId) => {
    isConnected = true;
    showToast('Conectado em P2P!');

    const partnerName = client.remoteNickname || 'Amigo';
    saveStoredContact(remoteId, partnerName, client.remoteAvatar);
    renderDesktopContacts();

    // Atualizar Barra Lateral
    elements.sidebarPeerName.textContent = partnerName;
    renderAvatar(elements.sidebarPeerAvatar, partnerName, client.remoteAvatar);
    elements.sidebarPeerStatus.textContent = 'Online • agora';
    elements.sidebarStatusText.textContent = 'P2P Ativo & Encriptado';

    // Atualizar Cabeçalho do Chat
    elements.chatHeaderName.textContent = partnerName;
    renderAvatar(elements.chatHeaderAvatar, partnerName, client.remoteAvatar);
    elements.chatHeaderStatusText.textContent = 'Online • Conexão direta P2P';
    if (elements.headerLeaveBtn) elements.headerLeaveBtn.classList.remove('hidden');

    // Atualizar Painel Direito (Detalhes da Conexão)
    elements.rightPanelName.textContent = partnerName;
    renderAvatar(elements.rightPanelAvatar, partnerName, client.remoteAvatar);
    elements.rightPanelStatus.textContent = 'Online agora';
    elements.rightPanelPeerId.textContent = remoteId;
    elements.detailStatusVal.textContent = 'Conectado';
    elements.detailStatusVal.className = 'detail-value text-green';

    // Ocultar Hero State e focar input
    elements.shareModal.classList.add('hidden');
    elements.mainMessageInput.focus();
  };

  client.onDisconnected = () => {
    isConnected = false;
    showToast('Par desconectado.');

    renderDesktopContacts();

    if (elements.headerLeaveBtn) elements.headerLeaveBtn.classList.add('hidden');
    elements.sidebarPeerStatus.textContent = 'Offline';
    elements.sidebarStatusText.textContent = 'Desconectado';

    elements.chatHeaderStatusText.textContent = 'Aguardando conexão direta P2P';
    elements.detailStatusVal.textContent = 'Desconectado';
    elements.detailStatusVal.className = 'detail-value';
  };

  client.onPeerProfileUpdate = (newName, newAvatar) => {
    const partnerName = newName || client.remoteNickname || 'Amigo';
    if (client.remotePeerId) {
      saveStoredContact(client.remotePeerId, partnerName, newAvatar);
      renderDesktopContacts();
    }
    elements.sidebarPeerName.textContent = partnerName;
    elements.chatHeaderName.textContent = partnerName;
    elements.rightPanelName.textContent = partnerName;
    if (elements.incomingRingName) elements.incomingRingName.textContent = partnerName;
    if (elements.audioCallName) elements.audioCallName.textContent = partnerName;

    renderAvatar(elements.sidebarPeerAvatar, partnerName, newAvatar);
    renderAvatar(elements.chatHeaderAvatar, partnerName, newAvatar);
    renderAvatar(elements.rightPanelAvatar, partnerName, newAvatar);
    renderAvatar(elements.incomingRingAvatar, partnerName, newAvatar);
    renderAvatar(elements.audioCallAvatar, partnerName, newAvatar);
    renderAvatar(elements.callFallbackAvatar, partnerName, newAvatar);
  };

  client.onLatencyUpdate = (latencyMs) => {
    elements.chatHeaderStatusText.textContent = `Online • ${latencyMs}ms P2P`;
  };

  client.onTyping = (isTyping, senderName) => {
    if (isTyping) {
      elements.typingSenderText.textContent = `${senderName} está a escrever`;
      elements.typingIndicatorBar.classList.remove('hidden');
    } else {
      elements.typingIndicatorBar.classList.add('hidden');
    }
  };

  client.onMessageReceived = (msg) => {
    Sound.receive();
    appendMessage({
      sender: 'peer',
      senderName: msg.senderName,
      text: msg.text,
      time: msg.time,
      id: msg.id
    });
  };

  client.onMessageAck = (messageId) => {
    const el = document.getElementById(`status-${messageId}`);
    if (el) el.textContent = '✓✓';
  };

  client.onFileReceived = (fileData) => {
    Sound.receive();
    appendFileMsg({
      sender: 'peer',
      senderName: fileData.senderName,
      name: fileData.name,
      size: fileData.size,
      url: fileData.url,
      isImage: fileData.mimeType && fileData.mimeType.startsWith('image/'),
      time: fileData.time
    });
  };

  client.onVoiceNoteReceived = (voiceData) => {
    Sound.receive();
    appendVoiceMsg({
      sender: 'peer',
      senderName: voiceData.senderName,
      audioData: voiceData.audioData,
      duration: voiceData.duration,
      time: voiceData.time
    });
  };

  client.onNudgeReceived = (senderName) => {
    triggerNudge(false, senderName || client.remoteNickname || 'Amigo');
  };

  client.onError = (err) => {
    showToast(err.message || 'Erro de conexão P2P');
  };

  // Inicializar o nó P2P com ID fixo e foto
  client.init(savedId, savedNick, savedAvatar);
  updateMyProfileUI();
  renderDesktopContacts();

  // =========================================================================
  // CONEXÃO MANUAL PELO INPUT DA SIDEBAR
  // =========================================================================
  elements.connectPeerBtn.addEventListener('click', connectRemote);
  elements.remotePeerIdInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') connectRemote();
  });

  if (elements.headerLeaveBtn) {
    elements.headerLeaveBtn.addEventListener('click', () => {
      client.disconnect();
      showToast('Desconectado com sucesso.');
    });
  }

  // Notificar imediatamente o amigo ao fechar a janela ou mudar de página no computador
  const handleDesktopExit = () => {
    if (client) {
      client.disconnect(true);
    }
  };
  window.addEventListener('pagehide', handleDesktopExit);
  window.addEventListener('beforeunload', handleDesktopExit);

  if (elements.addFriendBtn) {
    elements.addFriendBtn.addEventListener('click', () => {
      let target = cleanPeerId(elements.remotePeerIdInput.value);
      if (!target) {
        target = prompt('Insira o ID do seu amigo (ex: nexus-abc123):');
        if (!target) return;
        target = cleanPeerId(target);
      }
      if (!target) return showToast('ID inválido.');
      if (target === savedId) return showToast('Não pode adicionar o seu próprio ID.');

      const friendName = prompt(`Nome para este amigo (${target}):`, target) || target;
      saveStoredContact(target, friendName.trim(), null);
      renderDesktopContacts();
      elements.remotePeerIdInput.value = '';
      showToast(`Amigo "${friendName}" guardado na sua lista!`);
    });
  }

  function connectRemote() {
    let target = cleanPeerId(elements.remotePeerIdInput.value);
    if (!target) return showToast('Cole o ID do seu amigo.');
    if (target === savedId) return showToast('Não pode conectar ao seu próprio ID.');

    // Guarda logo o contacto na lista com bolinha vermelha até conectar!
    saveStoredContact(target, null, null);
    renderDesktopContacts();

    showToast('Contacto guardado! A estabelecer ligação P2P...');
    client.connect(target);
  }

  function checkUrlHash() {
    const hash = window.location.hash;
    const match = hash.match(/[#&]connect=([a-zA-Z0-9_-]+)/);
    if (match && match[1] && match[1] !== client.myPeerId) {
      elements.remotePeerIdInput.value = match[1];
      setTimeout(() => connectRemote(), 600);
    }
  }

  // =========================================================================
  // ENVIO DE MENSAGENS NO CHAT
  // =========================================================================
  elements.pillChatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
  });

  elements.mainMessageInput.addEventListener('input', () => {
    if (isConnected) {
      client.sendTypingStatus(true);
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => client.sendTypingStatus(false), 1500);
    }
  });

  function sendMessage() {
    const text = elements.mainMessageInput.value.trim();
    if (!text) return;
    if (!isConnected) {
      showToast('Conecte-se a um amigo para enviar mensagens.');
      return;
    }

    const id = client.sendTextMessage(text);
    if (id) {
      Sound.send();
      appendMessage({
        sender: 'me',
        senderName: savedNick,
        text: text,
        time: Date.now(),
        id: id
      });
      elements.mainMessageInput.value = '';
      client.sendTypingStatus(false);
    }
  }

  // Emojis Popover
  elements.emojiButton.addEventListener('click', (e) => {
    e.stopPropagation();
    elements.emojisPopup.classList.toggle('hidden');
  });

  document.querySelectorAll('.quick-emoji').forEach(em => {
    em.addEventListener('click', () => {
      elements.mainMessageInput.value += em.textContent;
      elements.emojisPopup.classList.add('hidden');
      elements.mainMessageInput.focus();
    });
  });

  document.addEventListener('click', (e) => {
    if (!elements.emojisPopup.contains(e.target) && e.target !== elements.emojiButton) {
      elements.emojisPopup.classList.add('hidden');
    }
  });

  // =========================================================================
  // CHAMAR A ATENÇÃO (NUDGE / ZUMBIDO / TREMER ECRÃ)
  // =========================================================================
  let isNudgeOnCooldown = false;

  function triggerNudge(isMe, senderName) {
    // 1. Som de zumbido característico
    Sound.nudge();

    // 2. Tremer a janela inteira
    const shakeTarget = document.getElementById('appLayout') || document.body;
    shakeTarget.classList.remove('shake-nudge');
    void shakeTarget.offsetWidth; // Força reflow para reiniciar animação
    shakeTarget.classList.add('shake-nudge');
    setTimeout(() => {
      shakeTarget.classList.remove('shake-nudge');
    }, 600);

    // 3. Vibração háptica (dispositivos móveis / touch)
    if (navigator.vibrate) {
      try {
        navigator.vibrate([100, 60, 120, 60, 220]);
      } catch (e) {}
    }

    // 4. Notificação visual no chat
    appendNudgeNotice(isMe, senderName);
  }

  function appendNudgeNotice(isMe, senderName) {
    prepareChatContainer();
    const row = document.createElement('div');
    row.className = 'msg-nudge-row';
    const text = isMe ? 'Chamou a atenção do seu par!' : `${escapeHtml(senderName)} chamou a tua atenção!`;
    row.innerHTML = `
      <span class="nudge-pill">
        <i data-lucide="zap"></i>
        <span>${text}</span>
      </span>
    `;
    elements.messagesFlowContainer.appendChild(row);
    if (window.lucide) window.lucide.createIcons();
    scrollChat();
  }

  function handleSendNudge() {
    if (!isConnected) {
      showToast('Conecte-se a um amigo para chamar a atenção.');
      return;
    }
    if (isNudgeOnCooldown) {
      showToast('Aguarde um momento antes de chamar a atenção novamente.');
      return;
    }

    const sent = client.sendNudge();
    if (sent) {
      triggerNudge(true, savedNick);

      // Cooldown de 5 segundos
      isNudgeOnCooldown = true;
      if (elements.nudgeBtn) elements.nudgeBtn.classList.add('cooldown');
      if (elements.rightPanelNudgeBtn) elements.rightPanelNudgeBtn.classList.add('cooldown');

      setTimeout(() => {
        isNudgeOnCooldown = false;
        if (elements.nudgeBtn) elements.nudgeBtn.classList.remove('cooldown');
        if (elements.rightPanelNudgeBtn) elements.rightPanelNudgeBtn.classList.remove('cooldown');
      }, 5000);
    }
  }

  if (elements.nudgeBtn) {
    elements.nudgeBtn.addEventListener('click', handleSendNudge);
  }
  if (elements.rightPanelNudgeBtn) {
    elements.rightPanelNudgeBtn.addEventListener('click', handleSendNudge);
  }

  // =========================================================================
  // GRAVAÇÃO DE VOZ
  // =========================================================================
  elements.micVoiceBtn.addEventListener('click', async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunks = [];
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.push(e.data);
      };
      mediaRecorder.start();
      recordingStartTime = Date.now();
      elements.floatingVoiceBar.classList.remove('hidden');

      recInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
        const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const s = String(elapsed % 60).padStart(2, '0');
        elements.recClockDisplay.textContent = `${m}:${s}`;
      }, 500);
    } catch (err) {
      showToast('Microfone negado ou inacessível.');
    }
  });

  elements.cancelRecBtn.addEventListener('click', () => {
    stopVoiceRec();
    showToast('Gravação cancelada.');
  });

  elements.sendRecBtn.addEventListener('click', () => {
    if (!mediaRecorder || mediaRecorder.state === 'inactive') return;
    const dur = Math.floor((Date.now() - recordingStartTime) / 1000);

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      stopVoiceRec();
      if (blob.size > 0 && isConnected) {
        client.sendVoiceNote(blob, dur);
        Sound.send();
        appendVoiceMsg({
          sender: 'me',
          senderName: savedNick,
          audioData: URL.createObjectURL(blob),
          duration: dur,
          time: Date.now()
        });
      }
    };
    mediaRecorder.stop();
  });

  function stopVoiceRec() {
    if (mediaRecorder && mediaRecorder.stream) {
      mediaRecorder.stream.getTracks().forEach(t => t.stop());
    }
    if (recInterval) clearInterval(recInterval);
    elements.floatingVoiceBar.classList.add('hidden');
    elements.recClockDisplay.textContent = '00:00';
  }

  // =========================================================================
  // ANEXO DE FICHEIROS
  // =========================================================================
  elements.paperclipBtn.addEventListener('click', () => elements.fileAttachmentInput.click());

  elements.fileAttachmentInput.addEventListener('change', (e) => {
    Array.from(e.target.files).forEach(file => {
      if (!isConnected) return showToast('Conecte-se antes de enviar ficheiros.');
      const isImg = file.type.startsWith('image/');
      const url = URL.createObjectURL(file);

      appendFileMsg({
        sender: 'me',
        senderName: savedNick,
        name: file.name,
        size: file.size,
        url: url,
        isImage: isImg,
        time: Date.now()
      });

      Sound.send();
      showToast(`A enviar ${file.name}...`);
      client.sendFile(file);
    });
    elements.fileAttachmentInput.value = '';
  });

  // =========================================================================
  // CHAMADAS P2P (VOZ E VÍDEO)
  // =========================================================================
  elements.headerAudioCallBtn.addEventListener('click', () => initiateCall(false));
  elements.headerVideoCallBtn.addEventListener('click', () => initiateCall(true));
  elements.rightPanelAudioCallBtn.addEventListener('click', () => initiateCall(false));
  elements.rightPanelVideoCallBtn.addEventListener('click', () => initiateCall(true));

  async function initiateCall(isVideo) {
    if (!isConnected) return showToast('Conecte-se a um amigo para iniciar chamadas.');
    try {
      showToast(isVideo ? 'A ligar com vídeo...' : 'A ligar chamada de voz...');
      elements.callOverlay.classList.remove('hidden');
      elements.callModalTitle.textContent = isVideo ? 'Chamada de Vídeo' : 'Chamada de Voz';
      setupDesktopCallLayout(isVideo);

      const call = await client.callPeer(isVideo);
      if (isVideo && client.localStream) {
        attachVideoStream(elements.localVideoFeed, client.localStream, true);
      }
    } catch (e) {
      elements.callOverlay.classList.add('hidden');
      showToast('Falha ao aceder ao microfone ou câmara.');
    }
  }

  function setupDesktopCallLayout(isVideo) {
    const partnerName = client.remoteNickname || 'Amigo';
    const partnerInitials = partnerName.substring(0, 2).toUpperCase();

    if (isVideo) {
      elements.callVideoStage?.classList.remove('hidden');
      elements.callAudioStage?.classList.add('hidden');
      elements.callVideoFallback?.classList.add('hidden');
      elements.callCameraBtn?.classList.remove('hidden');
    } else {
      elements.callVideoStage?.classList.add('hidden');
      elements.callAudioStage?.classList.remove('hidden');
      elements.callCameraBtn?.classList.add('hidden');

      if (elements.audioCallName) elements.audioCallName.textContent = partnerName;
      if (elements.audioCallAvatar) elements.audioCallAvatar.textContent = partnerInitials;
    }
    if (window.lucide) window.lucide.createIcons();
  }

  client.onIncomingCall = (call) => {
    pendingCall = call;
    startRinging();
    const caller = call.metadata?.callerName || client.remoteNickname || 'Amigo';
    const isVideo = call.metadata?.withVideo !== false;
    elements.incomingRingName.textContent = caller;
    elements.incomingRingAvatar.textContent = caller.substring(0, 2).toUpperCase();
    elements.incomingRingType.textContent = isVideo ? 'Chamada de Vídeo a entrar...' : 'Chamada de Voz a entrar...';
    elements.incomingRingBanner.classList.remove('hidden');
  };

  elements.acceptIncomingCallBtn.addEventListener('click', async () => {
    stopRinging();
    elements.incomingRingBanner.classList.add('hidden');
    if (pendingCall) {
      const isVideo = pendingCall.metadata?.withVideo !== false;
      elements.callOverlay.classList.remove('hidden');
      setupDesktopCallLayout(isVideo);

      await client.answerCall(pendingCall, isVideo);
      if (isVideo && client.localStream) {
        attachVideoStream(elements.localVideoFeed, client.localStream, true);
      }
    }
  });

  elements.rejectIncomingCallBtn.addEventListener('click', () => {
    stopRinging();
    elements.incomingRingBanner.classList.add('hidden');
    if (pendingCall) {
      pendingCall.close();
      pendingCall = null;
    }
  });

  client.onCallAccepted = (localStream, remoteStream, isVideo = true) => {
    elements.callModalTitle.textContent = isVideo ? 'Chamada de Vídeo em Curso' : 'Chamada de Voz em Curso';
    setupDesktopCallLayout(isVideo);

    if (isVideo) {
      attachVideoStream(elements.remoteVideoFeed, remoteStream, false);
      attachVideoStream(elements.localVideoFeed, localStream, true);
    } else {
      if (elements.remoteAudioFeed) {
        elements.remoteAudioFeed.srcObject = remoteStream;
        elements.remoteAudioFeed.play().catch(() => {});
      }
    }
    startCallTimer();
  };

  function attachVideoStream(videoEl, stream, isMuted = false) {
    if (!videoEl || !stream) return;
    videoEl.srcObject = stream;
    videoEl.muted = isMuted;
    videoEl.playsInline = true;
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('autoplay', '');
    videoEl.onloadedmetadata = () => {
      videoEl.play().catch(err => console.warn('Play video:', err));
    };
    videoEl.play().catch(() => {});
  }

  // Alternar telas ao clicar na miniatura (Click to Swap)
  let isVideoSwapped = false;
  elements.localVideoPip.style.cursor = 'pointer';
  elements.localVideoPip.title = 'Clique para alternar as telas';
  elements.localVideoPip.addEventListener('click', () => {
    isVideoSwapped = !isVideoSwapped;
    const remoteStream = client.remoteStream;
    const localStream = client.localStream;
    if (!remoteStream && !localStream) return;

    if (isVideoSwapped) {
      attachVideoStream(elements.remoteVideoFeed, localStream, true);
      attachVideoStream(elements.localVideoFeed, remoteStream, false);
      const tag = elements.localVideoPip.querySelector('span');
      if (tag) tag.textContent = 'Par';
    } else {
      attachVideoStream(elements.remoteVideoFeed, remoteStream, false);
      attachVideoStream(elements.localVideoFeed, localStream, true);
      const tag = elements.localVideoPip.querySelector('span');
      if (tag) tag.textContent = 'Você';
    }
  });

  let isDesktopCamEnabled = true;
  let isDesktopMicEnabled = true;

  function updateDesktopCamUI(enabled) {
    if (!elements.callCameraBtn) return;
    if (enabled) {
      elements.callCameraBtn.classList.remove('btn-muted');
      elements.callCameraBtn.innerHTML = '<i data-lucide="video"></i>';
    } else {
      elements.callCameraBtn.classList.add('btn-muted');
      elements.callCameraBtn.innerHTML = '<i data-lucide="video-off"></i>';
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function updateDesktopMicUI(enabled) {
    if (!elements.callMuteBtn) return;
    if (enabled) {
      elements.callMuteBtn.classList.remove('btn-muted');
      elements.callMuteBtn.innerHTML = '<i data-lucide="mic"></i>';
    } else {
      elements.callMuteBtn.classList.add('btn-muted');
      elements.callMuteBtn.innerHTML = '<i data-lucide="mic-off"></i>';
    }
    if (window.lucide) window.lucide.createIcons();
  }

  client.onCallEnded = () => {
    stopRinging();
    stopCallTimer();
    elements.callOverlay.classList.add('hidden');
    elements.remoteVideoFeed.srcObject = null;
    elements.localVideoFeed.srcObject = null;
    if (elements.remoteAudioFeed) elements.remoteAudioFeed.srcObject = null;
    elements.callAudioStage?.classList.add('hidden');
    elements.callVideoStage?.classList.remove('hidden');
    isDesktopCamEnabled = true;
    isDesktopMicEnabled = true;
    updateDesktopCamUI(true);
    updateDesktopMicUI(true);
    showToast('Chamada terminada');
  };

  client.onRemoteVideoToggle = (remoteVideoEnabled) => {
    showToast(remoteVideoEnabled ? 'O parceiro ligou a câmara' : 'O parceiro desligou a câmara');
  };

  elements.callHangupBtn.addEventListener('click', () => client.endCall(true));

  elements.callMuteBtn.addEventListener('click', () => {
    isDesktopMicEnabled = client.toggleMicrophone();
    updateDesktopMicUI(isDesktopMicEnabled);
    showToast(isDesktopMicEnabled ? 'Microfone ativado' : 'Microfone silenciado');
  });

  elements.callCameraBtn.addEventListener('click', () => {
    isDesktopCamEnabled = client.toggleCamera();
    updateDesktopCamUI(isDesktopCamEnabled);
    showToast(isDesktopCamEnabled ? 'Câmara ativada' : 'Câmara desligada');
  });

  function startCallTimer() {
    callStartTime = Date.now();
    callInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
      const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const s = String(elapsed % 60).padStart(2, '0');
      elements.callDurationDisplay.textContent = `${m}:${s}`;
    }, 1000);
  }

  function stopCallTimer() {
    if (callInterval) clearInterval(callInterval);
    elements.callDurationDisplay.textContent = '00:00';
  }

  // Limpar Conversa
  elements.rightPanelClearChatBtn.addEventListener('click', () => {
    if (confirm('Deseja limpar as mensagens do chat?')) {
      elements.messagesFlowContainer.innerHTML = '';
      elements.chatHeroState.classList.remove('hidden');
      elements.messagesFlowContainer.classList.add('hidden');
      showToast('Conversa limpa.');
    }
  });

  // =========================================================================
  // RENDERIZAÇÃO DE MENSAGENS NO CHAT
  // =========================================================================
  function prepareChatContainer() {
    elements.chatHeroState.classList.add('hidden');
    elements.messagesFlowContainer.classList.remove('hidden');
  }

  function appendMessage(data) {
    prepareChatContainer();
    const isMe = data.sender === 'me';
    const row = document.createElement('div');
    row.className = `msg-row ${isMe ? 'me' : 'peer'}`;

    row.innerHTML = `
      <div class="msg-bubble">
        <div>${escapeHtml(data.text)}</div>
        <div class="msg-meta">
          <span>${formatTime(data.time)}</span>
          ${isMe ? `<span id="status-${data.id}">✓</span>` : ''}
        </div>
      </div>
    `;

    elements.messagesFlowContainer.appendChild(row);
    scrollChat();
  }

  function appendFileMsg(data) {
    prepareChatContainer();
    const isMe = data.sender === 'me';
    const row = document.createElement('div');
    row.className = `msg-row ${isMe ? 'me' : 'peer'}`;

    let imgTag = data.isImage ? `<img src="${data.url}" class="msg-image" onclick="openLightbox('${data.url}')">` : '';

    row.innerHTML = `
      <div class="msg-bubble">
        ${imgTag}
        <div class="msg-file-card">
          <i data-lucide="${data.isImage ? 'image' : 'file'}"></i>
          <div style="flex:1; min-width:0;">
            <strong style="display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:0.82rem;">${escapeHtml(data.name)}</strong>
            <small style="font-size:0.68rem; opacity:0.8;">${formatBytes(data.size)}</small>
          </div>
          <a href="${data.url}" download="${escapeHtml(data.name)}" style="color:inherit; padding:4px; display:flex;">
            <i data-lucide="download"></i>
          </a>
        </div>
        <div class="msg-meta">
          <span>${formatTime(data.time)}</span>
          ${isMe ? '<span>✓✓</span>' : ''}
        </div>
      </div>
    `;

    elements.messagesFlowContainer.appendChild(row);
    if (window.lucide) window.lucide.createIcons();
    scrollChat();
  }

  function appendVoiceMsg(data) {
    prepareChatContainer();
    const isMe = data.sender === 'me';
    const row = document.createElement('div');
    row.className = `msg-row ${isMe ? 'me' : 'peer'}`;

    row.innerHTML = `
      <div class="msg-bubble">
        <div style="display:flex; align-items:center; gap:8px;">
          <audio src="${data.audioData}" controls style="max-width:220px; height:36px;"></audio>
        </div>
        <div class="msg-meta">
          <span>${formatTime(data.time)}</span>
          ${isMe ? '<span>✓✓</span>' : ''}
        </div>
      </div>
    `;

    elements.messagesFlowContainer.appendChild(row);
    scrollChat();
  }

  // Lightbox
  window.openLightbox = (url) => {
    elements.lightboxImageEl.src = url;
    elements.imageLightbox.classList.remove('hidden');
  };
  elements.closeLightboxBtn.addEventListener('click', () => {
    elements.imageLightbox.classList.add('hidden');
  });

  // Utilitários
  function scrollChat() {
    elements.chatBodyContainer.scrollTop = elements.chatBodyContainer.scrollHeight;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  function formatTime(timestamp) {
    const d = new Date(timestamp || Date.now());
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function formatBytes(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
});
