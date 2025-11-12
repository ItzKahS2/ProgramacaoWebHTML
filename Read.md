# ProgramacaoWebHTML — ONG Educar

## Descrição do Projeto
O projeto **ONG Educar** é uma aplicação web focada em educação e inclusão social. Ele possui páginas de cadastro/login, visualização de projetos, informações institucionais e indicadores da ONG. O sistema é responsivo, acessível e segue um **design system consistente**.

---

## Estrutura do Projeto

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | Página inicial com hero, missão, valores e indicadores. |
| `projeto.html` | Página de projetos com grid responsivo, filtros e cards de projetos. |
| `cadastro.html` | Página de cadastro e login com validação de formulário e feedback visual. |
| `estilo.css` | Folha de estilos global com design system, grid responsivo, cores, tipografia, botões, modais, alerts e toast. |
| `script.js` | Lógica de cadastro, login, validação de formulários, toast notifications, menu toggle e saudação dinâmica. |

---

## Funcionalidades Principais

- **Cadastro e Login**
  - Armazenamento local de usuários via `localStorage`.
  - Validação de campos com **verificação de consistência de dados**.
  - Feedback visual com alertas e toast notifications.
  - Redirecionamento automático após login/cadastro.

- **Interface Responsiva**
  - Grid de 12 colunas adaptável.
  - Hero, cards e menus responsivos para desktop, tablet e mobile.
  - Menu toggle para navegação em dispositivos móveis.

- **Acessibilidade**
  - Navegação por teclado suportada.
  - Estrutura semântica com headings, sections e labels.
  - Contraste de cores adequado para legibilidade.
  - Alertas e toast com roles e aria-live para leitores de tela.
  - Suporte a modo escuro.

- **Design System**
  - 8 cores principais (primárias, secundárias, status e neutras).
  - Tipografia modular (`fs-xxl` a `fs-sm`).
  - Espaçamento modular (`s-1` a `s-6`).
  - Transições e efeitos consistentes para botões, hover e modais.

- **Otimização para Produção**
  - Código estruturado e modular.
  - Preparado para minificação e compressão de imagens.

---

## Tecnologias Utilizadas

- HTML5 semântico
- CSS3 com Grid, Flexbox e variáveis customizadas
- JavaScript ES6+
- Armazenamento local (`localStorage`)
- Git / GitHub para controle de versão

---

## Instruções de Uso

1. Clone o repositório:

```bash
git clone https://github.com/ItzKahS2/ProgramacaoWebHTML.git
