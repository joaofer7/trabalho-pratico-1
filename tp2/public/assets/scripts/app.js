// ===== CONFIG =====
const API = 'http://localhost:3000';

// ===== AUTH HELPERS =====
function getUsuarioLogado() {
  const u = sessionStorage.getItem('usuarioLogado');
  return u ? JSON.parse(u) : null;
}

function isLogado() { return !!getUsuarioLogado(); }
function isAdmin() { const u = getUsuarioLogado(); return u && u.admin === true; }

// ===== NAVBAR DINÂMICA =====
function renderizarNavbar() {
  const navLogin = document.getElementById('nav-login');
  const navFavoritos = document.getElementById('nav-favoritos');
  const navCadastro = document.getElementById('nav-cadastro-item');
  const usuario = getUsuarioLogado();

  if (!navLogin) return;

  if (usuario) {
    navLogin.innerHTML = `
      <span class="nav-link text-success me-2">Olá, ${usuario.nome.split(' ')[0]}</span>
      <a class="nav-link" href="#" onclick="logout()">Logout</a>
    `;
    if (navFavoritos) navFavoritos.style.display = 'block';
    // O cadastro só aparece se o usuário estiver logado E for administrador
    if (navCadastro) {
      if (usuario.admin) {
        navCadastro.style.display = 'block';
      } else {
        navCadastro.style.display = 'none';
      }
    }
  } else {
    navLogin.innerHTML = `<a class="nav-link" href="login.html">Login</a>`;
    if (navFavoritos) navFavoritos.style.display = 'none';
    if (navCadastro) navCadastro.style.display = 'none';
  }
}

function logout() {
  sessionStorage.removeItem('usuarioLogado');
  window.location.href = 'index.html';
}

// ===== FAVORITOS HELPERS =====
async function getFavoritosUsuario() {
  const u = getUsuarioLogado();
  if (!u) return [];
  try {
    const r = await fetch(`${API}/favoritos?usuarioId=${u.id}`);
    return await r.json();
  } catch { return []; }
}

