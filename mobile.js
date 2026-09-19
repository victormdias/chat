/**
 * NEXUS P2P MOBILE - APP CONTROLLER
 * Otimizado para smartphones, toque e partilha nativa (Web Share API).
 */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  // Sincronizar altura visual real do telemóvel (especialmente com teclado virtual aberto)
  if (window.visualViewport) {
    const syncViewportHeight = () => {
      document.documentElement.style.setProperty('--app-height', `${window.visualViewport.height}px`);
    };
    window.visualViewport.addEventListener('resize', syncViewportHeight);
    window.visualViewport.addEventListener('scroll', syncViewportHeight);
    syncViewportHeight();
  }

  const client = new P2PClient();

  // Elementos DOM Mobile
  const elements = {
    // Top Bar
    mHeaderAvatar: document.getElementById('mHeaderAvatar'),
    mHeaderDot: document.getElementById('mHeaderDot'),
    mHeaderTitle: document.getElementById('mHeaderTitle'),
    mHeaderSubtitle: document.getElementById('mHeaderSubtitle'),
    mLatencyTag: document.getElementById('mLatencyTag'),
    mLatencyVal: document.getElementById('mLatencyVal'),
    mThemeToggleBtn: document.getElementById('mThemeToggleBtn'),
    mThemeIcon: document.getElementById('mThemeIcon'),
    mFloatLeaveBtn: document.getElementById('mFloatLeaveBtn'),

    // Top Bar Actions & More Options
    mHeaderAddFriendBtn: document.getElementById('mHeaderAddFriendBtn'),
    mHistoryBtn: document.getElementById('mHistoryBtn'),
    mSearchBtn: document.getElementById('mSearchBtn'),
    mMoreBtn: document.getElementById('mMoreBtn'),
    mSearchBar: document.getElementById('mSearchBar'),
    mSearchInput: document.getElementById('mSearchInput'),
    mSearchCount: document.getElementById('mSearchCount'),
    mSearchPrevBtn: document.getElementById('mSearchPrevBtn'),
    mSearchNextBtn: document.getElementById('mSearchNextBtn'),
    mSearchCloseBtn: document.getElementById('mSearchCloseBtn'),
    mMoreDropdown: document.getElementById('mMoreDropdown'),
    mOptAddFriend: document.getElementById('mOptAddFriend'),
    mOptMyFriends: document.getElementById('mOptMyFriends'),
    mOptHistory: document.getElementById('mOptHistory'),
    mOptExportChat: document.getElementById('mOptExportChat'),
    mOptToggleSound: document.getElementById('mOptToggleSound'),
    mOptSoundIcon: document.getElementById('mOptSoundIcon'),
    mOptSoundText: document.getElementById('mOptSoundText'),
    mOptClearChat: document.getElementById('mOptClearChat'),
    mOptDisconnect: document.getElementById('mOptDisconnect'),

    // Mobile Add Friend Modal
    mOpenAddFriendModalBtn: document.getElementById('mOpenAddFriendModalBtn'),
    mAddFriendModal: document.getElementById('mAddFriendModal'),
    mCloseAddFriendModalBtn: document.getElementById('mCloseAddFriendModalBtn'),
    mModalFriendIdInput: document.getElementById('mModalFriendIdInput'),
    mModalFriendNameInput: document.getElementById('mModalFriendNameInput'),
    mBtnPasteFriendId: document.getElementById('mBtnPasteFriendId'),
    mBtnSaveFriendOnly: document.getElementById('mBtnSaveFriendOnly'),
    mBtnSaveAndConnectFriend: document.getElementById('mBtnSaveAndConnectFriend'),

    // Mobile History Modal
    mHistoryOverlay: document.getElementById('mHistoryOverlay'),
    mHistoryBox: document.getElementById('mHistoryBox'),
    mHistoryHeader: document.getElementById('mHistoryHeader'),
    mCloseHistoryBtn: document.getElementById('mCloseHistoryBtn'),
    mHistoryPartnerSelect: document.getElementById('mHistoryPartnerSelect'),
    mHistorySearchInput: document.getElementById('mHistorySearchInput'),
    mHistoryList: document.getElementById('mHistoryList'),
    mBtnExportHistory: document.getElementById('mBtnExportHistory'),
    mBtnClearHistory: document.getElementById('mBtnClearHistory'),
    mBtnLoadHistory: document.getElementById('mBtnLoadHistory'),

    // Views
    viewChat: document.getElementById('view-chat'),
    viewConnect: document.getElementById('view-connect'),
    viewCall: document.getElementById('view-call'),
    viewSettings: document.getElementById('view-settings'),
    navTabs: document.querySelectorAll('.nav-tab'),
    mUnreadDot: document.getElementById('mUnreadDot'),

    // Chat View
    mMessagesContainer: document.getElementById('mMessagesContainer'),
    mEmptyState: document.getElementById('mEmptyState'),
    mGoConnectBtn: document.getElementById('mGoConnectBtn'),
    mTypingBar: document.getElementById('mTypingBar'),
    mTypingText: document.getElementById('mTypingText'),
    mChatForm: document.getElementById('mChatForm'),
    mFileInput: document.getElementById('mFileInput'),
    mAttachBtn: document.getElementById('mAttachBtn'),
    mMessageInput: document.getElementById('mMessageInput'),
    mEmojiBtn: document.getElementById('mEmojiBtn'),
    mQuickEmojis: document.getElementById('mQuickEmojis'),
    mRecordVoiceBtn: document.getElementById('mRecordVoiceBtn'),
    mNudgeBtn: document.getElementById('mNudgeBtn'),
    mSendBtn: document.getElementById('mSendBtn'),
    mVoiceBar: document.getElementById('mVoiceBar'),
    mRecTimer: document.getElementById('mRecTimer'),
    mCancelVoiceBtn: document.getElementById('mCancelVoiceBtn'),
    mSendVoiceBtn: document.getElementById('mSendVoiceBtn'),

    // Connect View
    mMyAvatar: document.getElementById('mMyAvatar'),
    mMyNameTitle: document.getElementById('mMyNameTitle'),
    mMyStatusBadge: document.getElementById('mMyStatusBadge'),
    mMyIdText: document.getElementById('mMyIdText'),
    mCopyMyIdBtn: document.getElementById('mCopyMyIdBtn'),
    mShareNativeBtn: document.getElementById('mShareNativeBtn'),
    mQrcodeBox: document.getElementById('mQrcodeBox'),
    mRemotePeerInput: document.getElementById('mRemotePeerInput'),
    mConnectRemoteBtn: document.getElementById('mConnectRemoteBtn'),
    mAddFriendBtn: document.getElementById('mAddFriendBtn'),
    mActiveSessionCard: document.getElementById('mActiveSessionCard'),
    mActivePartnerAvatar: document.getElementById('mActivePartnerAvatar'),
    mActivePartnerName: document.getElementById('mActivePartnerName'),
    mActivePartnerId: document.getElementById('mActivePartnerId'),
    mDisconnectBtn: document.getElementById('mDisconnectBtn'),
    mContactsCard: document.getElementById('mContactsCard'),
    mContactsCountBadge: document.getElementById('mContactsCountBadge'),
    mContactsList: document.getElementById('mContactsList'),
    mBackupContactsBtn: document.getElementById('mBackupContactsBtn'),
    mBackupModal: document.getElementById('mBackupModal'),
    mCloseBackupModalBtn: document.getElementById('mCloseBackupModalBtn'),
    mBtnDownloadJsonBackup: document.getElementById('mBtnDownloadJsonBackup'),
    mContactsJsonFileInput: document.getElementById('mContactsJsonFileInput'),
    mBtnUploadJsonBackup: document.getElementById('mBtnUploadJsonBackup'),
    mChkAutoDownloadBackup: document.getElementById('mChkAutoDownloadBackup'),
    mBackupDataTextarea: document.getElementById('mBackupDataTextarea'),
    mBtnCopyCode: document.getElementById('mBtnCopyCode'),
    mBtnRestoreCode: document.getElementById('mBtnRestoreCode'),

    // Call View
    mCallPartnerName: document.getElementById('mCallPartnerName'),
    mCallDuration: document.getElementById('mCallDuration'),
    mVideoContainer: document.getElementById('mVideoContainer'),
    mRemoteVideo: document.getElementById('mRemoteVideo'),
    mLocalPip: document.getElementById('mLocalPip'),
    mLocalVideo: document.getElementById('mLocalVideo'),
    mLocalOffPlaceholder: document.getElementById('mLocalOffPlaceholder'),
    mVideoFallback: document.getElementById('mVideoFallback'),
    mCallFallbackAvatar: document.getElementById('mCallFallbackAvatar'),
    mCallFallbackText: document.getElementById('mCallFallbackText'),
    mAudioStage: document.getElementById('mAudioStage'),
    mRemoteAudio: document.getElementById('mRemoteAudio'),
    mAudioAvatar: document.getElementById('mAudioAvatar'),
    mAudioCallerName: document.getElementById('mAudioCallerName'),
    mPreCallActions: document.getElementById('mPreCallActions'),
    mActiveCallActions: document.getElementById('mActiveCallActions'),
    mStartAudioCallBtn: document.getElementById('mStartAudioCallBtn'),
    mStartVideoCallBtn: document.getElementById('mStartVideoCallBtn'),
    mToggleMuteBtn: document.getElementById('mToggleMuteBtn'),
    mToggleCamBtn: document.getElementById('mToggleCamBtn'),
    mFlipCamBtn: document.getElementById('mFlipCamBtn'),
    mHangupBtn: document.getElementById('mHangupBtn'),

    // Settings View
    mSettingsAvatarPreview: document.getElementById('mSettingsAvatarPreview'),
    mSettingsPhotoInput: document.getElementById('mSettingsPhotoInput'),
    mUploadPhotoBtn: document.getElementById('mUploadPhotoBtn'),
    mRemovePhotoBtn: document.getElementById('mRemovePhotoBtn'),
    mSettingsNickInput: document.getElementById('mSettingsNickInput'),
    mSaveNickBtn: document.getElementById('mSaveNickBtn'),
    mSettingsCustomIdInput: document.getElementById('mSettingsCustomIdInput'),
    mSaveCustomIdBtn: document.getElementById('mSaveCustomIdBtn'),
    mRegenCustomIdBtn: document.getElementById('mRegenCustomIdBtn'),
    mSetThemeLight: document.getElementById('mSetThemeLight'),
    mSetThemeDark: document.getElementById('mSetThemeDark'),

    // Incoming Call Modal
    mIncomingCallModal: document.getElementById('mIncomingCallModal'),
    mIncomingAvatar: document.getElementById('mIncomingAvatar'),
    mIncomingCaller: document.getElementById('mIncomingCaller'),
    mIncomingType: document.getElementById('mIncomingType'),
    mRejectCallBtn: document.getElementById('mRejectCallBtn'),
    mAcceptCallBtn: document.getElementById('mAcceptCallBtn'),

    // Lightbox & Toast
    mLightbox: document.getElementById('mLightbox'),
    mLightboxImg: document.getElementById('mLightboxImg'),
    mCloseLightboxBtn: document.getElementById('mCloseLightboxBtn'),
    mToastContainer: document.getElementById('mToastContainer')
  };

  let isConnected = false;
  let typingTimeout = null;
  let mediaRecorder = null;
  let audioChunks = [];
  let recordingStartTime = null;

  // =========================================================================
  // PERFIL PERSISTENTE (ID FIXO, NOME E FOTO)
  // =========================================================================
  function getPersistentMobileId() {
    let id = localStorage.getItem('nexus_peer_id');
    if (!id) {
      id = 'nexus-' + Math.random().toString(36).substring(2, 8);
      localStorage.setItem('nexus_peer_id', id);
    }
    return id;
  }

  let savedMobileId = getPersistentMobileId();
  let savedNick = localStorage.getItem('nexus_nickname') || 'Utilizador-' + Math.floor(100 + Math.random() * 900);
  let savedAvatar = localStorage.getItem('nexus_avatar') || null;

  function renderMobileAvatar(el, name, photoUrl) {
    if (!el) return;
    if (photoUrl) {
      el.innerHTML = `<img src="${photoUrl}" alt="${escapeHtml(name || '')}" class="avatar-img-fit">`;
      el.classList.add('has-photo');
    } else {
      el.classList.remove('has-photo');
      el.textContent = (name || 'P').substring(0, 2).toUpperCase();
    }
  }

  function processMobileAvatarFile(file, callback) {
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

  function updateMobileProfileUI() {
    if (elements.mMyNameTitle) elements.mMyNameTitle.textContent = savedNick;
    if (elements.mMyIdText) elements.mMyIdText.textContent = savedMobileId;
    if (elements.mSettingsNickInput) elements.mSettingsNickInput.value = savedNick;
    if (elements.mSettingsCustomIdInput) elements.mSettingsCustomIdInput.value = savedMobileId;

    renderMobileAvatar(elements.mMyAvatar, savedNick, savedAvatar);
    renderMobileAvatar(elements.mSettingsAvatarPreview, savedNick, savedAvatar);

    if (savedAvatar) {
      elements.mRemovePhotoBtn?.classList.remove('hidden');
    } else {
      elements.mRemovePhotoBtn?.classList.add('hidden');
    }
  }

  // =========================================================================
  // SISTEMA DE HISTÓRICO PERMANENTE DE CONVERSAS (LOCALSTORAGE - MOBILE)
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
          senderName: msg.senderName || (msg.sender === 'me' ? (savedNick || 'Eu') : 'Amigo'),
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
        console.warn('Erro ao guardar histórico mobile:', e);
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

  let lastRenderedMobileDate = null;
  function checkAndAppendDateDivider(container, timestamp) {
    if (!container) return;
    const dateStr = formatDateOnly(timestamp);
    if (dateStr !== lastRenderedMobileDate) {
      lastRenderedMobileDate = dateStr;
      const divider = document.createElement('div');
      divider.className = 'chat-date-divider';
      divider.innerHTML = `<span class="chat-date-badge"><i data-lucide="calendar" style="width:11px; height:11px;"></i> ${escapeHtml(dateStr)}</span>`;
      container.appendChild(divider);
      if (window.lucide) window.lucide.createIcons();
    }
  }

  // =========================================================================
  // GESTÃO DE CONTACTOS / AMIGOS (LISTA PERSISTENTE & ESTADO ONLINE/OFFLINE)
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
    if (!cleanId || cleanId === savedMobileId) return; // Não guardar o próprio ID
    const list = getStoredContacts();
    const idx = list.findIndex(c => c.id === cleanId);

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

  function renderMobileContacts() {
    if (!elements.mContactsList) return;
    const contacts = getStoredContacts();
    const activeId = isConnected && client.remotePeerId ? client.remotePeerId : null;
    const onlineCount = contacts.filter(c => isContactOnline(c.id)).length;

    if (elements.mContactsCountBadge) {
      elements.mContactsCountBadge.textContent = `${onlineCount} online • ${contacts.length} ${contacts.length === 1 ? 'amigo' : 'amigos'}`;
    }

    if (contacts.length === 0) {
      elements.mContactsList.innerHTML = `
        <div class="m-empty-contacts">
          Nenhum amigo guardado ainda.<br>
          <small style="opacity:0.8">Insira um ID e clique em Guardar ou Conectar.</small>
        </div>
      `;
      return;
    }

    elements.mContactsList.innerHTML = '';

    contacts.forEach(contact => {
      const isOnline = isContactOnline(contact.id);
      const isCurrentChat = activeId === contact.id;

      const item = document.createElement('div');
      item.className = `m-contact-item ${isCurrentChat ? 'active' : ''}`;

      const avatarHtml = contact.avatar
        ? `<img src="${contact.avatar}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`
        : escapeHtml((contact.name || contact.id || 'A').substring(0, 2).toUpperCase());

      item.innerHTML = `
        <div style="position:relative; width:38px; height:38px; flex-shrink:0;">
          <div class="m-avatar" style="width:38px; height:38px; font-size:0.85rem;">${avatarHtml}</div>
          <span class="m-status-dot ${isOnline ? 'dot-online' : 'dot-offline'}" title="${isOnline ? (isCurrentChat ? 'Online • Conectado' : 'Online • Disponível') : 'Offline'}"></span>
        </div>
        <div class="m-contact-info">
          <strong class="m-contact-name">${escapeHtml(contact.name || 'Amigo')}</strong>
          <div class="m-contact-sub">
            <span class="m-dot-tiny ${isOnline ? 'online' : 'offline'}"></span>
            <span>${isOnline ? (isCurrentChat ? 'Online • conectado' : 'Online') : 'Offline'}</span>
            <span style="opacity:0.5; font-family:monospace;">• ${escapeHtml(contact.id)}</span>
          </div>
        </div>
        <div style="display:flex; align-items:center;">
          <button type="button" class="m-btn-remove-contact m-btn-edit-contact" title="Editar nome">
            <i data-lucide="edit-2"></i>
          </button>
          <button type="button" class="m-btn-remove-contact" title="Remover amigo">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      `;

      item.addEventListener('click', async (e) => {
        if (e.target.closest('.m-btn-remove-contact') || e.target.closest('.m-btn-edit-contact')) return;
        if (isCurrentChat) {
          switchTab('view-chat');
          return;
        }

        elements.mRemotePeerInput.value = contact.id;
        showToast(`A ligar a ${contact.name}...`);
        try {
          await client.connect(contact.id);
        } catch (err) {
          console.warn('Erro ao conectar via contacto:', err);
        }
      });

      const editBtn = item.querySelector('.m-btn-edit-contact');
      if (editBtn) {
        editBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const newName = prompt(`Nome para este amigo (${contact.id}):`, contact.name);
          if (newName && newName.trim()) {
            saveStoredContact(contact.id, newName.trim(), contact.avatar);
            renderMobileContacts();
            syncFriendsPresence();
            showToast('Nome atualizado!');
          }
        });
      }

      const removeBtn = item.querySelector('button[title="Remover amigo"]');
      if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (confirm(`Remover "${contact.name}" dos seus amigos guardados?`)) {
            removeStoredContact(contact.id);
            onlineFriendsMap.delete(contact.id);
            renderMobileContacts();
            showToast('Amigo removido.');
          }
        });
      }

      elements.mContactsList.appendChild(item);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  let isSyncingPresence = false;
  async function syncFriendsPresence() {
    if (isSyncingPresence) return;
    isSyncingPresence = true;
    try {
      const contacts = getStoredContacts();
      const myId = savedMobileId || (client && client.myPeerId);
      let serverAssisted = false;

      // 1. Endpoint do servidor local / túnel Cloudflare
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
            renderMobileContacts();
          }
        }
      } catch (e) {
        // Servidor local não respondeu (ex: GitHub Pages estático)
      }

      // 2. Sondagem WebRTC P2P (PeerJS) fallback
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
            renderMobileContacts();
          }).catch(() => {});

          await new Promise(r => setTimeout(r, 600));
        }
      }
    } finally {
      isSyncingPresence = false;
    }
  }

  // =========================================================================
  // SISTEMA DE BACKUP AUTOMÁTICO E RESTAURAÇÃO (.JSON) - MOBILE
  // =========================================================================
  let mobileDownloadDebounceTimer = null;
  function debouncedMobileDownloadJsonBackup() {
    if (mobileDownloadDebounceTimer) clearTimeout(mobileDownloadDebounceTimer);
    mobileDownloadDebounceTimer = setTimeout(() => {
      downloadMobileContactsJsonFile(true);
    }, 1500);
  }

  function autoSyncBackup(customList = null) {
    const list = customList || getStoredContacts();
    const payload = {
      app: 'nexus-p2p-chat',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      myId: savedMobileId || (client && client.myPeerId) || null,
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
      debouncedMobileDownloadJsonBackup();
    }
  }

  function downloadMobileContactsJsonFile(isAuto = false) {
    const contacts = getStoredContacts();
    if (contacts.length === 0 && !isAuto) {
      return showToast('Ainda não tem amigos guardados para exportar.');
    }
    const payload = {
      app: 'nexus-p2p-chat',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      myId: savedMobileId || (client && client.myPeerId) || null,
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

  function handleMobileRestoreFromJson(data, sourceName = 'ficheiro') {
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
      if (cleanId && cleanId !== savedMobileId) {
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

    renderMobileContacts();
    syncFriendsPresence();
    autoSyncBackup(current);

    if (elements.mBackupModal) elements.mBackupModal.classList.add('hidden');
    showToast(`✅ ${restoredCount} amigo(s) restaurados com sucesso a partir de ${sourceName}!`);
  }

  function processMobileJsonFile(file) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.json') && file.type !== 'application/json') {
      return showToast('Por favor selecione um ficheiro .json válido.');
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        handleMobileRestoreFromJson(parsed, file.name);
      } catch (err) {
        showToast('Erro: o ficheiro não contém JSON válido.');
      }
    };
    reader.onerror = () => showToast('Erro ao ler o ficheiro.');
    reader.readAsText(file);
  }

  // Abrir Modal de Backup Mobile
  if (elements.mBackupContactsBtn) {
    elements.mBackupContactsBtn.addEventListener('click', () => {
      const contacts = getStoredContacts();
      if (elements.mBackupDataTextarea) {
        elements.mBackupDataTextarea.value = contacts.length > 0 ? JSON.stringify(contacts, null, 2) : '';
      }
      if (elements.mChkAutoDownloadBackup) {
        elements.mChkAutoDownloadBackup.checked = localStorage.getItem('nexus_auto_download_json') === 'true';
      }
      elements.mBackupModal?.classList.remove('hidden');
      if (window.lucide) window.lucide.createIcons();
    });
  }

  if (elements.mCloseBackupModalBtn) {
    elements.mCloseBackupModalBtn.addEventListener('click', () => {
      elements.mBackupModal?.classList.add('hidden');
    });
  }

  if (elements.mBackupModal) {
    elements.mBackupModal.addEventListener('click', (e) => {
      if (e.target === elements.mBackupModal) {
        elements.mBackupModal.classList.add('hidden');
      }
    });
  }

  // Botão Descarregar JSON no Telemóvel
  if (elements.mBtnDownloadJsonBackup) {
    elements.mBtnDownloadJsonBackup.addEventListener('click', () => {
      downloadMobileContactsJsonFile(false);
    });
  }

  // Botão Carregar Ficheiro JSON no Telemóvel
  if (elements.mBtnUploadJsonBackup && elements.mContactsJsonFileInput) {
    elements.mBtnUploadJsonBackup.addEventListener('click', () => {
      elements.mContactsJsonFileInput.click();
    });
  }

  if (elements.mContactsJsonFileInput) {
    elements.mContactsJsonFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        processMobileJsonFile(file);
        elements.mContactsJsonFileInput.value = '';
      }
    });
  }

  // Toggle Backup Automático Mobile
  if (elements.mChkAutoDownloadBackup) {
    elements.mChkAutoDownloadBackup.addEventListener('change', (e) => {
      localStorage.setItem('nexus_auto_download_json', e.target.checked ? 'true' : 'false');
      if (e.target.checked) {
        showToast('Backup automático ativado!');
        downloadMobileContactsJsonFile(true);
      } else {
        showToast('Backup automático desativado.');
      }
    });
  }

  // Opções manuais de código texto
  if (elements.mBtnCopyCode) {
    elements.mBtnCopyCode.addEventListener('click', () => {
      const contacts = getStoredContacts();
      if (contacts.length === 0) return showToast('Ainda não tem amigos guardados.');
      const json = JSON.stringify(contacts, null, 2);
      navigator.clipboard.writeText(json);
      if (elements.mBackupDataTextarea) elements.mBackupDataTextarea.value = json;
      showToast('Código copiado para a área de transferência!');
    });
  }

  if (elements.mBtnRestoreCode) {
    elements.mBtnRestoreCode.addEventListener('click', () => {
      const text = elements.mBackupDataTextarea?.value.trim();
      if (!text) return showToast('Cole o código de backup no campo de texto.');
      try {
        const parsed = JSON.parse(text);
        handleMobileRestoreFromJson(parsed, 'código inserido');
      } catch (e) {
        showToast('Código de backup inválido.');
      }
    });
  }

  let recordingTimerInterval = null;
  let pendingIncomingCall = null;
  let callTimerInterval = null;
  let callStartTime = null;

  // =========================================================================
  // GESTÃO DE TEMA (CLARO / ESCURO)
  // =========================================================================
  let currentTheme = localStorage.getItem('nexus_theme') || 'light';
  applyTheme(currentTheme);

  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nexus_theme', theme);

    if (elements.mThemeIcon) {
      elements.mThemeIcon.setAttribute('data-lucide', theme === 'light' ? 'moon' : 'sun');
    }
    if (elements.mSetThemeLight && elements.mSetThemeDark) {
      elements.mSetThemeLight.classList.toggle('active', theme === 'light');
      elements.mSetThemeDark.classList.toggle('active', theme === 'dark');
    }
    if (window.lucide) window.lucide.createIcons();
  }

  elements.mThemeToggleBtn.addEventListener('click', () => {
    applyTheme(currentTheme === 'light' ? 'dark' : 'light');
    showToast(currentTheme === 'light' ? 'Tema Claro ativado' : 'Tema Escuro ativado');
  });

  elements.mSetThemeLight.addEventListener('click', () => applyTheme('light'));
  elements.mSetThemeDark.addEventListener('click', () => applyTheme('dark'));



  // =========================================================================
  // NAVEGAÇÃO ENTRE ABAS MOBILE
  // =========================================================================
  elements.navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      switchTab(targetId);
    });
  });

  elements.mGoConnectBtn.addEventListener('click', () => switchTab('view-connect'));

  function switchTab(targetViewId) {
    elements.navTabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-target') === targetViewId);
    });
    document.querySelectorAll('.tab-view').forEach(view => {
      view.classList.toggle('active', view.id === targetViewId);
    });
    if (targetViewId === 'view-chat') {
      elements.mUnreadDot.classList.add('hidden');
      scrollToBottom();
    }
    if (window.lucide) window.lucide.createIcons();
  }

  // =========================================================================
  // SONS WEB AUDIO API
  // =========================================================================
  let audioCtx = null;
  let soundMobileEnabled = true;
  function getAudioContext() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  const Sound = {
    send() {
      if (!soundMobileEnabled) return;
      try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      } catch (e) {}
    },
    receive() {
      if (!soundMobileEnabled) return;
      try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(460, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(690, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } catch (e) {}
    },
    ring() {
      try {
        const ctx = getAudioContext();
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
        const ctx = getAudioContext();
        const now = ctx.currentTime;
        // Pulse 1
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(220, now);
        osc1.frequency.exponentialRampToValueAtTime(50, now + 0.12);
        gain1.gain.setValueAtTime(0.32, now);
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
        gain2.gain.setValueAtTime(0.38, now + 0.14);
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
    ringInterval = setInterval(() => Sound.ring(), 2500);
  }
  function stopRinging() {
    if (ringInterval) {
      clearInterval(ringInterval);
      ringInterval = null;
    }
  }

  function showToast(text) {
    const toast = document.createElement('div');
    toast.className = 'm-toast';
    toast.innerHTML = `<i data-lucide="info"></i> <span>${escapeHtml(text)}</span>`;
    elements.mToastContainer.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // =========================================================================
  // GERAR QR CODE & PARTILHA NATIVA (WHATSAPP, TELEGRAM, ETC.)
  // =========================================================================
  function updateMobileShare(peerId) {
    const url = new URL(window.location.href);
    url.hash = `connect=${peerId}`;
    const shareUrl = url.toString();

    elements.mMyIdText.textContent = peerId;

    if (window.QRCode) {
      elements.mQrcodeBox.innerHTML = '';
      new QRCode(elements.mQrcodeBox, {
        text: shareUrl,
        width: 170,
        height: 170,
        colorDark: "#0b0f19",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
      });
    }

    elements.mShareNativeBtn.onclick = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Nexus P2P Chat',
            text: 'Conecta-te comigo no chat P2P direto:',
            url: shareUrl
          });
        } catch (err) {
          if (err.name !== 'AbortError') {
            copyToClipboard(shareUrl);
          }
        }
      } else {
        copyToClipboard(shareUrl);
      }
    };
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    showToast('Link copiado para a área de transferência!');
  }

  elements.mCopyMyIdBtn.addEventListener('click', () => {
    if (client.myPeerId) {
      navigator.clipboard.writeText(client.myPeerId);
      showToast('ID copiado!');
    }
  });

  // Eventos de Definições de Perfil (Mobile)
  if (elements.mSaveNickBtn) {
    elements.mSaveNickBtn.addEventListener('click', () => {
      const newNick = elements.mSettingsNickInput.value.trim();
      if (!newNick) return showToast('Insira um nome válido.');
      savedNick = newNick;
      localStorage.setItem('nexus_nickname', newNick);
      client.updateProfile(savedNick, savedAvatar);
      updateMobileProfileUI();
      showToast('Nome atualizado!');
    });
  }

  if (elements.mSaveCustomIdBtn) {
    elements.mSaveCustomIdBtn.addEventListener('click', () => {
      const newId = elements.mSettingsCustomIdInput.value.trim().toLowerCase();
      if (!/^[a-z0-9_-]{3,24}$/.test(newId)) {
        return showToast('O ID deve ter entre 3 e 24 caracteres (letras, números ou hífens).');
      }
      savedMobileId = newId;
      localStorage.setItem('nexus_peer_id', newId);
      showToast('A reiniciar ligação com o seu novo ID fixo...');
      client.init(savedMobileId, savedNick, savedAvatar);
      updateMobileProfileUI();
    });
  }

  if (elements.mRegenCustomIdBtn) {
    elements.mRegenCustomIdBtn.addEventListener('click', () => {
      const newId = 'nexus-' + Math.random().toString(36).substring(2, 8);
      elements.mSettingsCustomIdInput.value = newId;
      savedMobileId = newId;
      localStorage.setItem('nexus_peer_id', newId);
      showToast('Novo ID permanente gerado!');
      client.init(savedMobileId, savedNick, savedAvatar);
      updateMobileProfileUI();
    });
  }

  if (elements.mUploadPhotoBtn) {
    elements.mUploadPhotoBtn.addEventListener('click', () => elements.mSettingsPhotoInput.click());
  }

  if (elements.mSettingsPhotoInput) {
    elements.mSettingsPhotoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      processMobileAvatarFile(file, (dataUrl) => {
        savedAvatar = dataUrl;
        localStorage.setItem('nexus_avatar', dataUrl);
        client.updateProfile(savedNick, savedAvatar);
        updateMobileProfileUI();
        showToast('Foto de perfil atualizada!');
      });
    });
  }

  if (elements.mRemovePhotoBtn) {
    elements.mRemovePhotoBtn.addEventListener('click', () => {
      savedAvatar = null;
      localStorage.removeItem('nexus_avatar');
      client.updateProfile(savedNick, null);
      updateMobileProfileUI();
      showToast('Foto de perfil removida.');
    });
  }

  // =========================================================================
  // EVENTOS WEBRTC DO CLIENTE
  // =========================================================================
  client.onPeerReady = (id) => {
    savedMobileId = id;
    localStorage.setItem('nexus_peer_id', id);
    elements.mMyStatusBadge.textContent = 'Pronto para conectar';
    showToast('Nó móvel P2P ativo!');
    updateMobileProfileUI();
    updateMobileShare(id);
    checkUrlHashForConnection();
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
      if (existing && (!existing.name || existing.name === existing.id || existing.name === 'Amigo')) {
        saveStoredContact(peerId, meta.nickname || existing.name, meta.avatar || existing.avatar);
      }
    }
    renderMobileContacts();
  };

  client.onConnected = (remoteId) => {
    isConnected = true;
    onlineFriendsMap.set(remoteId, { online: true, lastSeen: Date.now() });
    showToast('Conectado em P2P!');

    const partnerName = client.remoteNickname || 'Amigo';
    saveStoredContact(remoteId, partnerName, client.remoteAvatar);
    renderMobileContacts();

    // Atualizar Barra Superior
    elements.mHeaderDot.className = 'm-status-dot dot-online';
    elements.mHeaderTitle.textContent = partnerName;
    if (elements.mHeaderSubtitle) elements.mHeaderSubtitle.textContent = '';
    renderMobileAvatar(elements.mHeaderAvatar, partnerName, client.remoteAvatar);
    elements.mLatencyTag.classList.remove('hidden');
    if (elements.mFloatLeaveBtn) elements.mFloatLeaveBtn.classList.remove('hidden');

    // Habilitar Inputs
    elements.mMessageInput.disabled = false;
    elements.mMessageInput.placeholder = 'Mensagem P2P...';
    elements.mSendBtn.disabled = false;
    elements.mRecordVoiceBtn.disabled = false;
    if (elements.mNudgeBtn) elements.mNudgeBtn.disabled = false;
    elements.mStartAudioCallBtn.disabled = false;
    elements.mStartVideoCallBtn.disabled = false;
    elements.mEmptyState.classList.add('hidden');

    // Aba Conectar Card Ativo
    elements.mActiveSessionCard.classList.remove('hidden');
    elements.mActivePartnerName.textContent = partnerName;
    elements.mActivePartnerId.textContent = 'ID: ' + remoteId;
    renderMobileAvatar(elements.mActivePartnerAvatar, partnerName, client.remoteAvatar);

    // Aba Chamada
    elements.mCallPartnerName.textContent = partnerName;

    switchTab('view-chat');
  };

  client.onPeerProfileUpdate = (newName, newAvatar) => {
    const partnerName = newName || client.remoteNickname || 'Amigo';
    if (client.remotePeerId) {
      saveStoredContact(client.remotePeerId, partnerName, newAvatar);
      renderMobileContacts();
    }
    elements.mHeaderTitle.textContent = partnerName;
    elements.mActivePartnerName.textContent = partnerName;
    elements.mCallPartnerName.textContent = partnerName;
    if (elements.mIncomingCaller) elements.mIncomingCaller.textContent = partnerName;
    if (elements.mAudioCallerName) elements.mAudioCallerName.textContent = partnerName;

    renderMobileAvatar(elements.mHeaderAvatar, partnerName, newAvatar);
    renderMobileAvatar(elements.mActivePartnerAvatar, partnerName, newAvatar);
    renderMobileAvatar(elements.mIncomingAvatar, partnerName, newAvatar);
    renderMobileAvatar(elements.mAudioAvatar, partnerName, newAvatar);
    renderMobileAvatar(elements.mCallFallbackAvatar, partnerName, newAvatar);
  };

  client.onDisconnected = () => {
    isConnected = false;
    showToast('Par desconectado.');

    renderMobileContacts();
    syncFriendsPresence();

    elements.mHeaderDot.className = 'm-status-dot dot-offline';
    elements.mHeaderTitle.textContent = 'Nexus P2P';
    if (elements.mHeaderSubtitle) elements.mHeaderSubtitle.textContent = '';
    elements.mHeaderAvatar.textContent = '?';
    elements.mLatencyTag.classList.add('hidden');
    if (elements.mFloatLeaveBtn) elements.mFloatLeaveBtn.classList.add('hidden');

    elements.mMessageInput.disabled = true;
    elements.mMessageInput.placeholder = 'Conecte-se para conversar...';
    elements.mSendBtn.disabled = true;
    elements.mRecordVoiceBtn.disabled = true;
    if (elements.mNudgeBtn) elements.mNudgeBtn.disabled = true;
    elements.mStartAudioCallBtn.disabled = true;
    elements.mStartVideoCallBtn.disabled = true;

    elements.mActiveSessionCard.classList.add('hidden');
    elements.mCallPartnerName.textContent = 'Nenhum Par Conectado';
  };

  client.onLatencyUpdate = (latMs) => {
    elements.mLatencyVal.textContent = `${latMs}ms`;
  };

  client.onTyping = (isTyping, senderName) => {
    if (isTyping) {
      elements.mTypingText.textContent = `${senderName} está a escrever`;
      elements.mTypingBar.classList.remove('hidden');
    } else {
      elements.mTypingBar.classList.add('hidden');
    }
  };

  client.onMessageReceived = (msg) => {
    Sound.receive();
    appendMobileMessage({
      sender: 'peer',
      senderName: msg.senderName,
      text: msg.text,
      time: msg.time,
      id: msg.id
    });
    // Se não estiver na aba de chat, mostrar pontinho de não lido
    if (!elements.viewChat.classList.contains('active')) {
      elements.mUnreadDot.classList.remove('hidden');
    }
  };

  client.onMessageAck = (messageId) => {
    const el = document.getElementById(`m-status-${messageId}`);
    if (el) el.textContent = '✓✓';
  };

  client.onFileReceived = (fileData) => {
    Sound.receive();
    const isImage = fileData.mimeType && fileData.mimeType.startsWith('image/');
    appendMobileFile({
      sender: 'peer',
      senderName: fileData.senderName,
      name: fileData.name,
      size: fileData.size,
      url: fileData.url,
      isImage: isImage,
      time: fileData.time
    });
  };

  client.onVoiceNoteReceived = (voiceData) => {
    Sound.receive();
    appendMobileVoice({
      sender: 'peer',
      senderName: voiceData.senderName,
      audioData: voiceData.audioData,
      duration: voiceData.duration,
      time: voiceData.time
    });
  };

  client.onNudgeReceived = (senderName) => {
    triggerMobileNudge(false, senderName || client.remoteNickname || 'Amigo');
  };

  client.onError = (err) => {
    showToast(err.message || 'Erro na ligação P2P');
  };

  // Inicializar nó P2P com ID fixo e foto
  client.init(savedMobileId, savedNick, savedAvatar);
  updateMobileProfileUI();
  renderMobileContacts();

  // Monitorização periódica de presença para amigos (a cada 12 segundos)
  setInterval(syncFriendsPresence, 12000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      if (client) client.ensurePeerConnected().then(() => syncFriendsPresence());
      else syncFriendsPresence();
    }
  });
  window.addEventListener('pageshow', () => {
    if (client) client.ensurePeerConnected().then(() => syncFriendsPresence());
  });
  window.addEventListener('online', () => {
    if (client) client.ensurePeerConnected().then(() => syncFriendsPresence());
  });
  setTimeout(syncFriendsPresence, 1500);

  // =========================================================================
  // CONEXÃO POR ID E DESCONEXÃO
  // =========================================================================
  elements.mConnectRemoteBtn.addEventListener('click', connectRemote);
  elements.mRemotePeerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') connectRemote();
  });

  // =========================================================================
  // MODAL DE ADICIONAR NOVO AMIGO (MOBILE)
  // =========================================================================
  function openAddFriendModal(prefillId = '') {
    if (elements.mModalFriendIdInput) {
      elements.mModalFriendIdInput.value = prefillId || '';
    }
    if (elements.mModalFriendNameInput) {
      elements.mModalFriendNameInput.value = '';
    }
    elements.mAddFriendModal?.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
    setTimeout(() => {
      if (elements.mModalFriendIdInput && !prefillId) {
        elements.mModalFriendIdInput.focus();
      }
    }, 200);
  }

  function closeAddFriendModal() {
    elements.mAddFriendModal?.classList.add('hidden');
  }

  if (elements.mHeaderAddFriendBtn) {
    elements.mHeaderAddFriendBtn.addEventListener('click', () => openAddFriendModal());
  }

  if (elements.mOptAddFriend) {
    elements.mOptAddFriend.addEventListener('click', () => {
      elements.mMoreDropdown?.classList.add('hidden');
      openAddFriendModal();
    });
  }

  if (elements.mOptMyFriends) {
    elements.mOptMyFriends.addEventListener('click', () => {
      elements.mMoreDropdown?.classList.add('hidden');
      switchTab('view-connect');
    });
  }

  if (elements.mOpenAddFriendModalBtn) {
    elements.mOpenAddFriendModalBtn.addEventListener('click', () => openAddFriendModal());
  }

  if (elements.mCloseAddFriendModalBtn) {
    elements.mCloseAddFriendModalBtn.addEventListener('click', closeAddFriendModal);
  }

  if (elements.mAddFriendModal) {
    elements.mAddFriendModal.addEventListener('click', (e) => {
      if (e.target === elements.mAddFriendModal) {
        closeAddFriendModal();
      }
    });
  }

  // Fechar com tecla Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.mAddFriendModal && !elements.mAddFriendModal.classList.contains('hidden')) {
      closeAddFriendModal();
    }
  });

  // Colar da Área de Transferência
  if (elements.mBtnPasteFriendId) {
    elements.mBtnPasteFriendId.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.readText) {
          const text = await navigator.clipboard.readText();
          if (text && text.trim()) {
            elements.mModalFriendIdInput.value = text.trim();
            showToast('ID colado com sucesso!');
            return;
          }
        }
        showToast('Cole o ID manualmente no campo.');
      } catch (e) {
        const manual = prompt('Cole aqui o ID ou link do seu amigo:');
        if (manual && manual.trim()) {
          elements.mModalFriendIdInput.value = manual.trim();
        }
      }
    });
  }

  // Apenas guardar nos amigos
  if (elements.mBtnSaveFriendOnly) {
    elements.mBtnSaveFriendOnly.addEventListener('click', () => {
      const rawId = elements.mModalFriendIdInput?.value.trim();
      const cleanId = cleanPeerId(rawId);
      if (!cleanId) {
        return showToast('Insira um ID ou link válido.');
      }
      if (cleanId === savedMobileId) {
        return showToast('Não pode adicionar o seu próprio ID.');
      }

      const rawName = elements.mModalFriendNameInput?.value.trim();
      const friendName = rawName || cleanId;

      saveStoredContact(cleanId, friendName, null);
      renderMobileContacts();
      syncFriendsPresence();
      closeAddFriendModal();
      showToast(`Amigo "${friendName}" guardado na lista!`);
    });
  }

  // Guardar e conectar imediatamente
  if (elements.mBtnSaveAndConnectFriend) {
    elements.mBtnSaveAndConnectFriend.addEventListener('click', async () => {
      const rawId = elements.mModalFriendIdInput?.value.trim();
      const cleanId = cleanPeerId(rawId);
      if (!cleanId) {
        return showToast('Insira um ID ou link válido.');
      }
      if (cleanId === savedMobileId) {
        return showToast('Não pode conectar ao seu próprio ID.');
      }

      const rawName = elements.mModalFriendNameInput?.value.trim();
      const friendName = rawName || cleanId;

      saveStoredContact(cleanId, friendName, null);
      renderMobileContacts();
      syncFriendsPresence();
      closeAddFriendModal();

      elements.mRemotePeerInput.value = cleanId;
      showToast(`A conectar a "${friendName}"...`);
      try {
        await client.connect(cleanId);
      } catch (err) {
        console.warn('Erro ao conectar amigo adicionado:', err);
      }
    });
  }

  if (elements.mAddFriendBtn) {
    elements.mAddFriendBtn.addEventListener('click', () => {
      let target = cleanPeerId(elements.mRemotePeerInput.value);
      openAddFriendModal(target || '');
    });
  }

  async function connectRemote() {
    let target = cleanPeerId(elements.mRemotePeerInput.value);
    if (!target) return showToast('Insira o ID do seu amigo.');
    if (target === savedMobileId) return showToast('Não pode conectar ao seu próprio ID.');

    // Guarda logo o contacto na lista com bolinha vermelha até conectar!
    saveStoredContact(target, null, null);
    renderMobileContacts();

    showToast('Contacto guardado! A conectar...');
    try {
      await client.connect(target);
    } catch (err) {
      console.warn('Erro ao conectar remotamente:', err);
    }
  }

  elements.mDisconnectBtn.addEventListener('click', () => {
    client.disconnect();
    showToast('Desconectado.');
  });

    if (elements.mFloatLeaveBtn) {
    elements.mFloatLeaveBtn.addEventListener('click', () => {
      client.disconnect();
      showToast('Saiu da conversa.');
    });
  }

  // =========================================================================
  // SISTEMA DE PESQUISA MOBILE (LUPA)
  // =========================================================================
  let mSearchMatches = [];
  let mCurrentSearchIdx = -1;

  function clearMobileSearch() {
    if (!elements.mMessagesContainer) return;
    const marks = elements.mMessagesContainer.querySelectorAll('mark.chat-search-match');
    marks.forEach(mark => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      }
    });
    mSearchMatches = [];
    mCurrentSearchIdx = -1;
    if (elements.mSearchCount) elements.mSearchCount.textContent = '0/0';
  }

  function performMobileSearch(query) {
    clearMobileSearch();
    const q = (query || '').trim().toLowerCase();
    if (!q || !elements.mMessagesContainer) return;

    const bubbles = elements.mMessagesContainer.querySelectorAll('.m-msg-bubble');
    bubbles.forEach(bubble => {
      const textNodes = [];
      const walker = document.createTreeWalker(bubble, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (node.parentNode && (node.parentNode.closest('.m-msg-time') || node.parentNode.closest('.m-file-card'))) {
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
          mSearchMatches.push(mark);
          pos = idx + q.length;
        }
        if (node.parentNode) {
          node.parentNode.replaceChild(fragment, node);
        }
      });
    });

    if (mSearchMatches.length > 0) {
      mCurrentSearchIdx = 0;
      updateMobileActiveSearch();
    }
  }

  function updateMobileActiveSearch() {
    mSearchMatches.forEach((m, idx) => {
      if (idx === mCurrentSearchIdx) {
        m.classList.add('chat-search-active');
        m.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        m.classList.remove('chat-search-active');
      }
    });
    if (elements.mSearchCount) {
      elements.mSearchCount.textContent = `${mCurrentSearchIdx + 1}/${mSearchMatches.length}`;
    }
  }

  function nextMobileSearch() {
    if (mSearchMatches.length === 0) return;
    mCurrentSearchIdx = (mCurrentSearchIdx + 1) % mSearchMatches.length;
    updateMobileActiveSearch();
  }

  function prevMobileSearch() {
    if (mSearchMatches.length === 0) return;
    mCurrentSearchIdx = (mCurrentSearchIdx - 1 + mSearchMatches.length) % mSearchMatches.length;
    updateMobileActiveSearch();
  }

  if (elements.mSearchBtn) {
    elements.mSearchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      elements.mMoreDropdown?.classList.add('hidden');
      const isHidden = elements.mSearchBar.classList.toggle('hidden');
      if (!isHidden) {
        elements.mSearchInput.focus();
        if (elements.mSearchInput.value) performMobileSearch(elements.mSearchInput.value);
      } else {
        clearMobileSearch();
      }
    });
  }

  if (elements.mSearchCloseBtn) {
    elements.mSearchCloseBtn.addEventListener('click', () => {
      elements.mSearchBar?.classList.add('hidden');
      clearMobileSearch();
    });
  }

  if (elements.mSearchInput) {
    elements.mSearchInput.addEventListener('input', (e) => {
      performMobileSearch(e.target.value);
    });
    elements.mSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (e.shiftKey) prevMobileSearch();
        else nextMobileSearch();
      }
    });
  }

  if (elements.mSearchNextBtn) elements.mSearchNextBtn.addEventListener('click', nextMobileSearch);
  if (elements.mSearchPrevBtn) elements.mSearchPrevBtn.addEventListener('click', prevMobileSearch);

  // =========================================================================
  // SISTEMA DE MAIS OPÇÕES MOBILE (3 PONTINHOS)
  // =========================================================================
  if (elements.mMoreBtn && elements.mMoreDropdown) {
    elements.mMoreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      elements.mSearchBar?.classList.add('hidden');
      elements.mMoreDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (elements.mMoreDropdown && !elements.mMoreDropdown.contains(e.target) && e.target !== elements.mMoreBtn) {
        elements.mMoreDropdown.classList.add('hidden');
      }
    });
  }

  if (elements.mOptExportChat) {
    elements.mOptExportChat.addEventListener('click', () => {
      elements.mMoreDropdown?.classList.add('hidden');
      const rows = elements.mMessagesContainer.querySelectorAll('.m-msg-row');
      if (rows.length === 0) return showToast('Sem mensagens para exportar.');

      const partnerName = client.remoteNickname || 'Amigo';
      const partnerId = client.remotePeerId || '--';
      let exportContent = `=== NEXUS P2P MOBILE - HISTÓRICO DE CONVERSA ===\n`;
      exportContent += `Data: ${new Date().toLocaleString()}\n`;
      exportContent += `Amigo: ${partnerName} (${partnerId})\n\n`;

      rows.forEach(r => {
        const isMe = r.classList.contains('me');
        const sender = isMe ? (savedMobileNick || 'Eu') : partnerName;
        const time = r.querySelector('.m-msg-time')?.textContent || '';
        const text = r.querySelector('.m-msg-bubble')?.innerText || '';
        exportContent += `[${time}] ${sender}: ${text}\n`;
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
      showToast('Conversa exportada!');
    });
  }

  if (elements.mOptToggleSound) {
    elements.mOptToggleSound.addEventListener('click', () => {
      soundMobileEnabled = !soundMobileEnabled;
      if (elements.mOptSoundIcon) {
        elements.mOptSoundIcon.setAttribute('data-lucide', soundMobileEnabled ? 'volume-2' : 'volume-x');
      }
      if (elements.mOptSoundText) {
        elements.mOptSoundText.textContent = soundMobileEnabled ? 'Sons: Ligados' : 'Sons: Silenciados';
      }
      if (window.lucide) window.lucide.createIcons();
      showToast(soundMobileEnabled ? 'Sons ligados' : 'Sons silenciados');
      elements.mMoreDropdown?.classList.add('hidden');
    });
  }

  if (elements.mOptClearChat) {
    elements.mOptClearChat.addEventListener('click', () => {
      elements.mMoreDropdown?.classList.add('hidden');
      if (confirm('Deseja limpar as mensagens do ecrã?')) {
        elements.mMessagesContainer.innerHTML = '';
        elements.mEmptyState?.classList.remove('hidden');
        clearMobileSearch();
        showToast('Conversa limpa.');
      }
    });
  }

  if (elements.mOptDisconnect) {
    elements.mMoreDropdown?.classList.add('hidden');
    if (confirm('Deseja desconectar deste amigo?')) {
      client.disconnect();
      showToast('Desconectado.');
    }
  }

  // =========================================================================
  // CONTROLADOR DA MODAL ARRASTÁVEL DE HISTÓRICO DE MENSAGENS (MOBILE)
  // =========================================================================
  function makeMobileElementDraggable(box, handle) {
    if (!box || !handle) return;
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

    const onPointerDown = (e) => {
      if (e.target.closest('button') || e.target.closest('a') || e.target.closest('select') || e.target.closest('input')) {
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
      box.style.position = 'fixed';
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
      const maxLeft = window.innerWidth - rect.width - 5;
      const maxTop = window.innerHeight - rect.height - 5;

      newLeft = Math.max(5, Math.min(maxLeft, newLeft));
      newTop = Math.max(5, Math.min(maxTop, newTop));

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

  makeMobileElementDraggable(elements.mHistoryBox, elements.mHistoryHeader);

  function resetMobileHistoryModalPosition() {
    if (elements.mHistoryBox) {
      elements.mHistoryBox.style.transform = 'none';
      elements.mHistoryBox.style.left = '';
      elements.mHistoryBox.style.top = '';
      elements.mHistoryBox.style.position = 'relative';
    }
  }

  function openMobileHistoryModal(targetPeerId) {
    elements.mMoreDropdown?.classList.add('hidden');
    elements.mSearchBar?.classList.add('hidden');
    clearMobileSearch();

    populateMobileHistoryContactSelect(targetPeerId);
    resetMobileHistoryModalPosition();
    elements.mHistoryOverlay?.classList.remove('hidden');
    renderMobileHistoryList(elements.mHistoryPartnerSelect?.value, elements.mHistorySearchInput?.value || '');
    if (window.lucide) window.lucide.createIcons();
  }

  function closeMobileHistoryModal() {
    elements.mHistoryOverlay?.classList.add('hidden');
  }

  if (elements.mHistoryBtn) {
    elements.mHistoryBtn.addEventListener('click', () => openMobileHistoryModal(client.remotePeerId));
  }

  if (elements.mOptHistory) {
    elements.mOptHistory.addEventListener('click', () => openMobileHistoryModal(client.remotePeerId));
  }

  if (elements.mCloseHistoryBtn) {
    elements.mCloseHistoryBtn.addEventListener('click', closeMobileHistoryModal);
  }

  // Fechar ao clicar fora (no overlay escuro)
  if (elements.mHistoryOverlay) {
    elements.mHistoryOverlay.addEventListener('click', (e) => {
      if (e.target === elements.mHistoryOverlay) {
        closeMobileHistoryModal();
      }
    });
  }

  // Fechar com a tecla Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.mHistoryOverlay && !elements.mHistoryOverlay.classList.contains('hidden')) {
      closeMobileHistoryModal();
    }
  });

  function populateMobileHistoryContactSelect(selectedId) {
    if (!elements.mHistoryPartnerSelect) return;
    elements.mHistoryPartnerSelect.innerHTML = '';

    const peersWithHistory = ChatHistory.getAllPeers();
    const storedContacts = getStoredContacts();

    if (client.remotePeerId && !peersWithHistory.includes(client.remotePeerId)) {
      peersWithHistory.unshift(client.remotePeerId);
    }

    if (peersWithHistory.length === 0) {
      const opt = document.createElement('option');
      opt.value = 'geral';
      opt.textContent = 'Sem conversas guardadas ainda';
      elements.mHistoryPartnerSelect.appendChild(opt);
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
      elements.mHistoryPartnerSelect.appendChild(opt);
    });

    if (!elements.mHistoryPartnerSelect.value && elements.mHistoryPartnerSelect.options.length > 0) {
      elements.mHistoryPartnerSelect.selectedIndex = 0;
    }
  }

  function renderMobileHistoryList(peerId, filterQuery = '') {
    if (!elements.mHistoryList) return;
    elements.mHistoryList.innerHTML = '';

    if (!peerId) {
      peerId = elements.mHistoryPartnerSelect?.value || client.remotePeerId || 'geral';
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

    if (filtered.length === 0) {
      elements.mHistoryList.innerHTML = `
        <div style="text-align:center; padding:30px 10px; color:var(--text-muted); font-size:0.8rem;">
          <i data-lucide="inbox" style="width:32px; height:32px; opacity:0.4; margin-bottom:6px;"></i>
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
        div.innerHTML = `<span class="chat-date-badge"><i data-lucide="calendar" style="width:11px; height:11px;"></i> ${escapeHtml(msg.dateFormatted)}</span>`;
        elements.mHistoryList.appendChild(div);
      }

      const item = document.createElement('div');
      item.className = `m-history-item ${msg.sender === 'me' ? 'me' : 'peer'}`;

      let contentHtml = escapeHtml(msg.text);
      if (msg.isFile) {
        contentHtml = `📎 <strong>${escapeHtml(msg.fileName || 'Ficheiro')}</strong> ${msg.fileSize ? `(${formatBytes(msg.fileSize)})` : ''}`;
      } else if (msg.isVoice) {
        contentHtml = `🎙️ <em>Nota de voz</em> ${msg.duration ? `(${msg.duration}s)` : ''}`;
      }

      item.innerHTML = `
        <div class="m-history-item-top">
          <span class="m-history-item-sender">${escapeHtml(msg.senderName || (msg.sender === 'me' ? (savedNick || 'Eu') : 'Amigo'))}</span>
          <span class="m-history-item-datetime">${escapeHtml(msg.fullDateTime || msg.timeFormatted || '')}</span>
        </div>
        <div class="m-history-item-text">${contentHtml}</div>
      `;

      elements.mHistoryList.appendChild(item);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  if (elements.mHistoryPartnerSelect) {
    elements.mHistoryPartnerSelect.addEventListener('change', (e) => {
      renderMobileHistoryList(e.target.value, elements.mHistorySearchInput?.value || '');
    });
  }

  if (elements.mHistorySearchInput) {
    elements.mHistorySearchInput.addEventListener('input', (e) => {
      renderMobileHistoryList(elements.mHistoryPartnerSelect?.value, e.target.value);
    });
  }

  // Carregar histórico no ecrã principal do chat
  if (elements.mBtnLoadHistory) {
    elements.mBtnLoadHistory.addEventListener('click', () => {
      const peerId = elements.mHistoryPartnerSelect?.value;
      const messages = ChatHistory.getMessages(peerId);
      if (messages.length === 0) {
        return showToast('Não há mensagens para carregar no ecrã.');
      }

      elements.mMessagesContainer.innerHTML = '';
      lastRenderedMobileDate = null;

      messages.forEach(m => {
        if (m.isFile) {
          appendMobileFile({
            sender: m.sender,
            senderName: m.senderName,
            name: m.fileName,
            size: m.fileSize,
            url: '#',
            isImage: m.isImage,
            time: m.timestamp
          }, true);
        } else if (m.isVoice) {
          appendMobileVoice({
            sender: m.sender,
            senderName: m.senderName,
            audioData: '',
            duration: m.duration,
            time: m.timestamp
          }, true);
        } else {
          appendMobileMessage({
            sender: m.sender,
            senderName: m.senderName,
            text: m.text,
            time: m.timestamp,
            id: m.id
          }, true);
        }
      });

      closeMobileHistoryModal();
      showToast(`${messages.length} mensagens carregadas para o ecrã.`);
    });
  }

  // Exportar histórico para ficheiro TXT
  if (elements.mBtnExportHistory) {
    elements.mBtnExportHistory.addEventListener('click', () => {
      const peerId = elements.mHistoryPartnerSelect?.value || client.remotePeerId || 'geral';
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
        const sender = m.senderName || (m.sender === 'me' ? (savedNick || 'Eu') : 'Amigo');
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
  if (elements.mBtnClearHistory) {
    elements.mBtnClearHistory.addEventListener('click', () => {
      const peerId = elements.mHistoryPartnerSelect?.value;
      if (!peerId) return;
      if (confirm(`Deseja apagar permanentemente o histórico guardado deste contacto (${peerId})?`)) {
        ChatHistory.clear(peerId);
        populateMobileHistoryContactSelect();
        renderMobileHistoryList(elements.mHistoryPartnerSelect?.value);
        showToast('Histórico apagado.');
      }
    });
  }

  // Notificar o amigo IMEDIATAMENTE ao fechar a aba ou sair do navegador no telemóvel
  const handleMobileAppExit = (e) => {
    if (e && e.persisted) return; // Não desconectar se o telemóvel apenas suspendeu o app em memória (bfcache)
    const myId = savedMobileId || (client && client.myPeerId);
    if (myId) {
      try {
        navigator.sendBeacon(`/api/presence?id=${encodeURIComponent(myId)}&status=offline`);
      } catch (e) {}
    }
    if (client && isConnected) {
      client.disconnect(true);
    }
  };
  window.addEventListener('pagehide', handleMobileAppExit);
  window.addEventListener('beforeunload', handleMobileAppExit);

  function checkUrlHashForConnection() {
    const hash = window.location.hash;
    const match = hash.match(/[#&]connect=([a-zA-Z0-9_-]+)/);
    if (match && match[1] && match[1] !== client.myPeerId) {
      elements.mRemotePeerInput.value = match[1];
      setTimeout(() => connectRemote(), 600);
    }
  }

  // =========================================================================
  // CHAT: ENVIO DE TEXTO
  // =========================================================================
  const appContainer = document.querySelector('.mobile-app');

  elements.mChatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMobileMessage();
  });

  // Foco no campo de texto esconde a barra inferior para dar espaço ao teclado
  elements.mMessageInput.addEventListener('focus', () => {
    if (appContainer) appContainer.classList.add('keyboard-open');
    setTimeout(scrollToBottom, 200);
  });

  elements.mMessageInput.addEventListener('blur', () => {
    if (appContainer) appContainer.classList.remove('keyboard-open');
  });

  // Tecla Enter no teclado envia a mensagem imediatamente
  elements.mMessageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMobileMessage();
    }
  });

  elements.mMessageInput.addEventListener('input', () => {
    elements.mMessageInput.style.height = 'auto';
    elements.mMessageInput.style.height = Math.min(85, elements.mMessageInput.scrollHeight) + 'px';

    const hasText = elements.mMessageInput.value.trim().length > 0;
    if (hasText) {
      elements.mSendBtn.classList.add('has-text');
    } else {
      elements.mSendBtn.classList.remove('has-text');
    }

    if (isConnected) {
      client.sendTypingStatus(true);
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => client.sendTypingStatus(false), 1500);
    }
  });

  function sendMobileMessage() {
    const text = elements.mMessageInput.value.trim();
    if (!text || !isConnected) return;

    const id = client.sendTextMessage(text);
    if (id) {
      Sound.send();
      appendMobileMessage({
        sender: 'me',
        senderName: elements.mSettingsNickInput.value,
        text: text,
        time: Date.now(),
        id: id
      });
      elements.mMessageInput.value = '';
      elements.mMessageInput.style.height = 'auto';
      elements.mSendBtn.classList.remove('has-text');
      client.sendTypingStatus(false);
      setTimeout(scrollToBottom, 50);
    }
  }

  // Emojis Rápidos
  elements.mEmojiBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    elements.mQuickEmojis.classList.toggle('hidden');
  });

  document.querySelectorAll('.m-emoji-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      elements.mMessageInput.value += opt.textContent;
      elements.mQuickEmojis.classList.add('hidden');
      elements.mMessageInput.focus();
    });
  });

  document.addEventListener('click', (e) => {
    if (!elements.mQuickEmojis.contains(e.target) && e.target !== elements.mEmojiBtn) {
      elements.mQuickEmojis.classList.add('hidden');
    }
  });

  // =========================================================================
  // CHAMAR A ATENÇÃO (NUDGE / ZUMBIDO / TREMER ECRÃ - MOBILE)
  // =========================================================================
  let isMobileNudgeCooldown = false;

  function triggerMobileNudge(isMe, senderName) {
    // 1. Som de zumbido
    Sound.nudge();

    // 2. Tremer o ecrã do telemóvel
    const appEl = document.querySelector('.mobile-app') || document.body;
    appEl.classList.remove('shake-nudge');
    void appEl.offsetWidth; // Força reflow para reiniciar animação
    appEl.classList.add('shake-nudge');
    setTimeout(() => {
      appEl.classList.remove('shake-nudge');
    }, 600);

    // 3. Vibração háptica física no telemóvel
    if (navigator.vibrate) {
      try {
        navigator.vibrate([120, 70, 140, 70, 250]);
      } catch (e) {}
    }

    // 4. Inserir aviso visual no chat
    appendMobileNudgeNotice(isMe, senderName);
  }

  function appendMobileNudgeNotice(isMe, senderName) {
    elements.mEmptyState.classList.add('hidden');
    const row = document.createElement('div');
    row.className = 'm-msg-nudge-row';
    const text = isMe ? 'Chamou a atenção do seu par!' : `${escapeHtml(senderName)} chamou a tua atenção!`;
    row.innerHTML = `
      <span class="m-nudge-pill">
        <i data-lucide="zap"></i>
        <span>${text}</span>
      </span>
    `;
    elements.mMessagesContainer.appendChild(row);
    if (window.lucide) window.lucide.createIcons();
    scrollToBottom();

    if (!elements.viewChat.classList.contains('active')) {
      elements.mUnreadDot.classList.remove('hidden');
    }
  }

  function handleMobileSendNudge() {
    if (!isConnected) {
      showToast('Conecte-se antes de chamar a atenção.');
      return;
    }
    if (isMobileNudgeCooldown) {
      showToast('Aguarde 5 segundos entre chamadas de atenção.');
      return;
    }

    const sent = client.sendNudge();
    if (sent) {
      const myNick = (elements.mSettingsNickInput && elements.mSettingsNickInput.value) || savedNick || 'Eu';
      triggerMobileNudge(true, myNick);

      isMobileNudgeCooldown = true;
      if (elements.mNudgeBtn) {
        elements.mNudgeBtn.classList.add('cooldown');
        elements.mNudgeBtn.disabled = true;
      }

      setTimeout(() => {
        isMobileNudgeCooldown = false;
        if (elements.mNudgeBtn && isConnected) {
          elements.mNudgeBtn.classList.remove('cooldown');
          elements.mNudgeBtn.disabled = false;
        }
      }, 5000);
    }
  }

  if (elements.mNudgeBtn) {
    elements.mNudgeBtn.addEventListener('click', handleMobileSendNudge);
  }

  // =========================================================================
  // AJUDA DE PERMISSÃO / CONTEXTO SEGURO
  // =========================================================================
  const permModal = document.getElementById('mPermissionHelpModal');
  const closePermBtn = document.getElementById('mClosePermHelpBtn');
  const understoodPermBtn = document.getElementById('mUnderstoodPermBtn');
  const helpOriginUrl = document.getElementById('mHelpOriginUrl');

  if (helpOriginUrl) {
    helpOriginUrl.textContent = window.location.origin;
  }

  function showSecureContextNotice() {
    if (permModal) permModal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  if (closePermBtn) closePermBtn.addEventListener('click', () => permModal.classList.add('hidden'));
  if (understoodPermBtn) understoodPermBtn.addEventListener('click', () => permModal.classList.add('hidden'));

  // =========================================================================
  // GRAVAÇÃO DE VOZ MOBILE
  // =========================================================================
  elements.mRecordVoiceBtn.addEventListener('click', async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showSecureContextNotice();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunks = [];
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.push(e.data);
      };

      mediaRecorder.start();
      recordingStartTime = Date.now();
      elements.mVoiceBar.classList.remove('hidden');
      elements.mChatForm.classList.add('hidden');

      recordingTimerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
        const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const s = String(elapsed % 60).padStart(2, '0');
        elements.mRecTimer.textContent = `${m}:${s}`;
      }, 500);
    } catch (err) {
      console.warn('Erro ao aceder ao microfone:', err);
      showSecureContextNotice();
    }
  });

  elements.mCancelVoiceBtn.addEventListener('click', () => {
    stopRecordingVoice();
    showToast('Gravação cancelada.');
  });

  elements.mSendVoiceBtn.addEventListener('click', () => {
    if (!mediaRecorder || mediaRecorder.state === 'inactive') return;
    const duration = Math.floor((Date.now() - recordingStartTime) / 1000);

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      stopRecordingVoice();

      if (blob.size > 0 && isConnected) {
        client.sendVoiceNote(blob, duration);
        Sound.send();
        appendMobileVoice({
          sender: 'me',
          senderName: elements.mSettingsNickInput.value,
          audioData: URL.createObjectURL(blob),
          duration: duration,
          time: Date.now()
        });
      }
    };

    mediaRecorder.stop();
  });

  function stopRecordingVoice() {
    if (mediaRecorder && mediaRecorder.stream) {
      mediaRecorder.stream.getTracks().forEach(t => t.stop());
    }
    if (recordingTimerInterval) {
      clearInterval(recordingTimerInterval);
      recordingTimerInterval = null;
    }
    elements.mVoiceBar.classList.add('hidden');
    elements.mChatForm.classList.remove('hidden');
    elements.mRecTimer.textContent = '00:00';
  }

  // =========================================================================
  // ENVIO DE FICHEIROS / FOTOS
  // =========================================================================
  elements.mAttachBtn.addEventListener('click', () => elements.mFileInput.click());

  elements.mFileInput.addEventListener('change', (e) => {
    Array.from(e.target.files).forEach(file => {
      if (!isConnected) return showToast('Conecte-se antes de enviar fotos.');
      const isImg = file.type.startsWith('image/');
      const url = URL.createObjectURL(file);

      appendMobileFile({
        sender: 'me',
        senderName: elements.mSettingsNickInput.value,
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
    elements.mFileInput.value = '';
  });

  // =========================================================================
  // CHAMADAS P2P MOBILE
  // =========================================================================
  elements.mStartAudioCallBtn.addEventListener('click', () => startMobileCall(false));
  elements.mStartVideoCallBtn.addEventListener('click', () => startMobileCall(true));

  async function startMobileCall(isVideo) {
    if (!isConnected) return;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showSecureContextNotice();
      return;
    }
    try {
      switchTab('view-call');
      showToast(isVideo ? 'A ligar com vídeo...' : 'A ligar chamada de voz...');
      elements.mPreCallActions.classList.add('hidden');
      elements.mActiveCallActions.classList.remove('hidden');
      setupCallScreenLayout(isVideo);

      const call = await client.callPeer(isVideo);
      if (isVideo && client.localStream) {
        attachVideoStream(elements.mLocalVideo, client.localStream, true);
      }
    } catch (e) {
      showSecureContextNotice();
      elements.mPreCallActions.classList.remove('hidden');
      elements.mActiveCallActions.classList.add('hidden');
    }
  }

  function setupCallScreenLayout(isVideo) {
    const partnerName = client.remoteNickname || 'Amigo';
    const partnerInitials = partnerName.substring(0, 2).toUpperCase();

    if (isVideo) {
      elements.mVideoContainer?.classList.remove('hidden');
      elements.mAudioStage?.classList.add('hidden');
      elements.mVideoFallback?.classList.add('hidden');
      elements.mToggleCamBtn?.classList.remove('hidden');
      elements.mFlipCamBtn?.classList.remove('hidden');
    } else {
      elements.mVideoContainer?.classList.add('hidden');
      elements.mAudioStage?.classList.remove('hidden');
      elements.mToggleCamBtn?.classList.add('hidden');
      elements.mFlipCamBtn?.classList.add('hidden');

      if (elements.mAudioCallerName) elements.mAudioCallerName.textContent = partnerName;
      if (elements.mAudioAvatar) elements.mAudioAvatar.textContent = partnerInitials;
    }
    if (window.lucide) window.lucide.createIcons();
  }

  client.onIncomingCall = (call) => {
    pendingIncomingCall = call;
    startRinging();
    const caller = call.metadata?.callerName || client.remoteNickname || 'Amigo';
    const isVideo = call.metadata?.withVideo !== false;
    elements.mIncomingCaller.textContent = caller;
    elements.mIncomingAvatar.textContent = caller.substring(0, 2).toUpperCase();
    elements.mIncomingType.textContent = isVideo ? 'Chamada de Vídeo a entrar...' : 'Chamada de Voz a entrar...';
    elements.mIncomingCallModal.classList.remove('hidden');
  };

  elements.mAcceptCallBtn.addEventListener('click', async () => {
    stopRinging();
    elements.mIncomingCallModal.classList.add('hidden');
    if (pendingIncomingCall) {
      const isVideo = pendingIncomingCall.metadata?.withVideo !== false;
      switchTab('view-call');
      elements.mPreCallActions.classList.add('hidden');
      elements.mActiveCallActions.classList.remove('hidden');
      setupCallScreenLayout(isVideo);

      await client.answerCall(pendingIncomingCall, isVideo);
      if (isVideo && client.localStream) {
        attachVideoStream(elements.mLocalVideo, client.localStream, true);
      }
    }
  });

  elements.mRejectCallBtn.addEventListener('click', () => {
    stopRinging();
    elements.mIncomingCallModal.classList.add('hidden');
    if (pendingIncomingCall) {
      pendingIncomingCall.close();
      pendingIncomingCall = null;
    }
  });

  client.onCallAccepted = (localStream, remoteStream, isVideo = true) => {
    isMobileVideoSwapped = false;
    const tag = elements.mLocalPip?.querySelector('span');
    if (tag) tag.textContent = 'Você';

    switchTab('view-call');
    elements.mPreCallActions.classList.add('hidden');
    elements.mActiveCallActions.classList.remove('hidden');
    setupCallScreenLayout(isVideo);

    if (isVideo) {
      attachVideoStream(elements.mRemoteVideo, remoteStream, false);
      attachVideoStream(elements.mLocalVideo, localStream, true);
    } else {
      if (elements.mRemoteAudio) {
        elements.mRemoteAudio.srcObject = remoteStream;
        elements.mRemoteAudio.play().catch(() => {});
      }
    }
    startCallDuration();
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
      videoEl.play().catch(err => console.warn('Mobile play video:', err));
    };
    videoEl.play().catch(() => {});
  }

  // Alternar telas ao tocar na miniatura (Click to Swap no Telemóvel)
  let isMobileVideoSwapped = false;
  elements.mLocalPip.addEventListener('click', () => {
    const remoteStream = client.remoteStream;
    const localStream = client.localStream;
    if (!remoteStream || !localStream) return;

    isMobileVideoSwapped = !isMobileVideoSwapped;
    if (isMobileVideoSwapped) {
      attachVideoStream(elements.mRemoteVideo, localStream, true);
      attachVideoStream(elements.mLocalVideo, remoteStream, false);
      const tag = elements.mLocalPip.querySelector('span');
      if (tag) tag.textContent = 'Par';
    } else {
      attachVideoStream(elements.mRemoteVideo, remoteStream, false);
      attachVideoStream(elements.mLocalVideo, localStream, true);
      const tag = elements.mLocalPip.querySelector('span');
      if (tag) tag.textContent = 'Você';
    }
  });

  let isMobileCameraEnabled = true;
  let isMobileMicEnabled = true;

  function updateMobileCamUI(enabled) {
    if (!elements.mToggleCamBtn) return;
    if (enabled) {
      elements.mToggleCamBtn.classList.remove('btn-muted');
      elements.mToggleCamBtn.innerHTML = '<i data-lucide="video"></i>';
      elements.mLocalOffPlaceholder?.classList.add('hidden');
    } else {
      elements.mToggleCamBtn.classList.add('btn-muted');
      elements.mToggleCamBtn.innerHTML = '<i data-lucide="video-off"></i>';
      elements.mLocalOffPlaceholder?.classList.remove('hidden');
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function updateMobileMicUI(enabled) {
    if (!elements.mToggleMuteBtn) return;
    if (enabled) {
      elements.mToggleMuteBtn.classList.remove('btn-muted');
      elements.mToggleMuteBtn.innerHTML = '<i data-lucide="mic"></i>';
    } else {
      elements.mToggleMuteBtn.classList.add('btn-muted');
      elements.mToggleMuteBtn.innerHTML = '<i data-lucide="mic-off"></i>';
    }
    if (window.lucide) window.lucide.createIcons();
  }

  client.onCallEnded = () => {
    stopRinging();
    stopCallDuration();
    if (elements.mRemoteVideo) elements.mRemoteVideo.srcObject = null;
    if (elements.mLocalVideo) elements.mLocalVideo.srcObject = null;
    if (elements.mRemoteAudio) elements.mRemoteAudio.srcObject = null;
    elements.mLocalOffPlaceholder?.classList.add('hidden');
    elements.mAudioStage?.classList.add('hidden');
    elements.mVideoContainer?.classList.remove('hidden');
    elements.mVideoFallback.classList.remove('hidden');
    elements.mPreCallActions.classList.remove('hidden');
    elements.mActiveCallActions.classList.add('hidden');
    isMobileCameraEnabled = true;
    isMobileMicEnabled = true;
    updateMobileCamUI(true);
    updateMobileMicUI(true);
    showToast('Chamada terminada');
    switchTab('view-chat');
  };

  client.onRemoteVideoToggle = (remoteVideoEnabled) => {
    showToast(remoteVideoEnabled ? 'O parceiro ligou a câmara' : 'O parceiro desligou a câmara');
  };

  elements.mHangupBtn.addEventListener('click', () => {
    client.endCall(true);
    switchTab('view-chat');
  });

  elements.mToggleMuteBtn.addEventListener('click', () => {
    isMobileMicEnabled = client.toggleMicrophone();
    updateMobileMicUI(isMobileMicEnabled);
    showToast(isMobileMicEnabled ? 'Microfone ativado' : 'Microfone silenciado');
  });

  elements.mToggleCamBtn.addEventListener('click', () => {
    isMobileCameraEnabled = client.toggleCamera();
    updateMobileCamUI(isMobileCameraEnabled);
    showToast(isMobileCameraEnabled ? 'Câmara ativada' : 'Câmara desligada');
  });

  if (elements.mFlipCamBtn) {
    elements.mFlipCamBtn.addEventListener('click', async () => {
      showToast('A alternar câmara...');
      const stream = await client.flipCamera();
      if (stream) {
        attachVideoStream(elements.mLocalVideo, stream, true);
        showToast('Câmara invertida');
      } else {
        showToast('Não foi possível alternar câmara');
      }
    });
  }

  function startCallDuration() {
    callStartTime = Date.now();
    callTimerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
      const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const s = String(elapsed % 60).padStart(2, '0');
      elements.mCallDuration.textContent = `${m}:${s}`;
    }, 1000);
  }

  function stopCallDuration() {
    if (callTimerInterval) clearInterval(callTimerInterval);
    elements.mCallDuration.textContent = '00:00';
  }

  // =========================================================================
  // RENDERIZAÇÃO DE MENSAGENS NO TELEMÓVEL
  // =========================================================================
  function appendMobileMessage(data, skipSave = false) {
    elements.mEmptyState.classList.add('hidden');
    checkAndAppendDateDivider(elements.mMessagesContainer, data.time);
    const isMe = data.sender === 'me';
    const row = document.createElement('div');
    row.className = `m-msg-row ${isMe ? 'me' : 'peer'}`;

    const dateStr = formatDateOnly(data.time);
    const timeStr = formatTime(data.time);

    row.innerHTML = `
      <div class="m-msg-avatar">${escapeHtml((data.senderName || 'U').substring(0, 2).toUpperCase())}</div>
      <div class="m-msg-bubble">
        <div>${escapeHtml(data.text)}</div>
        <div class="m-msg-meta">
          <span title="${escapeHtml(dateStr)} às ${escapeHtml(timeStr)}">
            <small class="msg-date-tag">${escapeHtml(dateStr)}</small>${escapeHtml(timeStr)}
          </span>
          ${isMe ? `<span id="m-status-${data.id}">✓</span>` : ''}
        </div>
      </div>
    `;

    elements.mMessagesContainer.appendChild(row);
    scrollToBottom();

    if (!skipSave) {
      ChatHistory.save(client.remotePeerId, data);
    }
  }

  function appendMobileFile(data, skipSave = false) {
    elements.mEmptyState.classList.add('hidden');
    checkAndAppendDateDivider(elements.mMessagesContainer, data.time);
    const isMe = data.sender === 'me';
    const row = document.createElement('div');
    row.className = `m-msg-row ${isMe ? 'me' : 'peer'}`;

    let imgTag = data.isImage ? `<img src="${data.url}" class="m-img-msg" onclick="openLightbox('${data.url}')">` : '';
    const dateStr = formatDateOnly(data.time);
    const timeStr = formatTime(data.time);

    row.innerHTML = `
      <div class="m-msg-avatar">${escapeHtml((data.senderName || 'U').substring(0, 2).toUpperCase())}</div>
      <div class="m-msg-bubble">
        ${imgTag}
        <div class="m-file-card">
          <i data-lucide="${data.isImage ? 'image' : 'file'}"></i>
          <div class="m-file-meta">
            <strong>${escapeHtml(data.name)}</strong>
            <small>${formatBytes(data.size)}</small>
          </div>
          <a href="${data.url}" download="${escapeHtml(data.name)}" class="m-download-btn">
            <i data-lucide="download"></i>
          </a>
        </div>
        <div class="m-msg-meta">
          <span title="${escapeHtml(dateStr)} às ${escapeHtml(timeStr)}">
            <small class="msg-date-tag">${escapeHtml(dateStr)}</small>${escapeHtml(timeStr)}
          </span>
          ${isMe ? '<span>✓✓</span>' : ''}
        </div>
      </div>
    `;

    elements.mMessagesContainer.appendChild(row);
    if (window.lucide) window.lucide.createIcons();
    scrollToBottom();

    if (!skipSave) {
      ChatHistory.save(client.remotePeerId, data);
    }
  }

  function appendMobileVoice(data, skipSave = false) {
    elements.mEmptyState.classList.add('hidden');
    checkAndAppendDateDivider(elements.mMessagesContainer, data.time);
    const isMe = data.sender === 'me';
    const row = document.createElement('div');
    row.className = `m-msg-row ${isMe ? 'me' : 'peer'}`;

    const dateStr = formatDateOnly(data.time);
    const timeStr = formatTime(data.time);

    row.innerHTML = `
      <div class="m-msg-avatar">${escapeHtml((data.senderName || 'U').substring(0, 2).toUpperCase())}</div>
      <div class="m-msg-bubble">
        <div style="display:flex; align-items:center; gap:8px;">
          <audio src="${data.audioData}" controls style="max-width:200px; height:32px;"></audio>
        </div>
        <div class="m-msg-meta">
          <span title="${escapeHtml(dateStr)} às ${escapeHtml(timeStr)}">
            <small class="msg-date-tag">${escapeHtml(dateStr)}</small>${escapeHtml(timeStr)}
          </span>
          ${isMe ? '<span>✓✓</span>' : ''}
        </div>
      </div>
    `;

    elements.mMessagesContainer.appendChild(row);
    scrollToBottom();

    if (!skipSave) {
      ChatHistory.save(client.remotePeerId, data);
    }
  }

  // Lightbox
  window.openLightbox = (url) => {
    elements.mLightboxImg.src = url;
    elements.mLightbox.classList.remove('hidden');
  };
  elements.mCloseLightboxBtn.addEventListener('click', () => {
    elements.mLightbox.classList.add('hidden');
  });

  // Utilitários
  function scrollToBottom() {
    elements.mMessagesContainer.scrollTop = elements.mMessagesContainer.scrollHeight;
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

  // =========================================================================
  // SUPORTE PWA E INSTALAÇÃO NO TELEMÓVEL
  // =========================================================================
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.log('Service Worker registo:', err);
      });
    });
  }

  let deferredMobileInstall = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredMobileInstall = e;
    if (!sessionStorage.getItem('nexus_dismiss_install')) {
      const banner = document.getElementById('mInstallAppBanner');
      if (banner) banner.classList.remove('hidden');
    }
  });

  function triggerMobileAppInstall() {
    if (deferredMobileInstall) {
      deferredMobileInstall.prompt();
      deferredMobileInstall.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          showToast('A instalar Nexus P2P no seu ecrã...');
          const banner = document.getElementById('mInstallAppBanner');
          if (banner) banner.classList.add('hidden');
        }
        deferredMobileInstall = null;
      });
    } else {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isIOS) {
        alert('📱 Para instalar no iPhone (Safari):\n\n1. Toque no botão de Partilha ⎋ (no fundo do Safari)\n2. Deslize e toque em "Adicionar ao ecrã principal" ➕\n3. Toque em "Adicionar" no topo.');
      } else {
        alert('📱 Para instalar no seu telemóvel:\n\n1. Toque nos 3 pontinhos (⋮) no topo do seu navegador (Chrome/Edge)\n2. Escolha "Instalar aplicação" ou "Adicionar ao ecrã principal"');
      }
    }
  }

  const triggerInstallBtn = document.getElementById('mBtnTriggerInstall');
  if (triggerInstallBtn) {
    triggerInstallBtn.addEventListener('click', triggerMobileAppInstall);
  }
  const dismissInstallBtn = document.getElementById('mBtnDismissInstall');
  if (dismissInstallBtn) {
    dismissInstallBtn.addEventListener('click', () => {
      sessionStorage.setItem('nexus_dismiss_install', 'true');
      const banner = document.getElementById('mInstallAppBanner');
      if (banner) banner.classList.add('hidden');
    });
  }
  const optInstallApp = document.getElementById('mOptInstallApp');
  if (optInstallApp) {
    optInstallApp.addEventListener('click', () => {
      elements.mMoreDropdown?.classList.add('hidden');
      triggerMobileAppInstall();
    });
  }
});
