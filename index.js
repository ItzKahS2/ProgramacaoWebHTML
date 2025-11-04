<<<<<<< HEAD
/* Central JS: menu, toast, forms, projects, modal, basic localStorage */

const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));

/* ---------- Toast ---------- */
const toastEl = document.getElementById('toast');
function showToast(msg, time=3000){
  if(!toastEl) return;
  toastEl.textContent = msg;
  toastEl.hidden = false;
  toastEl.classList.add('show');
  setTimeout(()=> { toastEl.classList.remove('show'); toastEl.hidden = true; }, time);
}

/* ---------- Menu toggle & dropdown mobile ---------- */
document.addEventListener('click', (e) => {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if(!toggle || !nav) return;
  if(e.target === toggle || toggle.contains(e.target)){
    nav.querySelector('ul').classList.toggle('show');
  }
  // close nav when clicking a link (mobile)
  if(e.target.matches('.main-nav a')) {
    nav.querySelector('ul')?.classList.remove('show');
  }
});

/* ---------- Simple data: sample projects (localStorage backed) ---------- */
const PKEY = 'ong_projects_v1';
function loadProjects(){
  return JSON.parse(localStorage.getItem(PKEY) || '[]');
}
function saveProjects(arr){ localStorage.setItem(PKEY, JSON.stringify(arr)); }

/* seed default if empty */
if(!localStorage.getItem(PKEY)){
  const seed = [
    { nome:'Verde Futuro', categoria:'meioambiente', descricao:'Educação ambiental e plantio de árvores.' , img:''},
    { nome:'Jardim Comunitário', categoria:'comunidade', descricao:'Hortas em espaços públicos.' , img:''},
    { nome:'Laboratório de Inovação', categoria:'inovacao', descricao:'Oficinas de tecnologia para jovens.' , img:''}
  ];
  saveProjects(seed);
}

/* ---------- Render projects (cards) ---------- */
function renderProjects(filter='todos'){
  const grid = document.getElementById('projectsGrid');
  if(!grid) return;
  const arr = loadProjects();
  const list = filter === 'todos' ? arr : arr.filter(p => p.categoria === filter);
  grid.innerHTML = '';
  if(list.length === 0){ grid.innerHTML = `<p>Nenhum projeto encontrado.</p>`; return; }
  list.forEach((p,i) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div>
        <h4>${p.nome}</h4>
        <p>${p.descricao}</p>
      </div>
      <div style="margin-top:12px;display:flex;gap:8px;align-items:center">
        <span class="tag">${p.categoria}</span>
        <button class="btn small outline" data-action="view" data-index="${i}">Ver</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* initial render if on projects page */
document.addEventListener('DOMContentLoaded', () => {
  const gridEl = document.getElementById('projectsGrid');
  if(gridEl) renderProjects();

  const filter = document.getElementById('filter');
  if(filter){
    filter.addEventListener('change', ()=> renderProjects(filter.value));
  }

  const btnNew = document.getElementById('btnNew');
  if(btnNew){
    btnNew.addEventListener('click', () => {
      const arr = loadProjects();
      arr.push({ nome:`Projeto Demo ${arr.length+1}`, categoria:'comunidade', descricao:'Projeto criado rapidamente (demo).'});
      saveProjects(arr);
      renderProjects(filter?.value || 'todos');
      showToast('Projeto demo criado');
    });
  }

  /* card actions (event delegation) */
  document.body.addEventListener('click', (e) => {
    const v = e.target.closest('button[data-action="view"]');
    if(v){
      const idx = Number(v.dataset.index);
      const arr = loadProjects();
      const p = arr[idx];
      if(p) openModal(p);
    }
  });

  /* modal close */
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  if(modalClose) modalClose.addEventListener('click', ()=> closeModal());
  if(modal) modal.addEventListener('click', (e)=> { if(e.target===modal) closeModal(); });

  /* Register form */
  const reg = document.getElementById('registerForm');
  if(reg){
    reg.addEventListener('submit', (e)=> {
      e.preventDefault();
      const name = $('#rname').value.trim();
      const email = $('#remail').value.trim();
      const pass = $('#rpass').value;
      const alert = $('#regAlert');
      if(!name || !email || pass.length < 6){
        alert.textContent = 'Preencha corretamente todos os campos (senha >=6).';
        alert.className = 'alert show';
        alert.hidden = false;
        return;
      }
      // simple storage of user (note: not secure — demo only)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if(users.some(u => u.email === email)){
        alert.textContent = 'E-mail já cadastrado.';
        alert.className = 'alert show';
        alert.hidden = false;
        return;
      }
      users.push({name,email,pass});
      localStorage.setItem('users', JSON.stringify(users));
      alert.textContent = 'Cadastro realizado com sucesso!';
      alert.className = 'alert show success';
      alert.hidden = false;
      reg.reset();
      showToast('Cadastro salvo');
    });
    $('#clearReg')?.addEventListener('click', ()=> reg.reset());
  }

  /* Login form */
  const login = document.getElementById('loginForm');
  if(login){
    login.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = $('#lemail').value.trim();
      const pass = $('#lpass').value;
      const alert = $('#loginAlert');
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.pass === pass);
      if(user){
        alert.textContent = 'Login realizado com sucesso!';
        alert.className = 'alert show success';
        alert.hidden = false;
        showToast(`Bem-vindo, ${user.name}`);
        // for demo, remain on page
      } else {
        alert.textContent = 'Email ou senha inválidos.';
        alert.className = 'alert show';
        alert.hidden = false;
      }
    });
  }

  /* Update indicators on index page if present */
  const np = document.getElementById('numParticipantes');
  const nm = document.getElementById('metasAlcancadas');
  const nr = document.getElementById('resultados');
  if(np) np.textContent = (JSON.parse(localStorage.getItem('users')||'[]')).length;
  if(nm) nm.textContent = '3'; // placeholder
  if(nr) nr.textContent = '12'; // placeholder
});

