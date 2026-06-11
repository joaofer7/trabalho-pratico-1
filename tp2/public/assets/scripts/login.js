// ===== LOGIN =====
async function fazerLogin(e) {
  e.preventDefault();
  const login = document.getElementById('login-input').value.trim();
  const senha = document.getElementById('senha-input').value.trim();
  const msgErro = document.getElementById('msg-erro');

  if (!login || !senha) {
    msgErro.textContent = 'Preencha login e senha.';
    msgErro.style.display = 'block';
    return;
  }

  try {
    const r = await fetch(`http://localhost:3000/usuarios?login=${encodeURIComponent(login)}&senha=${encodeURIComponent(senha)}`);
    const usuarios = await r.json();

    if (usuarios.length === 0) {
      msgErro.textContent = 'Login ou senha incorretos.';
      msgErro.style.display = 'block';
      return;
    }

    const usuario = usuarios[0];
    sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    window.location.href = 'index.html';
  } catch {
    msgErro.textContent = 'Erro de conexão. Verifique se o servidor está rodando.';
    msgErro.style.display = 'block';
  }
}

// ===== CADASTRO DE USUARIO =====
async function cadastrarUsuario(e) {
  e.preventDefault();
  const login = document.getElementById('cad-login').value.trim();
  const nome = document.getElementById('cad-nome').value.trim();
  const email = document.getElementById('cad-email').value.trim();
  const senha = document.getElementById('cad-senha').value.trim();
  const msgErro = document.getElementById('msg-erro-cad');
  const msgOk = document.getElementById('msg-ok-cad');

  if (!login || !nome || !email || !senha) {
    msgErro.textContent = 'Todos os campos são obrigatórios.';
    msgErro.style.display = 'block';
    msgOk.style.display = 'none';
    return;
  }

  // Verifica login duplicado
  try {
    const check = await fetch(`http://localhost:3000/usuarios?login=${encodeURIComponent(login)}`);
    const existentes = await check.json();
    if (existentes.length > 0) {
      msgErro.textContent = 'Este login já está em uso.';
      msgErro.style.display = 'block';
      return;
    }

    const novoUsuario = {
      id: crypto.randomUUID(),
      login, nome, email, senha,
      admin: false
    };

    const r = await fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoUsuario)
    });

    if (r.ok) {
      msgErro.style.display = 'none';
      msgOk.style.display = 'block';
      msgOk.textContent = 'Cadastro realizado! Redirecionando para login...';
      setTimeout(() => { window.location.href = 'login.html'; }, 2000);
    } else {
      throw new Error('Erro no servidor');
    }
  } catch {
    msgErro.textContent = 'Erro ao cadastrar. Tente novamente.';
    msgErro.style.display = 'block';
  }
}