async function toggleFavorito(albumId, btnEl) {
  const u = getUsuarioLogado();
  if (!u) {
    alert('Você precisa estar logado para favoritar!');
    window.location.href = 'login.html';
    return;
  }
  const favs = await getFavoritosUsuario();
  const existing = favs.find(f => f.albumId === String(albumId));
  if (existing) {
    await fetch(`${API}/favoritos/${existing.id}`, { method: 'DELETE' });
    if (btnEl) { btnEl.classList.remove('favoritado'); btnEl.title = 'Favoritar'; }
  } else {
    await fetch(`${API}/favoritos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuarioId: u.id, albumId: String(albumId) })
    });
    if (btnEl) { btnEl.classList.add('favoritado'); btnEl.title = 'Desfavoritar'; }
  }
}

// ===== CORAÇÃO ICON =====
function heartIcon(filled) {
  return filled
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>`;
}

// ===== HOME PAGE =====
async function carregarHome() {
  renderizarNavbar();
  const favs = await getFavoritosUsuario();
  const favIds = favs.map(f => String(f.albumId));

  let albuns = [];
  try {
    const r = await fetch(`${API}/albuns`);
    albuns = await r.json();
  } catch {
    document.getElementById('grid-albuns').innerHTML = '<p class="text-danger">Erro ao carregar dados. Verifique se o JSON Server está rodando.</p>';
    return;
  }

  // --- CORREÇÃO DO CARROSSEL ---
  const containerCarousel = document.getElementById('carousel-items');
  const containerIndicators = document.getElementById('carousel-indicators');
  const destaques = albuns.filter(a => a.destaque);

  if (containerCarousel && destaques.length > 0) {
    containerCarousel.innerHTML = '';
    if (containerIndicators) containerIndicators.innerHTML = '';

    destaques.forEach((album, i) => {
      // 1. Injeta os indicadores correspondentes
      if (containerIndicators) {
        containerIndicators.innerHTML += `
          <button type="button" data-bs-target="#destaqueCarousel" data-bs-slide-to="${i}" 
                  class="${i === 0 ? 'active' : ''}" aria-current="${i === 0 ? 'true' : 'false'}">
          </button>`;
      }

      // 2. Injeta os slides
      containerCarousel.innerHTML += `
        <div class="carousel-item ${i === 0 ? 'active' : ''}">
          <img src="${album.imagem_principal}" class="d-block w-100" alt="${album.titulo}" style="object-fit: cover; height: 480px;">
          <div class="carousel-caption" style="background: rgba(0, 0, 0, 0.6); padding: 15px; border-radius: 8px;">
            <span class="badge-genero mb-2 d-inline-block">${album.genero}</span>
            <h5>${album.titulo}</h5>
            <p>${album.descricao}</p>
            <a href="detalhes.html?id=${album.id}" class="btn btn-verde mt-2">Ver Análise</a>
          </div>
        </div>`;
    });

    // 3. Força o Bootstrap a inicializar os novos elementos inseridos pelo JavaScript
    const elementoCarousel = document.getElementById('destaqueCarousel');
    if (elementoCarousel) {
      const instanciaAntiga = bootstrap.Carousel.getInstance(elementoCarousel);
      if (instanciaAntiga) instanciaAntiga.dispose(); // Limpa instâncias fantasmas vazias
      
      new bootstrap.Carousel(elementoCarousel, {
        interval: 5000,
        ride: 'carousel'
      });
    }
  }

  // --- CARDS ---
  renderCards(albuns, favIds);

  // --- PESQUISA ---
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');

  function filtrar() {
    const termo = searchInput.value.trim().toLowerCase();
    if (!termo) {
      renderCards(albuns, favIds);
    } else {
      const filtrados = albuns.filter(a =>
        a.titulo.toLowerCase().includes(termo) ||
        a.descricao.toLowerCase().includes(termo) ||
        a.artista.toLowerCase().includes(termo)
      );
      renderCards(filtrados, favIds);
    }
  }

  if (searchInput) searchInput.addEventListener('input', filtrar);
  if (searchBtn) searchBtn.addEventListener('click', filtrar);
  if (searchInput) {
    searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') filtrar(); });
  }

  // --- GRÁFICO ---
  carregarGrafico(albuns);
}

function renderCards(albuns, favIds) {
  const container = document.getElementById('grid-albuns');
  if (!container) return;
  if (albuns.length === 0) {
    container.innerHTML = `<div class="col-12 empty-state"><p>Nenhum álbum encontrado.</p></div>`;
    return;
  }
  container.innerHTML = '';
  albuns.forEach(album => {
    const isFav = favIds.includes(String(album.id));
    container.innerHTML += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="album-card">
          <a href="detalhes.html?id=${album.id}" style="text-decoration:none;color:inherit">
            <img src="${album.imagem_principal}" alt="${album.titulo}" loading="lazy">
          </a>
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
              <a href="detalhes.html?id=${album.id}" style="text-decoration:none;color:inherit;flex:1">
                <div class="card-title">${album.titulo}</div>
                <div class="card-artista">${album.artista} · ${album.ano}</div>
                <div class="card-descricao">${album.descricao}</div>
              </a>
              <button class="btn-favorito ${isFav ? 'favoritado' : ''}" 
                      title="${isFav ? 'Desfavoritar' : 'Favoritar'}"
                      onclick="handleFavCard(event, '${album.id}', this)">
                ${heartIcon(isFav)}
              </button>
            </div>
            <span class="badge-genero mt-2 d-inline-block">${album.genero}</span>
          </div>
        </div>
      </div>`;
  });
}

async function handleFavCard(e, albumId, btn) {
  e.preventDefault();
  e.stopPropagation();
  await toggleFavorito(albumId, btn);
  const isFav = btn.classList.contains('favoritado');
  btn.innerHTML = heartIcon(isFav);
}

// ===== GRÁFICO (Chart.js) =====
function carregarGrafico(albuns) {
  const ctx = document.getElementById('grafico-anos');
  if (!ctx) return;
  const porAno = {};
  albuns.forEach(a => { porAno[a.ano] = (porAno[a.ano] || 0) + 1; });
  const anos = Object.keys(porAno).sort();
  const counts = anos.map(a => porAno[a]);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: anos,
      datasets: [{
        label: 'Álbuns por Ano',
        data: counts,
        backgroundColor: 'rgba(0,255,136,0.7)',
        borderColor: '#00ff88',
        borderWidth: 2,
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#e0e0e0' } },
        tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y} álbum(ns)` } }
      },
      scales: {
        x: { ticks: { color: '#888' }, grid: { color: '#222' } },
        y: {
          ticks: { color: '#888', stepSize: 1 },
          grid: { color: '#222' },
          beginAtZero: true
        }
      }
    }
  });
}

