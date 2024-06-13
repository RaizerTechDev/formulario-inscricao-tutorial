// Define uma array de mensagens de erro para cada campo
const errormessages = [
  "First name cannot be empty",
  "Last name cannot be empty",
  "Looks like this is not an email",
  "Password cannot be empty",
  "Interesses Específicos cannot be empty", // Esta mensagem de erro é para o campo de "Interesses Específicos"
];
// inputs
// Seleciona todos os campos de entrada pelo nome da classe CSS
const inputs = document.getElementsByClassName("form__input");
// Seleciona todos os elementos com a classe "error" (usada para exibir os ícones de erro)
const errorSigns = document.getElementsByClassName("form__error");
// Seleciona o botão de envio do formulário pelo ID
const subscribingbutton = document.getElementById("button");
//Seleciona o campo de entrada de senha e o ícone de alternância
const togglePassword = document.getElementById("togglePassword");
const passwordStrengthIndicator = document.getElementById(
  "passwordStrengthIndicator"
);
const passwordStrengthText = document.getElementById("passwordStrengthText");
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
// Função para remover a marca de erro e mensagem de erro associada a um campo específico
const removeError = (index) => {
  errorSigns[index].classList.remove("form__errorshow");
  if (inputs[index].nextSibling?.nodeName == "P") {
    console.log("removing error");
    inputs[index].nextSibling?.remove();
  }

  if (inputs[index].nextSibling?.nodeName == "P") {
    console.log("removing error");
    inputs[index].nextSibling?.remove();
  }
};
// Função para adicionar a marca de erro e mensagem de erro associada a um campo específico
const addError = (index) => {
  errorSigns[index].classList.add("form__errorshow");

  if (inputs[index].nextSibling?.nodeName != "P") {
    const pItem = document.createElement("p");
    pItem.innerHTML = errormessages[index];
    pItem.classList.add("form__errormessage");
    // Insira a mensagem de erro após o campo de senha
    inputs[index].insertAdjacentElement("afterend", pItem);
  }
};
// Função para verificar a força da senha
const checkPasswordStrength = (password) => {
  const strength = {
    0: "Very weak", // Muito Fraca
    1: "Weak", // Fraca
    2: "Moderate", // Moderada
    3: "Strong", // Forte
    4: "Very strong", // Muito Forte
  };

  const colors = {
    0: "#e70b0b", // Vermelho
    1: "#ff4d4d", // Vermelho Claro
    2: "#ff994d", // Laranja
    3: "#ffc107", // Amarelo
    4: "#00cc00", // Verde
  };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  passwordStrengthIndicator.style.width = score * 25 + "%";
  passwordStrengthIndicator.style.backgroundColor = colors[score];
  passwordStrengthText.innerText = strength[score];
};
passwordInput.addEventListener("input", (event) => {
  checkPasswordStrength(event.target.value);
});
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
// Adiciona um ouvinte de evento de clique ao botão de envio do formulário
subscribingbutton?.addEventListener("click", () => {
  const information = []; // Array para armazenar as informações do formulário
  let allcorrect = true; // Variável para verificar se todos os campos estão corretos

  // Loop pelos campos de entrada do formulário
  for (let i = 0; i < inputs.length; i++) {
    if (i == 2 && isValidEmail(inputs[i].value)) {
      // Verifica se é o campo de e-mail e se é um e-mail válido
      information[i] = inputs[i].value;
      removeError(i);
    } else if (inputs[i].value && i != 2) {
      // Verifica se o campo não está vazio (exceto para o campo de e-mail)
      removeError(i);
      information[i] = inputs[i].value;
    } else if (i == 4 && inputs[i].value.trim() === "") {
      // Verifica se o campo de "Interesses Específicos" está vazio
      addError(i);
      allcorrect = false;
    } else if (i == 4 && inputs[i].value.trim() !== "") {
      // Verifica se o campo de "Interesses Específicos" não está vazio
      removeError(i);
      information[i] = inputs[i].value;
    } else {
      addError(i);
      allcorrect = false;
    }
  }

  // Verifica se o checkbox de aceitação dos termos foi marcado
  const termsCheckbox = document.querySelector('input[name="terms"]');
  if (!termsCheckbox.checked) {
    // Verifica se o checkbox não está marcado
    alert("Por favor, aceite os termos e condições.");
    allcorrect = false;
  }

  // Se todos os campos estiverem corretos, exibe um alerta de agradecimento e limpa os campos do formulário
  if (allcorrect) {
    alert(
      `Obrigado ${information[0]} ${information[1]} por se inscrever. Mais informações serão enviadas para ${information[2]}`
    );
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  }
});
async;
sendForm(event);
{
  event.preventDefault();
  if (!this.validateForm()) {
    event.target.disabled = false; // Reabilita o botão se a validação falhar
    event.target.innerHTML = "SEND MESSAGE"; // Redefine o texto do botão se a validação falhar
    return; // Interrompe o envio se o formulário for inválido
  }
  try {
    this.onSubmission(event);
    await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.getFormObject()),
    });
    this.displaySuccess();
  } catch (error) {
    this.displayError();
    throw new Error(error);
  }
}
