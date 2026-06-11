// ===== CRUD ÁLBUNS =====
const API_CRUD = 'http://localhost:3000';

async function iniciarCrud() {
  renderizarNavbar();
  const container = document.getElementById('pagina-crud');

  // Verificar se é admin
  if (!isAdmin()) {
    container.innerHTML = `
      <div class="text-center py-5">
        <h3 class="text-danger mb-3">Acesso Negado</h3>
        <p class="text-secondary">Esta página é exclusiva para administradores.</p>
        <a href="index.html" class="btn btn-outline-verde mt-2">Voltar ao Início</a>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="page-header d-flex justify-content-between align-items-center">
      <div>
        <h2 class="mb-0">Cadastro de Álbuns</h2>
        <span class="badge-admin ms-2">ADMIN</span>
      </div>
    </div>

    <!-- FORMULÁRIO -->
    <div class="p-4 rounded border mb-5" style="background:var(--preto-card);border-color:var(--borda)!important">
      <h5 class="text-success mb-4" id="form-titulo">Novo Álbum</h5>
      <input type="hidden" id="edit-id">

      <div class="row g-3">
        <div class="col-md-2">
          <label class="form-label text-secondary small">ID</label>
          <input type="text" id="f-id" class="form-control form-control-dark" placeholder="Ex: 7">
        </div>
        <div class="col-md-5">
          <label class="form-label text-secondary small">Título *</label>
          <input type="text" id="f-titulo" class="form-control form-control-dark" placeholder="Nome do álbum">
        </div>
        <div class="col-md-5">
          <label class="form-label text-secondary small">Artista *</label>
          <input type="text" id="f-artista" class="form-control form-control-dark" placeholder="Nome do artista">
        </div>
        <div class="col-md-8">
          <label class="form-label text-secondary small">Descrição *</label>
          <input type="text" id="f-descricao" class="form-control form-control-dark" placeholder="Breve descrição">
        </div>
        <div class="col-md-2">
          <label class="form-label text-secondary small">Ano *</label>
          <input type="number" id="f-ano" class="form-control form-control-dark" placeholder="2025" min="1900" max="2099">
        </div>
        <div class="col-md-2">
          <label class="form-label text-secondary small">Gênero *</label>
          <input type="text" id="f-genero" class="form-control form-control-dark" placeholder="Rock, Pop...">
        </div>
        <div class="col-12">
          <label class="form-label text-secondary small">URL da Imagem *</label>
          <input type="url" id="f-imagem" class="form-control form-control-dark" placeholder="https://...">
        </div>
        <div class="col-12">
          <label class="form-label text-secondary small">Link YouTube</label>
          <input type="url" id="f-youtube" class="form-control form-control-dark" placeholder="https://youtube.com/...">
        </div>
        <div class="col-12">
          <label class="form-label text-secondary small">Faixas (separadas por vírgula)</label>
          <textarea id="f-faixas" class="form-control form-control-dark" rows="2"
                    placeholder="Faixa 1, Faixa 2, Faixa 3"></textarea>
        </div>
        <div class="col-12">
          <label class="form-label text-secondary small">Análise IA</label>
          <textarea id="f-analise" class="form-control form-control-dark" rows="2"
                    placeholder="Análise crítica por inteligência artificial..."></textarea>
        </div>
        <div class="col-12">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="f-destaque">
            <label class="form-check-label text-secondary" for="f-destaque">Álbum em destaque (carrossel)</label>
          </div>
        </div>
      </div>

      <div id="msg-crud" class="mt-3 alert py-2 small" style="display:none"></div>

      <div class="mt-4 d-flex gap-2">
        <button class="btn btn-verde px-4" onclick="salvarAlbum()">Inserir</button>
        <button class="btn btn-warning px-4" onclick="alterarAlbum()">Alterar</button>
        <button class="btn btn-outline-secondary px-3" onclick="limparFormCrud()">Limpar</button>
      </div>
    </div>

    <!-- LISTAGEM -->
    <h4 class="mb-3">Álbuns Cadastrados</h4>
    <div class="table-responsive">
      <table class="table table-dark-custom table-hover align-middle" id="tabela-albuns">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Artista</th>
            <th>Ano</th>
            <th>Gênero</th>
            <th>Destaque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody id="tbody-albuns">
          <tr><td colspan="7" class="text-center text-secondary py-4">Carregando...</td></tr>
        </tbody>
      </table>
    </div>`;

  await carregarTabelaAlbuns();
}

async function carregarTabelaAlbuns() {
  const tbody = document.getElementById('tbody-albuns');
  try {
    const r = await fetch(`${API_CRUD}/albuns`);
    const albuns = await r.json();
    if (albuns.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center text-secondary py-4">Nenhum álbum cadastrado.</td></tr>';
      return;
    }
    tbody.innerHTML = albuns.map(a => `
      <tr>
        <td class="text-secondary small">${a.id}</td>
        <td>${a.titulo}</td>
        <td class="text-secondary">${a.artista}</td>
        <td>${a.ano}</td>
        <td><span class="badge-genero">${a.genero}</span></td>
        <td>${a.destaque ? '⭐' : '—'}</td>
        <td>
          <button class="btn btn-sm btn-outline-warning me-1" onclick="preencherForm('${a.id}')">Editar</button>
          <button class="btn btn-sm btn-outline-danger" onclick="excluirAlbum('${a.id}', '${a.titulo}')">Excluir</button>
        </td>
      </tr>`).join('');
  } catch {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-danger py-4">Erro ao carregar dados.</td></tr>';
  }
}

async function salvarAlbum() {
  const dados = coletarFormulario();
  if (!dados) return;

  const msg = document.getElementById('msg-crud');
  try {
    const r = await fetch(`${API_CRUD}/albuns`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    if (!r.ok) throw new Error();
    mostrarMensagem('Álbum inserido com sucesso!', 'success');
    limparFormCrud();
    await carregarTabelaAlbuns();
  } catch {
    mostrarMensagem('Erro ao inserir álbum.', 'danger');
  }
}

async function alterarAlbum() {
  const id = document.getElementById('edit-id').value;
  if (!id) { mostrarMensagem('Selecione um álbum para alterar (clique em Editar).', 'warning'); return; }
  const dados = coletarFormulario();
  if (!dados) return;
  try {
    const r = await fetch(`${API_CRUD}/albuns/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...dados, id })
    });
    if (!r.ok) throw new Error();
    mostrarMensagem('Álbum alterado com sucesso!', 'success');
    limparFormCrud();
    await carregarTabelaAlbuns();
  } catch {
    mostrarMensagem('Erro ao alterar álbum.', 'danger');
  }
}

async function excluirAlbum(id, titulo) {
  if (!confirm(`Excluir o álbum "${titulo}"?`)) return;
  try {
    await fetch(`${API_CRUD}/albuns/${id}`, { method: 'DELETE' });
    mostrarMensagem('Álbum excluído.', 'success');
    await carregarTabelaAlbuns();
  } catch {
    mostrarMensagem('Erro ao excluir.', 'danger');
  }
}

async function preencherForm(id) {
  const r = await fetch(`${API_CRUD}/albuns/${id}`);
  const a = await r.json();
  document.getElementById('edit-id').value = a.id;
  document.getElementById('f-id').value = a.id;
  document.getElementById('f-titulo').value = a.titulo || '';
  document.getElementById('f-artista').value = a.artista || '';
  document.getElementById('f-descricao').value = a.descricao || '';
  document.getElementById('f-ano').value = a.ano || '';
  document.getElementById('f-genero').value = a.genero || '';
  document.getElementById('f-imagem').value = a.imagem_principal || '';
  document.getElementById('f-youtube').value = a.link_youtube || '';
  document.getElementById('f-faixas').value = (a.faixas || []).join(', ');
  document.getElementById('f-analise').value = a.analise_ia || '';
  document.getElementById('f-destaque').checked = !!a.destaque;
  document.getElementById('form-titulo').textContent = `Editando: ${a.titulo}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function coletarFormulario() {
  const titulo = document.getElementById('f-titulo').value.trim();
  const artista = document.getElementById('f-artista').value.trim();
  const descricao = document.getElementById('f-descricao').value.trim();
  const ano = parseInt(document.getElementById('f-ano').value);
  const genero = document.getElementById('f-genero').value.trim();
  const imagem = document.getElementById('f-imagem').value.trim();

  if (!titulo || !artista || !descricao || !ano || !genero || !imagem) {
    mostrarMensagem('Preencha todos os campos obrigatórios (*).', 'warning');
    return null;
  }

  const idManual = document.getElementById('f-id').value.trim();
  const faixasStr = document.getElementById('f-faixas').value.trim();

  return {
    ...(idManual ? { id: idManual } : {}),
    titulo, artista, descricao, ano, genero,
    imagem_principal: imagem,
    link_youtube: document.getElementById('f-youtube').value.trim(),
    faixas: faixasStr ? faixasStr.split(',').map(f => f.trim()).filter(Boolean) : [],
    analise_ia: document.getElementById('f-analise').value.trim(),
    destaque: document.getElementById('f-destaque').checked
  };
}

function limparFormCrud() {
  ['f-id','f-titulo','f-artista','f-descricao','f-ano','f-genero','f-imagem','f-youtube','f-faixas','f-analise'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('f-destaque').checked = false;
  document.getElementById('edit-id').value = '';
  document.getElementById('form-titulo').textContent = 'Novo Álbum';
  const msg = document.getElementById('msg-crud');
  if (msg) msg.style.display = 'none';
}

function mostrarMensagem(texto, tipo) {
  const el = document.getElementById('msg-crud');
  if (!el) return;
  el.className = `mt-3 alert alert-${tipo} py-2 small`;
  el.textContent = texto;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 3500);
}
