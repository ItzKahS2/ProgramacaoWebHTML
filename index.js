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