document.addEventListener("DOMContentLoaded", function () {
  // Inicializa o verificador de força da senha
  const passwordInput = document.getElementById("passwordInput");
  const togglePassword = document.getElementById("togglePassword");
  const passwordStrengthText = document.getElementById("passwordStrengthText");
  const passwordStrengthIndicator = document.getElementById("passwordStrengthIndicator");
  const form = document.querySelector(".form--subscription");
  const submitButton = document.querySelector(".formButton");

  // Função para alternar a visibilidade da senha
  togglePassword.addEventListener("click", function () {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.classList.toggle("fa-eye-slash");
  });

  // Função de cálculo da força da senha
  function checkPasswordStrength(password) {
    let strength = 0;
    const regexWeak = /(?=.{6,})/; // mínimo de 6 caracteres
    const regexMedium = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/; // deve conter números, letras maiúsculas e minúsculas
    const regexStrong = /(?=.*[!@#$%^&*])/; // deve conter caracteres especiais

    if (regexWeak.test(password)) strength++;
    if (regexMedium.test(password)) strength++;
    if (regexStrong.test(password)) strength++;

    return strength;
  }

  // Atualiza o texto de força da senha
  passwordInput.addEventListener("input", function () {
    const password = passwordInput.value;
    const strength = checkPasswordStrength(password);
    let strengthText = '';
    passwordStrengthIndicator.style.width = '0%';

    switch (strength) {
      case 0:
      case 1:
        strengthText = "Fraca";
        passwordStrengthIndicator.style.backgroundColor = 'red';
        passwordStrengthIndicator.style.width = '33%';
        break;
      case 2:
        strengthText = "Média";
        passwordStrengthIndicator.style.backgroundColor = 'yellow';
        passwordStrengthIndicator.style.width = '66%';
        break;
      case 3:
        strengthText = "Forte";
        passwordStrengthIndicator.style.backgroundColor = 'green';
        passwordStrengthIndicator.style.width = '100%';
        break;
    }

    passwordStrengthText.textContent = strengthText;
  });

  // Função que remove a imagem de carregamento e retorna o texto original
  function hideLoading() {
    const loadingImage = document.querySelector(".footer__button--animation");
    if (loadingImage) {
      loadingImage.remove();
    }
    submitButton.style.display = 'inline-block';
  }

  // Redirecionar para WhatsApp com os dados do formulário
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Adiciona o GIF de carregamento
    submitButton.style.display = 'none';
    const loadingImage = document.createElement('img');
    loadingImage.className = 'footer__button--animation';
    loadingImage.src = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWI0azVpZzY1YzJqMDlxNjFlZHNhNmE0aGQ3dnhic2h4eGY2dmdhdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bu3XilJ5BOiSGic/giphy.gif';
    loadingImage.alt = "Loading";
    submitButton.parentNode.insertBefore(loadingImage, submitButton.nextSibling);

    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const interests = form.interests.value;

    const whatsappUrl = `https://wa.me/5547999327137?text=Olá, estou retornando o Formulário-Tutorial: \n Meu Nome é: ${firstName} ${lastName} \n Meu E-mail: ${email } \n Meu interesse é na Área: ${interests}.`;

    // Redireciona para o WhatsApp
    window.open(whatsappUrl, '_blank');

    // Simula um tempo de espera antes de esconder a imagem de carregamento
    setTimeout(hideLoading, 2000);
  });
});