// ===== DETALHES =====
async function carregarDetalhes() {
  renderizarNavbar();
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  let album;
  try {
    const r = await fetch(`${API}/albuns/${id}`);
    album = await r.json();
  } catch {
    document.getElementById('detalhe-conteudo').innerHTML = '<p>Erro ao carregar álbum.</p>';
    return;
  }

  const favs = await getFavoritosUsuario();
  const isFav = favs.some(f => String(f.albumId) === String(id));

  // Info principal
  document.getElementById('detalhe-conteudo').innerHTML = `
    <div class="row align-items-center">
      <div class="col-md-4 mb-4 mb-md-0">
        <img src="${album.imagem_principal}" class="img-fluid detalhe-img w-100" alt="${album.titulo}">
      </div>
      <div class="col-md-8">
        <div class="d-flex align-items-center gap-3 mb-2">
          <h1 class="fw-bold mb-0">${album.titulo}</h1>
          <button class="btn-favorito ${isFav ? 'favoritado' : ''}" 
                  id="btn-fav-detalhe"
                  title="${isFav ? 'Desfavoritar' : 'Favoritar'}"
                  onclick="handleFavDetalhe('${album.id}', this)"
                  style="font-size:1.8rem">
            ${heartIcon(isFav)}
          </button>
        </div>
        <h4 class="text-success mb-3">${album.artista}</h4>
        <p class="lead">${album.descricao}</p>
        <div class="d-flex gap-3 flex-wrap mb-3">
          <span class="badge-genero">${album.genero}</span>
          <span class="text-secondary"><strong style="color:#ccc">Ano:</strong> ${album.ano}</span>
        </div>
        <a href="${album.link_youtube}" target="_blank" rel="noopener" class="btn btn-verde">
          ▶ Ouvir no Youtube
        </a>
      </div>
    </div>`;

  // Faixas
  const secaoFaixas = document.getElementById('secao-faixas');
  if (secaoFaixas && album.faixas) {
    secaoFaixas.innerHTML = album.faixas.map((faixa, i) => `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="faixa-item">
          <span style="color:var(--verde);font-weight:700">${i + 1}.</span> ${faixa}
        </div>
      </div>`).join('');
  }

  // Análise IA
  const analiseBox = document.getElementById('analise-ia');
  if (analiseBox) {
    analiseBox.innerHTML = `
      <div class="analise-box">
        <h5 class="text-success mb-3">🤖 Análise Crítica por IA</h5>
        <p class="mb-0" style="line-height:1.9">${album.analise_ia}</p>
      </div>`;
  }
}

async function handleFavDetalhe(albumId, btn) {
  await toggleFavorito(albumId, btn);
  const isFav = btn.classList.contains('favoritado');
  btn.innerHTML = heartIcon(isFav);
}

// ===== FAVORITOS PAGE =====
async function carregarFavoritos() {
  renderizarNavbar();
  const u = getUsuarioLogado();
  if (!u) { window.location.href = 'login.html'; return; }

  const container = document.getElementById('grid-favoritos');
  const favs = await getFavoritosUsuario();

  if (favs.length === 0) {
    container.innerHTML = `
      <div class="col-12 empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
        </svg>
        <p>Você ainda não favoritou nenhum álbum.<br><a href="index.html" class="text-success">Explorar álbuns</a></p>
      </div>`;
    return;
  }

  const albumIds = favs.map(f => f.albumId);
  const albumPromises = albumIds.map(id => fetch(`${API}/albuns/${id}`).then(r => r.json()).catch(() => null));
  const albuns = (await Promise.all(albumPromises)).filter(Boolean);

  container.innerHTML = '';
  albuns.forEach(album => {
    const favRec = favs.find(f => String(f.albumId) === String(album.id));
    container.innerHTML += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="album-card">
          <a href="detalhes.html?id=${album.id}" style="text-decoration:none;color:inherit">
            <img src="${album.imagem_principal}" alt="${album.titulo}" loading="lazy">
          </a>
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
              <a href="detalhes.html?id=${album.id}" style="text-decoration:none;color:inherit;flex:1">
                <div class="card-title">${album.titulo}</div>
                <div class="card-artista">${album.artista} · ${album.ano}</div>
              </a>
              <button class="btn-favorito favoritado" title="Remover favorito"
                      onclick="removerFavoritoUI(event, '${favRec.id}', this)">
                ${heartIcon(true)}
              </button>
            </div>
          </div>
        </div>
      </div>`;
  });
}

async function removerFavoritoUI(e, favId, btn) {
  e.preventDefault();
  await fetch(`${API}/favoritos/${favId}`, { method: 'DELETE' });
  btn.closest('.col-12').remove();
  const container = document.getElementById('grid-favoritos');
  if (container && container.children.length === 0) carregarFavoritos();
}