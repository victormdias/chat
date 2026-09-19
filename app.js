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
    chatHeaderSubDot: document.getElementById('chatHeaderSubDot'),
    chatHeaderName: document.getElementById('chatHeaderName'),
    chatHeaderStatusText: document.getElementById('chatHeaderStatusText'),
    headerHistoryBtn: document.getElementById('headerHistoryBtn'),
    searchChatBtn: document.getElementById('searchChatBtn'),
    headerAudioCallBtn: document.getElementById('headerAudioCallBtn'),
    headerVideoCallBtn: document.getElementById('headerVideoCallBtn'),
    headerLeaveBtn: document.getElementById('headerLeaveBtn'),
    headerMoreOptionsBtn: document.getElementById('headerMoreOptionsBtn'),
    headerMoreDropdown: document.getElementById('headerMoreDropdown'),

    // Chat Search Bar
    chatSearchBar: document.getElementById('chatSearchBar'),
    chatSearchInput: document.getElementById('chatSearchInput'),
    chatSearchCount: document.getElementById('chatSearchCount'),
    chatSearchPrevBtn: document.getElementById('chatSearchPrevBtn'),
    chatSearchNextBtn: document.getElementById('chatSearchNextBtn'),
    chatSearchCloseBtn: document.getElementById('chatSearchCloseBtn'),

    // More Options Menu Items
    optOpenHistory: document.getElementById('optOpenHistory'),
    optExportChat: document.getElementById('optExportChat'),
    optToggleSound: document.getElementById('optToggleSound'),
    optSoundIcon: document.getElementById('optSoundIcon'),
    optSoundText: document.getElementById('optSoundText'),
    optPartnerInfo: document.getElementById('optPartnerInfo'),
    optClearChat: document.getElementById('optClearChat'),
    optDisconnect: document.getElementById('optDisconnect'),

    // History Modal Elements
    historyOverlay: document.getElementById('historyOverlay'),
    historyModalBox: document.getElementById('historyModalBox'),
    historyModalHeader: document.getElementById('historyModalHeader'),
    historyTotalBadge: document.getElementById('historyTotalBadge'),
    closeHistoryModalBtn: document.getElementById('closeHistoryModalBtn'),
    historyPartnerSelect: document.getElementById('historyPartnerSelect'),
    historySearchInput: document.getElementById('historySearchInput'),
    historyModalList: document.getElementById('historyModalList'),
    btnExportHistoryTxt: document.getElementById('btnExportHistoryTxt'),
    btnClearHistoryContact: document.getElementById('btnClearHistoryContact'),
    btnLoadHistoryIntoChat: document.getElementById('btnLoadHistoryIntoChat'),

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
    rightPanelStatusDot: document.getElementById('rightPanelStatusDot'),
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

    // Backup Modal (.JSON)
    openBackupModalBtn: document.getElementById('openBackupModalBtn'),
    backupModal: document.getElementById('backupModal'),
    closeBackupModalBtn: document.getElementById('closeBackupModalBtn'),
    btnDownloadJsonBackup: document.getElementById('btnDownloadJsonBackup'),
    contactsJsonFileInput: document.getElementById('contactsJsonFileInput'),
    backupDropZone: document.getElementById('backupDropZone'),
    chkAutoDownloadBackup: document.getElementById('chkAutoDownloadBackup'),
    backupDataTextarea: document.getElementById('backupDataTextarea'),
    btnExportContacts: document.getElementById('btnExportContacts'),
    btnImportContacts: document.getElementById('btnImportContacts'),

    // Call Modal
    callOverlay: document.getElementById('callOverlay'),
    callModalBox: document.getElementById('callModalBox'),
    callModalHeader: document.getElementById('callModalHeader'),
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
  let soundEffectsEnabled = true;
  function getCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  const Sound = {
    send() {
      if (!soundEffectsEnabled) return;
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
      if (!soundEffectsEnabled) return;
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
  // SISTEMA DE HISTÓRICO DE MENSAGENS E PERSISTÊNCIA
  // =========================================================================
  const ChatHistory = {
    STORAGE_KEY: 'nexus_chat_history_v1',

    getAll() {
      try {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
      } catch (e) {
        return {};
      }
    },

    save(peerId, msg) {
      if (!peerId) peerId = client.remotePeerId || 'geral';
      try {
        const all = this.getAll();
        if (!all[peerId]) all[peerId] = [];

        const now = new Date(msg.time || Date.now());
        const record = {
          id: msg.id || 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
          sender: msg.sender || 'me',
          senderName: msg.senderName || (msg.sender === 'me' ? savedNick : 'Amigo'),
          text: msg.text || '',
          timestamp: now.getTime(),
          dateFormatted: now.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' }),
          timeFormatted: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          fullDateTime: `${now.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })} às ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          isFile: !!msg.name || !!msg.isFile,
          fileName: msg.name || null,
          fileSize: msg.size || null,
          isImage: !!msg.isImage,
          isVoice: !!msg.isVoice || !!msg.audioData,
          duration: msg.duration || null
        };

        all[peerId].push(record);
        if (all[peerId].length > 600) {
          all[peerId] = all[peerId].slice(-600);
        }

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
        return record;
      } catch (e) {
        console.warn('Erro ao guardar histórico:', e);
      }
    },

    getMessages(peerId) {
      if (!peerId) peerId = client.remotePeerId || 'geral';
      const all = this.getAll();
      return all[peerId] || [];
    },

    getAllPeers() {
      const all = this.getAll();
      return Object.keys(all).filter(k => all[k] && all[k].length > 0);
    },

    clear(peerId) {
      const all = this.getAll();
      delete all[peerId];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
    }
  };

  function formatDateOnly(timestamp) {
    const d = new Date(timestamp || Date.now());
    return d.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  function formatDateTime(timestamp) {
    const d = new Date(timestamp || Date.now());
    const dateStr = d.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${dateStr} às ${timeStr}`;
  }

  let lastRenderedChatDate = null;
  function checkAndAppendDateDivider(container, timestamp) {
    if (!container) return;
    const dateStr = formatDateOnly(timestamp);
    if (dateStr !== lastRenderedChatDate) {
      lastRenderedChatDate = dateStr;
      const divider = document.createElement('div');
      divider.className = 'chat-date-divider';
      divider.innerHTML = `<span class="chat-date-badge"><i data-lucide="calendar" style="width:12px; height:12px;"></i> ${escapeHtml(dateStr)}</span>`;
      container.appendChild(divider);
      if (window.lucide) window.lucide.createIcons();
    }
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

    // Obter o caminho base relativo para funcionar tanto em localhost como no GitHub Pages (/chat/)
    let basePath = window.location.pathname;
    basePath = basePath.substring(0, basePath.lastIndexOf('/') + 1);
    if (!basePath.endsWith('/')) basePath += '/';

    // Link otimizado para o telemóvel abrir diretamente mobile.html com auto-conexão
    const mobileUrl = `${window.location.protocol}//${host}${basePath}mobile.html#connect=${id}`;

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
      let raw = localStorage.getItem('nexus_contacts');
      if (!raw || raw === '[]' || raw === 'null') {
        // Tentar restaurar da cópia de segurança se o principal tiver sido apagado
        const backup = localStorage.getItem('nexus_contacts_backup') || sessionStorage.getItem('nexus_contacts_backup');
        if (backup && backup !== '[]' && backup !== 'null') {
          localStorage.setItem('nexus_contacts', backup);
          raw = backup;
        }
      }
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
    const json = JSON.stringify(list);
    localStorage.setItem('nexus_contacts', json);
    localStorage.setItem('nexus_contacts_backup', json);
    try { sessionStorage.setItem('nexus_contacts_backup', json); } catch (e) {}
    autoSyncBackup(list);
  }

  function removeStoredContact(peerId) {
    const cleanId = cleanPeerId(peerId);
    const list = getStoredContacts().filter(c => c.id !== cleanId);
    const json = JSON.stringify(list);
    localStorage.setItem('nexus_contacts', json);
    localStorage.setItem('nexus_contacts_backup', json);
    autoSyncBackup(list);
  }

  // Mapa de presença de amigos em tempo real: peerId -> { online: boolean, lastSeen: number }
  const onlineFriendsMap = new Map();

  function isContactOnline(peerId) {
    if (!peerId) return false;
    if (isConnected && client && client.remotePeerId === peerId) return true;
    const item = onlineFriendsMap.get(peerId);
    return !!(item && item.online);
  }

  function renderDesktopContacts() {
    if (!elements.connectionsList) return;
    const contacts = getStoredContacts();
    const activeId = isConnected && client.remotePeerId ? client.remotePeerId : null;
    const onlineCount = contacts.filter(c => isContactOnline(c.id)).length;

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
      const isOnline = isContactOnline(contact.id);
      const isCurrentChat = activeId === contact.id;

      const card = document.createElement('div');
      card.className = `connection-item-card ${isCurrentChat ? 'active' : ''}`;
      card.setAttribute('data-id', contact.id);

      const avatarHtml = contact.avatar
        ? `<img src="${contact.avatar}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`
        : escapeHtml((contact.name || contact.id || 'A').substring(0, 2).toUpperCase());

      card.innerHTML = `
        <div class="connection-avatar-wrap">
          <div class="avatar-circle">${avatarHtml}</div>
          <span class="status-dot ${isOnline ? 'online' : 'offline'}" title="${isOnline ? (isCurrentChat ? 'Online • Conectado' : 'Online • Disponível') : 'Offline • Desconectado'}"></span>
        </div>
        <div class="connection-info">
          <h4 class="connection-name" title="${escapeHtml(contact.name)}">${escapeHtml(contact.name)}</h4>
          <span class="connection-status">
            <span class="${isOnline ? 'dot-green-tiny' : 'dot-red-tiny'}"></span>
            <span>${isOnline ? (isCurrentChat ? 'Online • conectado' : 'Online') : 'Offline'}</span>
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
        if (isCurrentChat) return;

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
          syncFriendsPresence();
          showToast('Nome atualizado!');
        }
      });

      // Botão para remover amigo da lista
      const removeBtn = card.querySelector('.btn-remove-contact');
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`Deseja remover "${contact.name}" dos seus amigos?`)) {
          removeStoredContact(contact.id);
          onlineFriendsMap.delete(contact.id);
          renderDesktopContacts();
          showToast('Contacto removido.');
        }
      });

      elements.connectionsList.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  let isSyncingPresence = false;
  async function syncFriendsPresence() {
    if (isSyncingPresence) return;
    isSyncingPresence = true;
    try {
      const contacts = getStoredContacts();
      const myId = savedId || (client && client.myPeerId);
      let serverAssisted = false;

      // 1. Deteção ultra-rápida via endpoint de presença do servidor local / túnel Cloudflare
      try {
        const queryParams = new URLSearchParams({
          id: myId || '',
          name: savedNick || (client && client.myNickname) || '',
          avatar: (savedAvatar && savedAvatar.length < 300) ? savedAvatar : ''
        });
        const res = await fetch(`/api/presence?${queryParams.toString()}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.onlineIds)) {
            serverAssisted = true;
            const onlineSet = new Set(data.onlineIds);
            contacts.forEach(c => {
              if (isConnected && client && client.remotePeerId === c.id) {
                onlineFriendsMap.set(c.id, { online: true, lastSeen: Date.now() });
              } else {
                const nowOnline = onlineSet.has(c.id);
                onlineFriendsMap.set(c.id, { online: nowOnline, lastSeen: Date.now() });
              }
            });
            renderDesktopContacts();
          }
        }
      } catch (e) {
        // Servidor local não respondeu (ex: modo estático puro no GitHub Pages)
      }

      // 2. Sondagem WebRTC P2P (PeerJS) de fallback para contactos ainda não marcados como online
      if (client && client.peer && !client.peer.destroyed && contacts.length > 0) {
        for (const contact of contacts) {
          if (isConnected && client.remotePeerId === contact.id) {
            onlineFriendsMap.set(contact.id, { online: true, lastSeen: Date.now() });
            continue;
          }
          if (serverAssisted && onlineFriendsMap.get(contact.id)?.online) {
            continue;
          }

          client.checkPeerPresence(contact.id).then(isOnline => {
            onlineFriendsMap.set(contact.id, { online: isOnline, lastSeen: Date.now() });
            renderDesktopContacts();
          }).catch(() => {});

          await new Promise(r => setTimeout(r, 600));
        }
      }
    } finally {
      isSyncingPresence = false;
    }
  }

  // =========================================================================
  // SISTEMA DE BACKUP AUTOMÁTICO E RESTAURAÇÃO (.JSON)
  // =========================================================================
  let downloadDebounceTimer = null;
  function debouncedDownloadJsonBackup() {
    if (downloadDebounceTimer) clearTimeout(downloadDebounceTimer);
    downloadDebounceTimer = setTimeout(() => {
      downloadContactsJsonFile(true);
    }, 1500);
  }

  function autoSyncBackup(customList = null) {
    const list = customList || getStoredContacts();
    const payload = {
      app: 'nexus-p2p-chat',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      myId: savedId || (client && client.myPeerId) || null,
      totalContacts: list.length,
      contacts: list
    };

    // 1. Guardar automaticamente no disco via servidor local (se ativo)
    try {
      fetch('/api/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (e) {}

    // 2. Se o utilizador ativou descarregar automaticamente ficheiro .json
    if (localStorage.getItem('nexus_auto_download_json') === 'true' && list.length > 0) {
      debouncedDownloadJsonBackup();
    }
  }

  function downloadContactsJsonFile(isAuto = false) {
    const contacts = getStoredContacts();
    if (contacts.length === 0 && !isAuto) {
      return showToast('Ainda não tem amigos guardados para exportar.');
    }
    const payload = {
      app: 'nexus-p2p-chat',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      myId: savedId || (client && client.myPeerId) || null,
      totalContacts: contacts.length,
      contacts: contacts
    };
    const jsonStr = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexus-amigos-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 400);

    if (isAuto) {
      showToast('Backup automático guardado em ficheiro JSON!');
    } else {
      showToast('Ficheiro JSON descarregado com sucesso!');
    }
  }

  function handleRestoreFromJson(data, sourceName = 'ficheiro') {
    if (!data) return showToast('Ficheiro vazio ou inválido.');

    let list = null;
    if (Array.isArray(data)) {
      list = data;
    } else if (data && Array.isArray(data.contacts)) {
      list = data.contacts;
    }

    if (!list || list.length === 0) {
      return showToast('O ficheiro não contém amigos guardados.');
    }

    const current = getStoredContacts();
    let restoredCount = 0;

    list.forEach(item => {
      const cleanId = cleanPeerId(item.id);
      if (cleanId && cleanId !== savedId) {
        const idx = current.findIndex(c => c.id === cleanId);
        const contactObj = {
          id: cleanId,
          name: item.name || cleanId,
          avatar: item.avatar || null,
          lastSeen: item.lastSeen || Date.now()
        };
        if (idx >= 0) {
          current[idx] = { ...current[idx], ...contactObj };
        } else {
          current.unshift(contactObj);
        }
        restoredCount++;
      }
    });

    const fullJson = JSON.stringify(current);
    localStorage.setItem('nexus_contacts', fullJson);
    localStorage.setItem('nexus_contacts_backup', fullJson);

    renderDesktopContacts();
    syncFriendsPresence();
    autoSyncBackup(current);

    if (elements.backupModal) elements.backupModal.classList.add('hidden');
    showToast(`✅ ${restoredCount} amigo(s) restaurados com sucesso a partir de ${sourceName}!`);
  }

  function processJsonFile(file) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.json') && file.type !== 'application/json') {
      return showToast('Por favor selecione um ficheiro .json válido.');
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        handleRestoreFromJson(parsed, file.name);
      } catch (err) {
        showToast('Erro: o ficheiro não contém JSON válido.');
      }
    };
    reader.onerror = () => showToast('Erro ao ler o ficheiro.');
    reader.readAsText(file);
  }

  // Eventos do Modal de Backup de Amigos
  if (elements.openBackupModalBtn) {
    elements.openBackupModalBtn.addEventListener('click', () => {
      const contacts = getStoredContacts();
      if (elements.backupDataTextarea) {
        elements.backupDataTextarea.value = contacts.length > 0 ? JSON.stringify(contacts, null, 2) : '';
      }
      if (elements.chkAutoDownloadBackup) {
        elements.chkAutoDownloadBackup.checked = localStorage.getItem('nexus_auto_download_json') === 'true';
      }
      elements.backupModal.classList.remove('hidden');
    });
  }

  if (elements.closeBackupModalBtn) {
    elements.closeBackupModalBtn.addEventListener('click', () => {
      elements.backupModal.classList.add('hidden');
    });
  }

  // Botão Descarregar Ficheiro JSON
  if (elements.btnDownloadJsonBackup) {
    elements.btnDownloadJsonBackup.addEventListener('click', () => {
      downloadContactsJsonFile(false);
    });
  }

  // Botão Carregar Ficheiro JSON e Drag & Drop
  if (elements.backupDropZone && elements.contactsJsonFileInput) {
    elements.backupDropZone.addEventListener('click', () => {
      elements.contactsJsonFileInput.click();
    });

    elements.backupDropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      elements.backupDropZone.style.borderColor = 'var(--primary)';
      elements.backupDropZone.style.background = 'rgba(2, 132, 199, 0.1)';
    });

    elements.backupDropZone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      elements.backupDropZone.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      elements.backupDropZone.style.background = 'rgba(16, 185, 129, 0.05)';
    });

    elements.backupDropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      elements.backupDropZone.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      elements.backupDropZone.style.background = 'rgba(16, 185, 129, 0.05)';
      const file = e.dataTransfer && e.dataTransfer.files ? e.dataTransfer.files[0] : null;
      if (file) processJsonFile(file);
    });
  }

  if (elements.contactsJsonFileInput) {
    elements.contactsJsonFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        processJsonFile(file);
        elements.contactsJsonFileInput.value = '';
      }
    });
  }

  // Toggle de Backup Automático
  if (elements.chkAutoDownloadBackup) {
    elements.chkAutoDownloadBackup.addEventListener('change', (e) => {
      localStorage.setItem('nexus_auto_download_json', e.target.checked ? 'true' : 'false');
      if (e.target.checked) {
        showToast('Backup automático ativado!');
        downloadContactsJsonFile(true);
      } else {
        showToast('Backup automático desativado.');
      }
    });
  }

  // Opções de texto (legado)
  if (elements.btnExportContacts) {
    elements.btnExportContacts.addEventListener('click', () => {
      const contacts = getStoredContacts();
      if (contacts.length === 0) {
        return showToast('Ainda não tem amigos guardados para exportar.');
      }
      const json = JSON.stringify(contacts, null, 2);
      navigator.clipboard.writeText(json);
      if (elements.backupDataTextarea) elements.backupDataTextarea.value = json;
      showToast('Código copiado para a área de transferência!');
    });
  }

  if (elements.btnImportContacts) {
    elements.btnImportContacts.addEventListener('click', () => {
      const text = elements.backupDataTextarea?.value.trim();
      if (!text) {
        return showToast('Cole o código de backup no campo de texto.');
      }
      try {
        const parsed = JSON.parse(text);
        handleRestoreFromJson(parsed, 'código inserido');
      } catch (e) {
        showToast('Código de backup inválido. Verifique o formato JSON.');
      }
    });
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
    syncFriendsPresence();
  };

  client.onFriendPresence = (peerId, isOnline, meta) => {
    onlineFriendsMap.set(peerId, {
      online: isOnline,
      lastSeen: Date.now()
    });
    if (isOnline && meta && (meta.nickname || meta.avatar)) {
      const contacts = getStoredContacts();
      const existing = contacts.find(c => c.id === peerId);
      if (existing && (!existing.name || existing.name === existing.id || existing.name === 'Par')) {
        saveStoredContact(peerId, meta.nickname || existing.name, meta.avatar || existing.avatar);
      }
    }
    renderDesktopContacts();
  };

  client.onConnected = (remoteId) => {
    isConnected = true;
    onlineFriendsMap.set(remoteId, { online: true, lastSeen: Date.now() });
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
    if (elements.chatHeaderStatusDot) elements.chatHeaderStatusDot.className = 'status-dot online';
    if (elements.chatHeaderSubDot) elements.chatHeaderSubDot.className = 'dot-green-tiny';
    elements.chatHeaderStatusText.textContent = 'Online • Conexão direta P2P';
    if (elements.headerLeaveBtn) elements.headerLeaveBtn.classList.remove('hidden');

    // Atualizar Painel Direito (Detalhes da Conexão)
    elements.rightPanelName.textContent = partnerName;
    renderAvatar(elements.rightPanelAvatar, partnerName, client.remoteAvatar);
    elements.rightPanelStatus.textContent = 'Online agora';
    if (elements.rightPanelStatusDot) elements.rightPanelStatusDot.className = 'status-dot online';
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
    syncFriendsPresence();

    if (elements.headerLeaveBtn) elements.headerLeaveBtn.classList.add('hidden');
    elements.sidebarPeerStatus.textContent = 'Offline';
    elements.sidebarStatusText.textContent = 'Desconectado';

    // Atualizar Cabeçalho para Vermelho / Offline
    if (elements.chatHeaderStatusDot) elements.chatHeaderStatusDot.className = 'status-dot offline';
    if (elements.chatHeaderSubDot) elements.chatHeaderSubDot.className = 'dot-red-tiny';
    elements.chatHeaderStatusText.textContent = 'Offline • Desconectado';

    // Atualizar Painel Direito para Offline
    if (elements.rightPanelStatus) elements.rightPanelStatus.textContent = 'Offline';
    if (elements.rightPanelStatusDot) elements.rightPanelStatusDot.className = 'status-dot offline';
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

  // Monitorização periódica de presença para amigos (a cada 12 segundos)
  setInterval(syncFriendsPresence, 12000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) syncFriendsPresence();
  });
  setTimeout(syncFriendsPresence, 1500);

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
    const myId = savedId || (client && client.myPeerId);
    if (myId) {
      try {
        navigator.sendBeacon(`/api/presence?id=${encodeURIComponent(myId)}&status=offline`);
      } catch (e) {}
    }
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
      syncFriendsPresence();
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

  function resetCallModalPosition() {
    if (elements.callModalBox) {
      elements.callModalBox.style.transform = 'translate(-50%, -50%)';
      elements.callModalBox.style.left = '50%';
      elements.callModalBox.style.top = '50%';
    }
  }

  async function initiateCall(isVideo) {
    if (!isConnected) return showToast('Conecte-se a um amigo para iniciar chamadas.');
    try {
      showToast(isVideo ? 'A ligar com vídeo...' : 'A ligar chamada de voz...');
      resetCallModalPosition();
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
      resetCallModalPosition();
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
    isVideoSwapped = false;
    const tag = elements.localVideoPip?.querySelector('span');
    if (tag) tag.textContent = 'Você';

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
    videoEl.setAttribute('webkit-playsinline', '');
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
    const remoteStream = client.remoteStream;
    const localStream = client.localStream;
    if (!remoteStream || !localStream) return;

    isVideoSwapped = !isVideoSwapped;
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

  // Janela de Chamada Arrastável (Draggable Modal)
  function makeElementDraggable(box, handle) {
    if (!box || !handle) return;
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

    const onPointerDown = (e) => {
      // Evitar arrastar se o clique foi num botão ou na tag de duração
      if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.call-duration-tag')) {
        return;
      }

      isDragging = true;
      handle.style.cursor = 'grabbing';

      const isTouch = e.type.startsWith('touch');
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;

      startX = clientX;
      startY = clientY;

      const rect = box.getBoundingClientRect();
      box.style.transform = 'none';
      box.style.left = `${rect.left}px`;
      box.style.top = `${rect.top}px`;
      initialLeft = rect.left;
      initialTop = rect.top;

      document.addEventListener('mousemove', onPointerMove, { passive: false });
      document.addEventListener('mouseup', onPointerUp);
      document.addEventListener('touchmove', onPointerMove, { passive: false });
      document.addEventListener('touchend', onPointerUp);

      if (e.cancelable) e.preventDefault();
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const isTouch = e.type.startsWith('touch');
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      let newLeft = initialLeft + deltaX;
      let newTop = initialTop + deltaY;

      const rect = box.getBoundingClientRect();
      const maxLeft = window.innerWidth - rect.width - 10;
      const maxTop = window.innerHeight - rect.height - 10;

      newLeft = Math.max(10, Math.min(maxLeft, newLeft));
      newTop = Math.max(10, Math.min(maxTop, newTop));

      box.style.left = `${newLeft}px`;
      box.style.top = `${newTop}px`;

      if (e.cancelable) e.preventDefault();
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      handle.style.cursor = 'grab';
      document.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseup', onPointerUp);
      document.removeEventListener('touchmove', onPointerMove);
      document.removeEventListener('touchend', onPointerUp);
    };

    handle.addEventListener('mousedown', onPointerDown);
    handle.addEventListener('touchstart', onPointerDown, { passive: false });
  }

  makeElementDraggable(elements.callModalBox, elements.callModalHeader);

  // Limpar Conversa
  elements.rightPanelClearChatBtn.addEventListener('click', () => {
    if (confirm('Deseja limpar as mensagens do chat?')) {
      elements.messagesFlowContainer.innerHTML = '';
      elements.chatHeroState.classList.remove('hidden');
      elements.messagesFlowContainer.classList.add('hidden');
      clearSearchHighlights();
      showToast('Conversa limpa.');
    }
  });

  // =========================================================================
  // SISTEMA DE PESQUISA NA CONVERSA (LUPA)
  // =========================================================================
  let searchMatches = [];
  let currentSearchIndex = -1;

  function clearSearchHighlights() {
    if (!elements.messagesFlowContainer) return;
    const marks = elements.messagesFlowContainer.querySelectorAll('mark.chat-search-match');
    marks.forEach(mark => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      }
    });
    searchMatches = [];
    currentSearchIndex = -1;
    if (elements.chatSearchCount) elements.chatSearchCount.textContent = '0/0';
  }

  function performSearch(query) {
    clearSearchHighlights();
    const q = (query || '').trim().toLowerCase();
    if (!q || !elements.messagesFlowContainer) {
      if (elements.chatSearchCount) elements.chatSearchCount.textContent = '0/0';
      return;
    }

    const bubbles = elements.messagesFlowContainer.querySelectorAll('.msg-bubble');
    bubbles.forEach(bubble => {
      const textNodes = [];
      const walker = document.createTreeWalker(bubble, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (node.parentNode && (node.parentNode.closest('.msg-meta') || node.parentNode.closest('.msg-file-card'))) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      });

      let n;
      while ((n = walker.nextNode())) {
        if (n.nodeValue && n.nodeValue.toLowerCase().includes(q)) {
          textNodes.push(n);
        }
      }

      textNodes.forEach(node => {
        const val = node.nodeValue;
        const lowerVal = val.toLowerCase();
        let pos = 0;
        const fragment = document.createDocumentFragment();

        while (pos < val.length) {
          const idx = lowerVal.indexOf(q, pos);
          if (idx === -1) {
            fragment.appendChild(document.createTextNode(val.substring(pos)));
            break;
          }
          if (idx > pos) {
            fragment.appendChild(document.createTextNode(val.substring(pos, idx)));
          }
          const mark = document.createElement('mark');
          mark.className = 'chat-search-match';
          mark.textContent = val.substring(idx, idx + q.length);
          fragment.appendChild(mark);
          searchMatches.push(mark);
          pos = idx + q.length;
        }
        if (node.parentNode) {
          node.parentNode.replaceChild(fragment, node);
        }
      });
    });

    if (searchMatches.length > 0) {
      currentSearchIndex = 0;
      updateActiveSearchMatch();
    } else {
      if (elements.chatSearchCount) elements.chatSearchCount.textContent = '0/0';
    }
  }

  function updateActiveSearchMatch() {
    searchMatches.forEach((m, idx) => {
      if (idx === currentSearchIndex) {
        m.classList.add('chat-search-active');
        m.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        m.classList.remove('chat-search-active');
      }
    });
    if (elements.chatSearchCount) {
      elements.chatSearchCount.textContent = `${currentSearchIndex + 1}/${searchMatches.length}`;
    }
  }

  function nextSearchMatch() {
    if (searchMatches.length === 0) return;
    currentSearchIndex = (currentSearchIndex + 1) % searchMatches.length;
    updateActiveSearchMatch();
  }

  function prevSearchMatch() {
    if (searchMatches.length === 0) return;
    currentSearchIndex = (currentSearchIndex - 1 + searchMatches.length) % searchMatches.length;
    updateActiveSearchMatch();
  }

  function toggleSearchBar() {
    if (!elements.chatSearchBar) return;
    const isHidden = elements.chatSearchBar.classList.toggle('hidden');
    if (!isHidden) {
      elements.chatSearchInput.focus();
      elements.chatSearchInput.select();
      if (elements.chatSearchInput.value) {
        performSearch(elements.chatSearchInput.value);
      }
    } else {
      clearSearchHighlights();
    }
  }

  if (elements.searchChatBtn) {
    elements.searchChatBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      elements.headerMoreDropdown?.classList.add('hidden');
      toggleSearchBar();
    });
  }

  if (elements.chatSearchCloseBtn) {
    elements.chatSearchCloseBtn.addEventListener('click', () => {
      elements.chatSearchBar?.classList.add('hidden');
      clearSearchHighlights();
    });
  }

  if (elements.chatSearchInput) {
    elements.chatSearchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });

    elements.chatSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (e.shiftKey) prevSearchMatch();
        else nextSearchMatch();
      } else if (e.key === 'Escape') {
        elements.chatSearchBar?.classList.add('hidden');
        clearSearchHighlights();
      }
    });
  }

  if (elements.chatSearchNextBtn) {
    elements.chatSearchNextBtn.addEventListener('click', nextSearchMatch);
  }

  if (elements.chatSearchPrevBtn) {
    elements.chatSearchPrevBtn.addEventListener('click', prevSearchMatch);
  }

  // =========================================================================
  // SISTEMA DE MAIS OPÇÕES (3 PONTINHOS)
  // =========================================================================
  if (elements.headerMoreOptionsBtn && elements.headerMoreDropdown) {
    elements.headerMoreOptionsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      elements.headerMoreDropdown.classList.toggle('hidden');
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (elements.headerMoreDropdown && !elements.headerMoreDropdown.contains(e.target) && e.target !== elements.headerMoreOptionsBtn) {
        elements.headerMoreDropdown.classList.add('hidden');
      }
    });
  }

  // 1. Exportar conversa (.txt)
  if (elements.optExportChat) {
    elements.optExportChat.addEventListener('click', () => {
      elements.headerMoreDropdown?.classList.add('hidden');
      exportChatToTxt();
    });
  }

  function exportChatToTxt() {
    const rows = elements.messagesFlowContainer.querySelectorAll('.msg-row');
    if (rows.length === 0) {
      return showToast('Não há mensagens na conversa para exportar.');
    }

    const partnerName = client.remoteNickname || 'Amigo';
    const partnerId = client.remotePeerId || 'Desconhecido';
    const dateStr = new Date().toLocaleString();

    let exportContent = `====================================================\n`;
    exportContent += `NEXUS P2P - HISTÓRICO DE CONVERSA ENCRIPTADA\n`;
    exportContent += `Data de Exportação: ${dateStr}\n`;
    exportContent += `Parceiro: ${partnerName} (ID: ${partnerId})\n`;
    exportContent += `====================================================\n\n`;

    rows.forEach(row => {
      const isMe = row.classList.contains('me');
      const sender = isMe ? (savedNick || 'Eu') : partnerName;
      const time = row.querySelector('.msg-meta span')?.textContent || '';
      
      const fileCard = row.querySelector('.msg-file-card strong');
      const voiceCard = row.querySelector('.voice-player-bubble');
      const textEl = row.querySelector('.msg-bubble > div:first-child');

      let body = '';
      if (fileCard) {
        body = `[Ficheiro enviado: ${fileCard.textContent.trim()}]`;
      } else if (voiceCard) {
        body = `[Mensagem de voz]`;
      } else if (textEl) {
        body = textEl.textContent.trim();
      }

      if (body) {
        exportContent += `[${time}] ${sender}: ${body}\n`;
      }
    });

    const blob = new Blob([exportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversa-${partnerName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Conversa exportada com sucesso!');
  }

  // 2. Alternar sons de notificação
  if (elements.optToggleSound) {
    elements.optToggleSound.addEventListener('click', () => {
      soundEffectsEnabled = !soundEffectsEnabled;
      if (elements.optSoundIcon) {
        elements.optSoundIcon.setAttribute('data-lucide', soundEffectsEnabled ? 'volume-2' : 'volume-x');
      }
      if (elements.optSoundText) {
        elements.optSoundText.textContent = soundEffectsEnabled ? 'Sons de Notificação: Ligados' : 'Sons de Notificação: Silenciados';
      }
      if (window.lucide) window.lucide.createIcons();
      showToast(soundEffectsEnabled ? 'Sons ativados' : 'Sons silenciados');
      elements.headerMoreDropdown?.classList.add('hidden');
    });
  }

  // 3. Informações do Contacto
  if (elements.optPartnerInfo) {
    elements.optPartnerInfo.addEventListener('click', () => {
      elements.headerMoreDropdown?.classList.add('hidden');
      if (elements.rightPanelPeerId) {
        elements.rightPanelPeerId.scrollIntoView({ behavior: 'smooth', block: 'center' });
        elements.rightPanelPeerId.style.boxShadow = '0 0 0 3px var(--primary)';
        setTimeout(() => { if (elements.rightPanelPeerId) elements.rightPanelPeerId.style.boxShadow = ''; }, 2200);
        showToast(`ID do Amigo: ${client.remotePeerId || 'Nenhum par conectado'}`);
      }
    });
  }

  // 4. Limpar Mensagens
  if (elements.optClearChat) {
    elements.optClearChat.addEventListener('click', () => {
      elements.headerMoreDropdown?.classList.add('hidden');
      elements.rightPanelClearChatBtn?.click();
    });
  }

  // 5. Desconectar Amigo
  if (elements.optDisconnect) {
    elements.optDisconnect.addEventListener('click', () => {
      elements.headerMoreDropdown?.classList.add('hidden');
      if (confirm('Deseja realmente desconectar deste amigo?')) {
        client.disconnect();
        showToast('Desconectado com sucesso.');
      }
    });
  }

  // =========================================================================
  // CONTROLADOR DA MODAL ARRASTÁVEL DE HISTÓRICO DE MENSAGENS
  // =========================================================================
  makeElementDraggable(elements.historyModalBox, elements.historyModalHeader);

  function resetHistoryModalPosition() {
    if (elements.historyModalBox) {
      elements.historyModalBox.style.transform = 'translate(-50%, -50%)';
      elements.historyModalBox.style.left = '50%';
      elements.historyModalBox.style.top = '50%';
    }
  }

  function openHistoryModal(targetPeerId) {
    elements.headerMoreDropdown?.classList.add('hidden');
    elements.chatSearchBar?.classList.add('hidden');
    clearSearchHighlights();

    populateHistoryContactSelect(targetPeerId);
    resetHistoryModalPosition();
    elements.historyOverlay?.classList.remove('hidden');
    renderHistoryList(elements.historyPartnerSelect?.value, elements.historySearchInput?.value || '');
    if (window.lucide) window.lucide.createIcons();
  }

  function closeHistoryModal() {
    elements.historyOverlay?.classList.add('hidden');
  }

  if (elements.headerHistoryBtn) {
    elements.headerHistoryBtn.addEventListener('click', () => openHistoryModal(client.remotePeerId));
  }

  if (elements.optOpenHistory) {
    elements.optOpenHistory.addEventListener('click', () => openHistoryModal(client.remotePeerId));
  }

  if (elements.closeHistoryModalBtn) {
    elements.closeHistoryModalBtn.addEventListener('click', closeHistoryModal);
  }

  // Fechar histórico ao clicar fora (no overlay)
  if (elements.historyOverlay) {
    elements.historyOverlay.addEventListener('click', (e) => {
      if (e.target === elements.historyOverlay) {
        closeHistoryModal();
      }
    });
  }

  // Fechar histórico com a tecla Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.historyOverlay && !elements.historyOverlay.classList.contains('hidden')) {
      closeHistoryModal();
    }
  });

  function populateHistoryContactSelect(selectedId) {
    if (!elements.historyPartnerSelect) return;
    elements.historyPartnerSelect.innerHTML = '';

    const peersWithHistory = ChatHistory.getAllPeers();
    const storedContacts = getStoredContacts();

    // Se o par atual estiver conectado e não tiver ainda histórico, adicioná-lo
    if (client.remotePeerId && !peersWithHistory.includes(client.remotePeerId)) {
      peersWithHistory.unshift(client.remotePeerId);
    }

    if (peersWithHistory.length === 0) {
      const opt = document.createElement('option');
      opt.value = 'geral';
      opt.textContent = 'Sem conversas guardadas ainda';
      elements.historyPartnerSelect.appendChild(opt);
      return;
    }

    peersWithHistory.forEach(pid => {
      const opt = document.createElement('option');
      opt.value = pid;
      const contact = Array.isArray(storedContacts) ? storedContacts.find(c => c.id === pid) : storedContacts[pid];
      const name = (client.remotePeerId === pid && client.remoteNickname) 
        ? client.remoteNickname 
        : (contact?.name || pid);
      opt.textContent = `${name} (${pid})`;
      if (selectedId && selectedId === pid) {
        opt.selected = true;
      }
      elements.historyPartnerSelect.appendChild(opt);
    });

    if (!elements.historyPartnerSelect.value && elements.historyPartnerSelect.options.length > 0) {
      elements.historyPartnerSelect.selectedIndex = 0;
    }
  }

  function renderHistoryList(peerId, filterQuery = '') {
    if (!elements.historyModalList) return;
    elements.historyModalList.innerHTML = '';

    if (!peerId) {
      peerId = elements.historyPartnerSelect?.value || client.remotePeerId || 'geral';
    }

    const messages = ChatHistory.getMessages(peerId);
    const q = (filterQuery || '').trim().toLowerCase();

    const filtered = messages.filter(m => {
      if (!q) return true;
      const textMatch = m.text && m.text.toLowerCase().includes(q);
      const dateMatch = (m.dateFormatted && m.dateFormatted.includes(q)) || (m.fullDateTime && m.fullDateTime.toLowerCase().includes(q));
      const senderMatch = m.senderName && m.senderName.toLowerCase().includes(q);
      const fileMatch = m.fileName && m.fileName.toLowerCase().includes(q);
      return textMatch || dateMatch || senderMatch || fileMatch;
    });

    if (elements.historyTotalBadge) {
      elements.historyTotalBadge.textContent = `${filtered.length} mensagem${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      elements.historyModalList.innerHTML = `
        <div class="history-empty-placeholder">
          <i data-lucide="inbox" style="width:36px; height:36px; opacity:0.4; margin-bottom:8px;"></i>
          <p>Nenhuma mensagem encontrada neste histórico.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    let lastGroupDate = null;
    filtered.forEach(msg => {
      if (msg.dateFormatted && msg.dateFormatted !== lastGroupDate) {
        lastGroupDate = msg.dateFormatted;
        const div = document.createElement('div');
        div.className = 'chat-date-divider';
        div.innerHTML = `<span class="chat-date-badge"><i data-lucide="calendar" style="width:12px; height:12px;"></i> ${escapeHtml(msg.dateFormatted)}</span>`;
        elements.historyModalList.appendChild(div);
      }

      const item = document.createElement('div');
      item.className = `history-item ${msg.sender === 'me' ? 'me' : 'peer'}`;

      let contentHtml = escapeHtml(msg.text);
      if (msg.isFile) {
        contentHtml = `📎 <strong>${escapeHtml(msg.fileName || 'Ficheiro')}</strong> ${msg.fileSize ? `(${formatBytes(msg.fileSize)})` : ''}`;
      } else if (msg.isVoice) {
        contentHtml = `🎙️ <em>Mensagem de voz gravada</em> ${msg.duration ? `(${msg.duration}s)` : ''}`;
      }

      item.innerHTML = `
        <div class="history-item-top">
          <span class="history-item-sender">${escapeHtml(msg.senderName || (msg.sender === 'me' ? savedNick : 'Amigo'))}</span>
          <span class="history-item-datetime">${escapeHtml(msg.fullDateTime || msg.timeFormatted || '')}</span>
        </div>
        <div class="history-item-text">${contentHtml}</div>
      `;

      elements.historyModalList.appendChild(item);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  if (elements.historyPartnerSelect) {
    elements.historyPartnerSelect.addEventListener('change', (e) => {
      renderHistoryList(e.target.value, elements.historySearchInput?.value || '');
    });
  }

  if (elements.historySearchInput) {
    elements.historySearchInput.addEventListener('input', (e) => {
      renderHistoryList(elements.historyPartnerSelect?.value, e.target.value);
    });
  }

  // Carregar histórico no ecrã do Chat
  if (elements.btnLoadHistoryIntoChat) {
    elements.btnLoadHistoryIntoChat.addEventListener('click', () => {
      const peerId = elements.historyPartnerSelect?.value;
      const messages = ChatHistory.getMessages(peerId);
      if (messages.length === 0) {
        return showToast('Não há mensagens para carregar no ecrã.');
      }

      elements.messagesFlowContainer.innerHTML = '';
      lastRenderedChatDate = null;

      messages.forEach(m => {
        if (m.isFile) {
          appendFileMsg({
            sender: m.sender,
            senderName: m.senderName,
            name: m.fileName,
            size: m.fileSize,
            url: '#',
            isImage: m.isImage,
            time: m.timestamp
          }, true);
        } else if (m.isVoice) {
          appendVoiceMsg({
            sender: m.sender,
            senderName: m.senderName,
            audioData: '',
            duration: m.duration,
            time: m.timestamp
          }, true);
        } else {
          appendMessage({
            sender: m.sender,
            senderName: m.senderName,
            text: m.text,
            time: m.timestamp,
            id: m.id
          }, true);
        }
      });

      closeHistoryModal();
      showToast(`${messages.length} mensagens carregadas para o ecrã.`);
    });
  }

  // Exportar histórico para ficheiro TXT
  if (elements.btnExportHistoryTxt) {
    elements.btnExportHistoryTxt.addEventListener('click', () => {
      const peerId = elements.historyPartnerSelect?.value || client.remotePeerId || 'geral';
      const messages = ChatHistory.getMessages(peerId);
      if (messages.length === 0) {
        return showToast('Não há mensagens neste histórico para exportar.');
      }

      let txt = `====================================================\n`;
      txt += `NEXUS P2P - HISTÓRICO COMPLETO DA CONVERSA\n`;
      txt += `Contacto / ID: ${peerId}\n`;
      txt += `Data da Exportação: ${new Date().toLocaleString()}\n`;
      txt += `Total de Mensagens: ${messages.length}\n`;
      txt += `====================================================\n\n`;

      messages.forEach(m => {
        const sender = m.senderName || (m.sender === 'me' ? savedNick : 'Amigo');
        const dt = m.fullDateTime || m.dateFormatted || '';
        let body = m.text;
        if (m.isFile) body = `[Ficheiro: ${m.fileName || ''} (${formatBytes(m.fileSize || 0)})]`;
        if (m.isVoice) body = `[Nota de voz: ${m.duration || 0}s]`;
        txt += `[${dt}] ${sender}: ${body}\n`;
      });

      const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `historico-${peerId}-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Ficheiro de histórico descarregado!');
    });
  }

  // Limpar histórico deste contacto
  if (elements.btnClearHistoryContact) {
    elements.btnClearHistoryContact.addEventListener('click', () => {
      const peerId = elements.historyPartnerSelect?.value;
      if (!peerId) return;
      if (confirm(`Deseja apagar permanentemente o histórico guardado deste contacto (${peerId})?`)) {
        ChatHistory.clear(peerId);
        populateHistoryContactSelect();
        renderHistoryList(elements.historyPartnerSelect?.value);
        showToast('Histórico apagado.');
      }
    });
  }

  // =========================================================================
  // RENDERIZAÇÃO DE MENSAGENS NO CHAT
  // =========================================================================
  function prepareChatContainer() {
    elements.chatHeroState.classList.add('hidden');
    elements.messagesFlowContainer.classList.remove('hidden');
  }

  function appendMessage(data, skipSave = false) {
    prepareChatContainer();
    checkAndAppendDateDivider(elements.messagesFlowContainer, data.time);
    const isMe = data.sender === 'me';
    const row = document.createElement('div');
    row.className = `msg-row ${isMe ? 'me' : 'peer'}`;

    const dateStr = formatDateOnly(data.time);
    const timeStr = formatTime(data.time);

    row.innerHTML = `
      <div class="msg-bubble">
        <div>${escapeHtml(data.text)}</div>
        <div class="msg-meta">
          <span title="${escapeHtml(dateStr)} às ${escapeHtml(timeStr)}">
            <small class="msg-date-tag">${escapeHtml(dateStr)}</small>${escapeHtml(timeStr)}
          </span>
          ${isMe ? `<span id="status-${data.id}">✓</span>` : ''}
        </div>
      </div>
    `;

    elements.messagesFlowContainer.appendChild(row);
    scrollChat();

    if (!skipSave) {
      ChatHistory.save(client.remotePeerId, data);
    }
  }

  function appendFileMsg(data, skipSave = false) {
    prepareChatContainer();
    checkAndAppendDateDivider(elements.messagesFlowContainer, data.time);
    const isMe = data.sender === 'me';
    const row = document.createElement('div');
    row.className = `msg-row ${isMe ? 'me' : 'peer'}`;

    let imgTag = data.isImage ? `<img src="${data.url}" class="msg-image" onclick="openLightbox('${data.url}')">` : '';
    const dateStr = formatDateOnly(data.time);
    const timeStr = formatTime(data.time);

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
          <span title="${escapeHtml(dateStr)} às ${escapeHtml(timeStr)}">
            <small class="msg-date-tag">${escapeHtml(dateStr)}</small>${escapeHtml(timeStr)}
          </span>
          ${isMe ? '<span>✓✓</span>' : ''}
        </div>
      </div>
    `;

    elements.messagesFlowContainer.appendChild(row);
    if (window.lucide) window.lucide.createIcons();
    scrollChat();

    if (!skipSave) {
      ChatHistory.save(client.remotePeerId, data);
    }
  }

  function appendVoiceMsg(data, skipSave = false) {
    prepareChatContainer();
    checkAndAppendDateDivider(elements.messagesFlowContainer, data.time);
    const isMe = data.sender === 'me';
    const row = document.createElement('div');
    row.className = `msg-row ${isMe ? 'me' : 'peer'}`;

    const dateStr = formatDateOnly(data.time);
    const timeStr = formatTime(data.time);

    row.innerHTML = `
      <div class="msg-bubble">
        <div style="display:flex; align-items:center; gap:8px;">
          <audio src="${data.audioData}" controls style="max-width:220px; height:36px;"></audio>
        </div>
        <div class="msg-meta">
          <span title="${escapeHtml(dateStr)} às ${escapeHtml(timeStr)}">
            <small class="msg-date-tag">${escapeHtml(dateStr)}</small>${escapeHtml(timeStr)}
          </span>
          ${isMe ? '<span>✓✓</span>' : ''}
        </div>
      </div>
    `;

    elements.messagesFlowContainer.appendChild(row);
    scrollChat();

    if (!skipSave) {
      ChatHistory.save(client.remotePeerId, data);
    }
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
