class FormSubmit {
  constructor(settings) {
    // Inicializa a classe FormSubmit com as configurações passadas
    this.settings = settings;
    // Seleciona o formulário com base no seletor fornecido nas configurações
    this.form = document.querySelector(settings.form);
    // Seleciona o botão do formulário com base no seletor fornecido nas configurações
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      // Obtém a URL de envio do formulário a partir do atributo action
      this.url = this.form.getAttribute("action");
    }
    // Vincula o método sendForm ao contexto atual
    this.sendForm = this.sendForm.bind(this);
    // Inicializa a funcionalidade de alternância de visibilidade da senha
    this.initPasswordToggle();
    // Inicializa o verificador de força da senha
    this.initPasswordStrengthChecker();
  }

  // Método para exibir a mensagem de sucesso
  displaySuccess() {
    window.location.href = this.settings.successRedirect;
  }

  displayError() {
    window.location.href = this.settings.errorRedirect;
  }

  // Método para obter os dados do formulário como um objeto
  getFormObject() {
    const formObject = {};
    // Seleciona todos os campos do formulário que possuem o atributo name
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      // Adiciona cada campo ao objeto formObject com o nome do campo como chave
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  // Método para validar os campos do formulário
  validateForm() {
    const formObject = this.getFormObject();
    let isValid = true;
    let errorMessage = "";

    // Validação para o campo nome
    if (!formObject.firstName || formObject.firstName.trim() === "") {
      isValid = false;
      errorMessage += "First Name is required.\n";
    }

    // Validação para o campo sobrenome
    if (!formObject.lastName || formObject.lastName.trim() === "") {
      isValid = false;
      errorMessage += "Last Name is required.\n";
    }

    // Validação para o campo email
    if (
      !formObject.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formObject.email)
    ) {
      isValid = false;
      errorMessage += "A valid Email Address is required.\n";
    }

    // Validação para o campo senha
    if (!formObject.password || !this.isValidPassword(formObject.password)) {
      isValid = false;
      errorMessage += "Password is required and must meet the criteria.\n";
    }

    // Validação para a aceitação dos termos
    if (!this.form.querySelector('[name="terms"]').checked) {
      isValid = false;
      errorMessage += "You must accept the terms and conditions.\n";
    }

    // Exibe um alerta se houver erros de validação
    if (!isValid) {
      alert(errorMessage);
    }

    return isValid;
  }

  // Método chamado ao submeter o formulário
  onSubmission(event) {
    event.preventDefault(); // Evita o envio padrão do formulário
    event.target.disabled = true; // Desabilita o botão de envio
    event.target.innerHTML =
      '<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGo1MWEzNzJsdXRybjNoYm55aG1pcThsdnB0bDVtNWdxaWp0cnB4eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/CJFoawrEEq5P3ptexI/giphy.gif" alt="Enviando..." class="button--animation">'; // Adiciona uma animação ao botão
  }

  // Método assíncrono para enviar o formulário
  async sendForm(event) {
    event.preventDefault(); // Evita o envio padrão do formulário
    if (!this.validateForm()) {
      event.target.disabled = false; // Reabilita o botão se a validação falhar
      event.target.innerHTML = "Submit"; // Redefine o texto do botão se a validação falhar
      return; // Interrompe o envio se o formulário for inválido
    }
    try {
      this.onSubmission(event); // Chama o método onSubmission
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()), // Envia os dados do formulário como JSON
      });
      this.displaySuccess(); // Exibe a mensagem de sucesso
    } catch (error) {
      this.displayError(); // Exibe a mensagem de erro
      throw new Error(error); // Lança um erro
    }
  }

  // Inicializa a funcionalidade de alternância de visibilidade da senha
  initPasswordToggle() {
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("passwordInput");

    togglePassword.addEventListener("click", () => {
      // Alterna o tipo do campo de senha entre "password" e "text"
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      // Alterna o ícone do botão
      togglePassword.classList.toggle("fa-eye-slash");
    });
  }

  // Inicializa o verificador de força da senha
  initPasswordStrengthChecker() {
    const passwordInput = document.getElementById("passwordInput");
    const strengthIndicator = document.getElementById(
      "passwordStrengthIndicator"
    );
    const strengthText = document.getElementById("passwordStrengthText");

    passwordInput.addEventListener("input", () => {
      const password = passwordInput.value;
      const strength = this.getPasswordStrength(password);

      // Atualiza a barra de força da senha
      strengthIndicator.style.width = strength.percent + "%";
      strengthIndicator.style.backgroundColor = strength.color;
      // Atualiza o texto de força da senha
      strengthText.textContent = strength.text;
    });
  }

  // Método para determinar a força da senha
  getPasswordStrength(password) {
    let strength = { percent: 0, color: "#e70b0b", text: "Very Weak" };

    // Aumenta a força da senha com base em diferentes critérios
    if (password.length >= 8) {
      strength.percent += 20;
      strength.text = "Very Weak";
    }
    if (/[a-z]/.test(password)) {
      strength.percent += 20;
    }
    if (/[A-Z]/.test(password)) {
      strength.percent += 20;
    }
    if (/[0-9]/.test(password)) {
      strength.percent += 20;
    }
    if (/[^a-zA-Z0-9]/.test(password)) {
      strength.percent += 20;
    }

    // Define a cor e o texto de força da senha

    if (strength.percent >= 100) {
      strength.color = "#00cc00";
      strength.text = "Very Strong";
   
    } else if (strength.percent >= 80) {
      strength.color = "#ffc107";
      strength.text = "Strong";

    } else if (strength.percent >= 60) {
      strength.color = "#ff994d";
      strength.text = "Moderate";

    } else if (strength.percent >= 40) {
      strength.color = "#ff4d4d";
      strength.text = "Weak";
    
    } else {
    strength.color = "#e70b0b";
    strength.text = "Very Weak";
  }
    return strength;
  }

  // Método para verificar se a senha atende aos critérios
  isValidPassword(password) {
    return (
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^a-zA-Z0-9]/.test(password)
    );
  }

  // Inicializa o manipulador de eventos de envio do formulário
  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  successRedirect:
    "https://rafarz76dev-formulario-inscricao.netlify.app/success_page.html",
  errorRedirect:
    "https://rafarz76dev-formulario-inscricao.netlify.app/error_page.html",
});

// Inicializa a instância do formulário
formSubmit.init();
