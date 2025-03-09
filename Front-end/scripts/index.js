const API_URL = "https://memobox-api.onrender.com";

const links = document.querySelectorAll('.link');
const loginForm = document.querySelector('#loginForm');
const signUpForm = document.querySelector('#signUpForm');
const p = document.querySelectorAll('.p');
const loginDialog = document.querySelector('#loginDialog');
const accountDialog = document.querySelector('#accountDialog');

const emailLogin = document.querySelector('#email-login');
const emailSign = document.querySelector('#email-sign');
const passwordLogin = document.querySelector('#password-login');
const passwordSign = document.querySelector('#password-sign');
const username = document.querySelector('#username');

links.forEach(link => {
    link.addEventListener("click", () => {
        loginForm.classList.toggle('close');
        signUpForm.classList.toggle('close');

        p.forEach((e) => {
            e.classList.toggle('close');
        })
    });
});

async function login(event) {
    event.preventDefault();
    loginDialog.showModal();

    try {
        const data = {
            email: emailLogin.value.trim(),
            password: passwordLogin.value.trim()
        };
        const response = await axios.post(`${API_URL}/login`, data);
        const authToken = response.data.auth;

        localStorage.setItem('token', authToken);
        loginDialog.close();
        window.location.href = '/home.html';
    } catch(error) {
        if(error.response && error.response.status === 400) {
            loginDialog.close();
            alert("Senha incorreta!");
            passwordLogin.value = '';
        }else if(error.response && error.response.status === 404) {
            alert("Usuário não existe!");
            loginDialog.close();
            emailLogin.value = '';
            passwordLogin.value = '';
        }else{
            alert("Erro ao autenticar. Tente novamente");
            loginDialog.close();
            console.log(`Erro ao autenticar: ${error.message}`);
        }
    }
}

async function signIn(emailInput, passwordInput) {
    accountDialog.showModal();

    try {
        const data = {
            email: emailInput,
            password: passwordInput
        };
        const response = await axios.post(`${API_URL}/login`, data);
        const authToken = response.data.auth;

        localStorage.setItem('token', authToken);
        accountDialog.close();
        window.location.href = '/home.html';
    } catch(error) {
        accountDialog.close();
        alert("Erro ao autenticar. Tente novamente");
        console.log(`Erro ao autenticar: ${error.message}`);
    }
}

async function createAccount(event) {
    event.preventDefault();

    try {
        const data = {
            username: username.value.trim(),
            email: emailSign.value.trim(),
            password: passwordSign.value.trim()
        };

        const response = await axios.post(`${API_URL}/signup`, data);
        await signIn(emailSign.value.trim(), passwordSign.value.trim());
    } catch(error) {
        if(error.response && error.response.status === 400) {
            return alert("Email já registrado, tente outro email.");
        }
        if(error.response && error.response.status === 401) {
            alert("O email deve ser válido e a senha deve conter pelo menos 6 caracteres.");
            return console.log(`Email e/ou senha inválida: ${error.message}`);
        }
        alert("Erro ao criar conta de usuário. Tente novamente");
        console.log(`Erro ao criar usuário: ${error.message}`);
    }
}

loginForm.addEventListener("submit", login);
signUpForm.addEventListener("submit", createAccount);