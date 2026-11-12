document.addEventListener('DOMContentLoaded', () => {
    /* ======================================================================
       1. Estado Inicial & Persistência (LocalStorage)
       ====================================================================== */
    const STORAGE_KEY = 'vibeconnect_state_v1';

    const defaultState = {
        theme: 'light',
        currentUser: {
            name: 'Camila Rocha',
            username: '@camilarocha.dev',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            bio: 'Product Designer & Front-end Enthusiast. Construindo interfaces centradas em pessoas. ✨'
        },
        stories: [
            {
                id: 1,
                name: 'Camila Rocha',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
                media: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
                time: '1h',
                caption: 'Finalizando o novo Design System da plataforma! 💻✨'
            },
            {
                id: 2,
                name: 'Lucas Mendes',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
                media: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
                time: '3h',
                caption: 'Trilha matinal antes de começar o expediente 🏔️'
            },
            {
                id: 3,
                name: 'Mariana Costa',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
                media: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
                time: '5h',
                caption: 'Refatorando arquitetura JavaScript moderna 🚀'
            },
            {
                id: 4,
                name: 'Rafael Lima',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
                media: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
                time: '8h',
                caption: 'Explorando novos sensores para automação sustentável 🌱'
            }
        ],
        suggestions: [
            {
                id: 'u2',
                name: 'Lucas Mendes',
                username: '@lucasmendes',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
                following: true
            },
            {
                id: 'u3',
                name: 'Mariana Costa',
                username: '@maricosta.ui',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
                following: true
            },
            {
                id: 'u4',
                name: 'Rafael Lima',
                username: '@rafalima.tech',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
                following: false
            }
        ],
        notifications: [
            {
                id: 1,
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
                text: '<strong>Lucas Mendes</strong> curtiu sua publicação sobre interfaces.',
                time: '12 min',
                unread: true
            },
            {
                id: 2,
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
                text: '<strong>Mariana Costa</strong> comentou: "Ficou incrível esse layout!"',
                time: '45 min',
                unread: true
            },
            {
                id: 3,
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
                text: '<strong>Rafael Lima</strong> começou a seguir você.',
                time: '2 h',
                unread: true
            }
        ],
        posts: [
            {
                id: 101,
                authorId: 'u2',
                authorName: 'Lucas Mendes',
                authorUsername: '@lucasmendes',
                authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
                verified: true,
                visibility: 'Público',
                timestamp: Date.now() - 3600000 * 2,
                content: 'Acabei de lançar um estudo de caso sobre performance web e acessibilidade! Pequenos ajustes na semântica fazem toda a diferença para quem navega. 🚀 #DevWeb #Tecnologia',
                image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80',
                likes: 42,
                likedByMe: false,
                savedByMe: false,
                shares: 7,
                comments: [
                    {
                        author: 'Mariana Costa',
                        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
                        text: 'Excelente iniciativa, Lucas! Acessibilidade precisa ser prioridade desde o wireframe.'
                    }
                ]
            },
            {
                id: 102,
                authorId: 'u3',
                authorName: 'Mariana Costa',
                authorUsername: '@maricosta.ui',
                authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
                verified: true,
                visibility: 'Público',
                timestamp: Date.now() - 3600000 * 5,
                content: 'Minimalismo não é apenas tirar elementos da tela, é dar espaço para o que realmente importa comunicar. Qual paleta vocês preferem para produtos digitais: modo claro ou escuro? 🎨 #DesignUI',
                image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80',
                likes: 89,
                likedByMe: true,
                savedByMe: true,
                shares: 14,
                comments: []
            },
            {
                id: 103,
                authorId: 'u4',
                authorName: 'Rafael Lima',
                authorUsername: '@rafalima.tech',
                authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
                verified: false,
                visibility: 'Público',
                timestamp: Date.now() - 3600000 * 9,
                content: 'Integrando sensores IoT com painéis solares residenciais para monitorar a pegada de carbono em tempo real. Economia circular na prática! 🌱⚡ #Sustentabilidade #Tecnologia',
                image: '',
                likes: 31,
                likedByMe: false,
                savedByMe: false,
                shares: 5,
                comments: []
            }
        ]
    };

    let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultState;
    let activeFeedFilter = 'all';
    let searchQuery = '';
    let sortBy = 'recent';

    const saveState = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    };

    /* ======================================================================
       2. Utilitários
       ====================================================================== */
    const showToast = (message) => {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

    const formatTimeAgo = (timestamp) => {
        const diff = Math.floor((Date.now() - timestamp) / 1000);
        if (diff < 60) return 'Agora mesmo';
        if (diff < 3600) return `${Math.floor(diff / 60)} min`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} h`; return `${Math.floor(diff / 86400)} d`;
    };

    const escapeHTML = (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    };

    const formatPostText = (text) => {
        const safe = escapeHTML(text);
        return safe.replace(/(#[a-zA-Z0-9À-ÿ_]+)/g, '<span class="hashtag" data-hashtag="$1">$1</span>');
    };

    /* ======================================================================
       3. Tema Claro / Escuro
       ====================================================================== */
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        document.getElementById('themeIcon').textContent = theme === 'dark' ? '☀️' : '🌙';
    };

    applyTheme(state.theme);

    document.getElementById('themeToggle').addEventListener('click', () => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        applyTheme(state.theme);
        saveState();
    });

    /* ======================================================================
       4. Renderização de Perfil, Stories, Sugestões e Notificações
       ====================================================================== */
    const renderProfile = () => {
        const { name, username, bio } = state.currentUser;
        document.getElementById('headerUserName').textContent = name;
        document.getElementById('sideName').textContent = name;
        document.getElementById('sideUsername').textContent = username;
        document.getElementById('sideBio').textContent = bio;

        const myPostsCount = state.posts.filter(p => p.authorId === 'me').length;
        document.getElementById('statPosts').textContent = myPostsCount;
    };

    const renderStories = () => {
        const container = document.getElementById('storiesList');
        container.innerHTML = state.stories.map(story => `
            <div class="story-item" data-story-id="${story.id}">
                <div class="story-ring">
                    <img src="${story.avatar}" alt="${escapeHTML(story.name)}">
                </div>
                <span>${escapeHTML(story.name.split(' ')[0])}</span>
            </div>
        `).join('');
    };

    const renderSuggestions = () => {
        const list = document.getElementById('suggestionsList');
        list.innerHTML = state.suggestions.map(user => `
            <li class="suggestion-item">
                <div class="suggestion-user">
                    <img src="${user.avatar}" alt="${escapeHTML(user.name)}">
                    <div>
                        <strong>${escapeHTML(user.name)}</strong>
                        <span>${escapeHTML(user.username)}</span>
                    </div>
                </div>
                <button class="btn btn-sm ${user.following ? 'btn-outline' : 'btn-primary'} follow-btn" data-user-id="${user.id}">
                    ${user.following ? 'Seguindo' : 'Seguir'}
                </button>
            </li>
        `).join('');
    };

    const renderNotifications = () => {
        const list = document.getElementById('notifList');
        const badge = document.getElementById('notifBadge');
        const unreadCount = state.notifications.filter(n => n.unread).length;

        badge.textContent = unreadCount;
        badge.classList.toggle('hidden', unreadCount === 0);

        list.innerHTML = state.notifications.map(n => `
            <li class="notif-item ${n.unread ? 'unread' : ''}">
                <img src="${n.avatar}" alt="Avatar">
                <div>
                    <p>${n.text}</p>
                    <small style="color: var(--text-muted)">${n.time}</small>
                </div>
            </li>
        `).join('');
    };

    /* ======================================================================
       5. Renderização do Feed de Publicações
       ====================================================================== */
    const renderFeed = () => {
        const feedEl = document.getElementById('postsFeed');
        let filtered = [...state.posts];

        // Filtro lateral
        if (activeFeedFilter === 'following') {
            const followingIds = state.suggestions.filter(s => s.following).map(s => s.id);
            filtered = filtered.filter(p => followingIds.includes(p.authorId) || p.authorId === 'me');
        } else if (activeFeedFilter === 'saved') {
            filtered = filtered.filter(p => p.savedByMe);
        } else if (activeFeedFilter === 'mine') {
            filtered = filtered.filter(p => p.authorId === 'me');
        }

        // Busca textual / hashtag
        if (searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.content.toLowerCase().includes(q) ||
                p.authorName.toLowerCase().includes(q) ||
                p.authorUsername.toLowerCase().includes(q)
            );
        }

        // Ordenação
        if (sortBy === 'popular') {
            filtered.sort((a, b) => b.likes - a.likes);
        } else {
            filtered.sort((a, b) => b.timestamp - a.timestamp);
        }

        if (filtered.length === 0) {
            feedEl.innerHTML = `
                <div class="card" style="padding: 2.5rem; text-align: center; color: var(--text-muted);">
                    <p style="font-size: 1.1rem; margin-bottom: 0.4rem;">Nenhuma publicação encontrada.</p>
                    <small>Tente alterar o filtro ou publicar algo novo acima!</small>
                </div>
            `;
            return;
        }

        feedEl.innerHTML = filtered.map(post => `
            <article class="card post-card" data-post-id="${post.id}">
                <div class="post-header">
                    <div class="post-author">
                        <img src="${post.authorAvatar}" alt="${escapeHTML(post.authorName)}" class="avatar-sm">
                        <div class="post-author-info">
                            <h4>
                                ${escapeHTML(post.authorName)}${post.verified ? '<span class="verified-badge" title="Verificado">✔</span>' : ''}
                            </h4>
                            <span class="post-meta">${escapeHTML(post.authorUsername)} • ${formatTimeAgo(post.timestamp)} •${post.visibility}</span>
                        </div>
                    </div>
                    ${post.authorId === 'me' ? `<button class="post-delete-btn" data-delete-id="${post.id}" title="Excluir publicação">🗑️</button>` : ''}
                </div>

                <div class="post-body">${formatPostText(post.content)}</div>

                ${post.image ? `
                    <div class="post-media">
                        <img src="${escapeHTML(post.image)}" alt="Imagem da publicação" loading="lazy" onerror="this.parentElement.style.display='none'">
                    </div>
                ` : ''}

                <div class="post-stats-bar">
                    <span>❤️ ${post.likes} curtidas</span>
                    <span>${post.comments.length} comentários • ${post.shares} compartilhamentos</span>
                </div>

                <div class="post-actions">
                    <button class="action-btn ${post.likedByMe ? 'liked' : ''}" data-action="like" data-id="${post.id}">
                        ${post.likedByMe ? '❤️ Curtiu' : '🤍 Curtir'}
                    </button>
                    <button class="action-btn" data-action="comment" data-id="${post.id}">
                        💬 Comentar
                    </button>
                    <button class="action-btn" data-action="share"
