# Formulário/Inscrição-Tutorial!!

<br>

 <div align="center">
<img src="https://media.giphy.com/media/9TFBxN300KpCUI6sBD/giphy.gif" align="center" height="45" width="45">

[ ( Clique aqui e se inscreva para mais dicas ao: `Formulário de Inscrição!!`) ](https://rafarz76dev-formulario-inscricao.netlify.app/)

<br>

<div align="center">
  
<img src= "https://media.giphy.com/media/3zSF3Gnr7cxMbi6WoP/giphy.gif" align="center" height="55" width="55"> [Demonstração-Formulário/Inscrição-Tutorial] <img src= "https://media.giphy.com/media/E5DzZsofmgxc9wjbhX/giphy.gif" align="center" height="35" width="35">

<img height="480em" src="./assets/images/git-readme.gif"  align="center">

---

<div align="left">

### 📌 Objetivos:

- Este projeto não é apenas um formulário de inscrição comum. Ele representa um marco da minha jornada técnica, onde convergem habilidades e visão. Por trás da simplicidade de preenchimento de dados, reside a complexidade sutil de implementações meticulosas. Utilizando a metodologia BEM como uma ferramenta de precisão, eu não apenas desenvolvo código, mas esculpo uma experiência fluida e eficiente. Este formulário não é apenas uma interface, é uma expressão tangível da minha dedicação à excelência técnica e à arte de simplificar o complexo.

<br/>

- O layout responsivo assegura que o verificador funcione bem em dispositivos móveis.

<br/>

- A funcionalidade em JavaScript garante que o usuário preencha todos os campos, exibindo mensagens de erro caso contrário. Além disso, a visibilidade da senha e a verificação de sua força foram integradas e documentadas, proporcionando uma experiência de usuário aprimorada.

<br/>

---

### 📌 Estrutura do Projeto:

Adotei uma estrutura padrão de Arquitetura/Organização de Pastas para gerenciar os arquivos de forma eficiente. Utilizando HTML, CSS e JavaScript, implementei esta solução, consolidando meus conhecimentos e me preparando para desafios futuros com confiança.

```
Formulário de Inscrição-Tutorial/
│
├── .vscode/
│   └── settings.json
│
├── assets/
│   ├── images/
│   │   ├── bg-intro-desktop.png
│   │   ├── bg-intro-mobile.png
│   │   ├── icon-error.svg
│   │
│   └── css/
│   │   ├── styles.css
│   │   └── terms.css
│   │
│   └── js/
│       └── script.js
│
├── index.html
│
├── terms.html
│
└── README.md
```

---

### 📌 Aqui está uma pequena documentação do Projeto: Conceitos Aplicados👇

▪ `HTML(index)`: Este código implementa um formulário de inscrição em um tutorial, incorporando o conceito de aprendizado observacional. A introdução destaca a eficácia de aprender a programar ao observar programadores experientes em ação.

🚀Copy code

```
<div class="leftpage">
      <h1 class="page__header">
        <span class="page__text">Aprenda a programar!!</span>
        <br /><br />
        <span class="page__span">"Observando os outros."</span>
      </h1>
    </div>
```

```
    <div class="rightpage">
      <form class="form form--subscription">
        <div class="form__password-container">
            <div class="form__input-wrapper">
              <img src="./images/icon-error.svg" class="form__error" />
              <input id="passwordInput" type="password" placeholder="Password" class="form__input" />
              <i id="togglePassword" class="fas fa-eye form__toggle-password"></i>
            </div>
        </form>
```

▪ `CSS`: O conceito aplicado nesta estrutura é o uso de variáveis CSS para definir cores principais e auxiliares, permitindo uma fácil personalização e manutenção do esquema de cores em todo o documento.

🚀Copy code

```
:root {
  --Red: hsl(0, 100%, 74%);
  --Green: hsl(154, 59%, 51%);
  --Blue: hsl(248, 32%, 49%);
  --DarkBlue: hsl(249, 10%, 26%);
  --GrayishBlue: hsl(246, 25%, 77%);
}
```

```
.page__text {
  text-decoration: underline;
  text-decoration-color: #333; /* Apply underline only to this span */
  font-weight: bold;
}

.page__span {
  font-size: 28px;
  color: rgb(147, 249, 92);
  font-weight: bold;
  letter-spacing: normal;
  text-decoration: none; /* Ensure no underline is applied */
  font-style: italic;
}
```

```
.form__password-container {
  position: relative;
}

.form__input-wrapper {
  position: relative;
}

.form__toggle-password {
  position: absolute;
  top: 65%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #333;
}

.form__toggle-password.fa-eye-slash {
  right: 30px; /* Ajuste conforme necessário para manter a posição quando a senha estiver visível */
}
```

▪ `JavaScript`: Implementa a validação de formulário com dados inseridos pelos usuários antes do envio.

1. Suas Funcionalidades Principais:

- Validação de campos obrigatórios.
- Verificação de formato de e-mail.
- Verificação da força da senha.
- Confirmação de aceitação dos termos e condições. e verificar a força de suas senhas em tempo real, recebendo classificações como Muito Fraca, Fraca, Moderada, Forte ou Muito Forte.

2. Regras para a classificação das senhas incluem:

- Letras minúsculas;
- Letras maiúsculas;
- Números;
- Caracteres especiais.

🚀Copy code

```
// Define uma array de mensagens de erro para cada campo
const errormessages = [
  "First name cannot be empty",
  "Last name cannot be empty",
  "Looks like this is not an email",
  "Password cannot be empty",
  "Interesses Específicos cannot be empty", // Esta mensagem de erro é para o campo de "Interesses Específicos"
];
```

```
// Função para validar um endereço de e-mail
const isValidEmail = (email) => {
  const atLocation = email.indexOf("@");
  if (atLocation > 0) {
    const domain = email.substring(atLocation + 1);
    if (domain.indexOf(".") > 0 && domain.indexOf(".") < domain.length - 1) {
      return true;
    }
  }
  return false;
};
```

```
// Função para alternar a visibilidade da senha
 togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.classList.remove("fa-eye");
   togglePassword.classList.add("fa-eye-slash");
   } else {
    passwordInput.type = "password";
    togglePassword.classList.remove("fa-eye-slash");
    togglePassword.classList.add("fa-eye");
   }
 });
```

```
// Verifica se o checkbox de aceitação dos termos foi marcado
  const termsCheckbox = document.querySelector('input[name="terms"]');
  if (!termsCheckbox.checked) { // Verifica se o checkbox não está marcado
    alert("Por favor, aceite os termos e condições.");
    allcorrect = false;
  }
```

---

## Tecnologias

<img src="https://media.giphy.com/media/iT138SodaACo9LImgi/giphy.gif" align="center" height="75" width="75"> Tecnologias utilizadas no projeto:

- HTML5 (Linguagem de marcação utilizada para a construção das páginas web).

- CSS3 (Mecanismo para adicionar estilos a uma página web).

- JavaScript (Linguagem de programação de alto nível, que pode ser interpretada ou compilada just-in-time (JIT) para execução em um ambiente específico).

- Git (Sistema de controle de versões).

- Github (Plataforma para hospedagem de código-fonte).

- Visual Studio Code (Editor de código-fonte).

- Navegador web (Interação com documentos HTML).

---

<img src="https://media.giphy.com/media/SS8CV2rQdlYNLtBCiF/giphy.gif" align="center" height="35" width="45"> Ferramenta utilizada no projeto:

- [VsCode](https://code.visualstudio.com/download) (v1.80.1)

---

## Licença

- Esse projeto está sob a licença MIT.

---

<img src="https://media.giphy.com/media/ImmvDZ2c9xPR8gDvHV/giphy.gif" align="center" height="25" width="25"> Autor

<p>
    <img align=left margin=10 width=80 src="https://avatars.githubusercontent.com/u/87991807?v=4"/>
    <p>&nbsp&nbsp&nbspRafaRz76Dev<br>
    &nbsp&nbsp&nbsp<a href="https://api.whatsapp.com/send/?phone=47999327137">Whatsapp</a>&nbsp;|&nbsp;<a href="https://www.linkedin.com/in/rafael-raizer//">LinkedIn</a>&nbsp;|&nbsp;<a href="https://github.com/RafaRz76Dev">GitHub</a>|&nbsp;<a href="https://public.tableau.com/app/profile/rafael.raizer">Tableau</a>|&nbsp;<a href="https://portifolio-rafarz76dev.netlify.app/">Portfólio</a>&nbsp;</p>
</p>
