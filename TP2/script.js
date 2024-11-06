// Validation du nom
function validateName() {
    const name = document.getElementById("name").value;
    const nameError = document.getElementById("nameError");
    nameError.innerText = ""; // Réinitialise le message d'erreur

    if (name === "" || !/^[A-Za-z\s]+$/.test(name)) {
        nameError.innerText = "Veuillez entrer un nom valide (lettres seulement).";
        return false;
    }
    return true;
}

// Validation de l'email
function validateEmail() {
    const email = document.getElementById("email").value;
    const emailError = document.getElementById("emailError");
    emailError.innerText = ""; // Réinitialise le message d'erreur

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email === "" || !emailPattern.test(email)) {
        emailError.innerText = "Veuillez entrer une adresse email valide.";
        return false;
    }
    return true;
}

// Validation du téléphone
function validatePhone() {
    const phone = document.getElementById("phone").value;
    const phoneError = document.getElementById("phoneError");
    phoneError.innerText = ""; // Réinitialise le message d'erreur

    if (phone === "" || !/^\d{10,}$/.test(phone)) {
        phoneError.innerText = "Veuillez entrer un numéro de téléphone valide (au moins 10 chiffres).";
        return false;
    }
    return true;
}

// Validation du message
function validateMessage() {
    const message = document.getElementById("message").value ;
    const messageError = document.getElementById("messageError");
    messageError.innerText = ""; // Réinitialise le message d'erreur

    if (message === "") {
        messageError.innerText = "Veuillez entrer un message.";
        return false;
    }
    return true;
}

// Validation complète du formulaire
function validateForm() {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
        alert('Formulaire envoyé avec succès !');
        return true;
    } else {
        alert('Veuillez corriger les erreurs dans le formulaire.');
        return false;
    }
}