/* ---------- Modal open/close ---------- */
function openModal(p){
  const modal = document.getElementById('modal');
  if(!modal) return;
  $('#modalTitle').textContent = p.nome;
  $('#modalDesc').textContent = p.descricao || '';
  $('#modalTag').textContent = p.categoria;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
}
function closeModal(){
  const modal = document.getElementById('modal');
  if(!modal) return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
}
=======
function cadastrarUsuario() {
  const nome = document.getElementById("nomeCadastro").value;
  const email = document.getElementById("emailCadastro").value;
  const senha = document.getElementById("senhaCadastro").value;
  const msg = document.getElementById("msgCadastro");

  if (nome && email && senha) {
    const usuario = { nome, email, senha };
    localStorage.setItem(email, JSON.stringify(usuario));
    msg.innerText = "✅ Cadastro realizado com sucesso!";
    msg.classList.add("visivel");

    setTimeout(() => {
      msg.classList.remove("visivel");
    }, 2500);
  } else {
    msg.innerText = "⚠️ Preencha todos os campos!";
    msg.classList.add("visivel");
    setTimeout(() => {
      msg.classList.remove("visivel");
    }, 2500);
  }
}

// --- LOGIN ---
function fazerLogin() {
  const email = document.getElementById("emailLogin").value;
  const senha = document.getElementById("senhaLogin").value;
  const usuario = JSON.parse(localStorage.getItem(email));
  const msg = document.getElementById("msgLogin");

  if (usuario && usuario.senha === senha) {
    msg.innerText = "✅ Login realizado com sucesso!";
    msg.classList.add("visivel");

    setTimeout(() => {
      msg.classList.remove("visivel");
      window.location.href = "projeto.html"; // Redireciona após login
    }, 2500);
  } else {
    msg.innerText = "❌ Usuário ou senha incorretos!";
    msg.classList.add("visivel");

    setTimeout(() => {
      msg.classList.remove("visivel");
    }, 2500);
  }
}
let totalArrecadado = 0;
const metaCampanha = 10000; // R$ 10.000

// Função para atualizar a barra de progresso
function atualizarProgresso() {
  const barra = document.getElementById("barraProgresso");
  const porcentagem = Math.min((totalArrecadado / metaCampanha) * 100, 100);
  barra.style.width = porcentagem + "%";
  document.getElementById("porcentagemProgresso").innerText = Math.floor(porcentagem) + "%";
}

let totalArrecadado = 0;
const metaCampanha = 10000; // R$ 10.000

// Função para atualizar a barra de progresso
function atualizarProgresso() {
  const barra = document.getElementById("barraProgresso");
  const porcentagem = Math.min((totalArrecadado / metaCampanha) * 100, 100);
  barra.style.width = porcentagem + "%";
  document.getElementById("porcentagemProgresso").innerText = Math.floor(porcentagem) + "%";
}

// Evento de submissão do formulário de doação
const formDoacao = document.getElementById("formDoacao");
formDoacao.addEventListener("submit", function(e) {
  e.preventDefault();
  const valor = parseFloat(document.getElementById("valorDoacao").value);
  const msg = document.getElementById("msgDoacao");

  if (valor > 0) {
    totalArrecadado += valor;
    msg.innerText = "✅ Doação realizada com sucesso!";
    msg.classList.add("visivel");

    setTimeout(() => {
      msg.classList.remove("visivel");
    }, 2500);

    atualizarProgresso();
    formDoacao.reset();
  } else {
    msg.innerText = "⚠️ Informe um valor válido!";
    msg.classList.add("visivel");

    setTimeout(() => {
      msg.classList.remove("visivel");
    }, 2500);
  }
});

// --- Simulação de doações fictícias ---
function doacoesFicticias() {
  const doacaoFicticia = Math.floor(Math.random() * 500) + 50; // valor entre 50 e 550 R$
  totalArrecadado += doacaoFicticia;
  atualizarProgresso();
}

// Simula uma doação a cada 5 segundos
setInterval(doacoesFicticias, 5000);
>>>>>>> e6521d6a9d5d3100e68fc329f9abfdde7393de16
