const API_URL = 'http://localhost:8081';

const links = document.querySelectorAll('.link');
const loginForm = document.querySelector('#loginForm');
const signUpForm = document.querySelector('#signUpForm');
const p = document.querySelectorAll('.p');
const dialog = document.querySelector('dialog');

const emailLogin = document.querySelector('#email-login');
const emailSign = document.querySelector('#email-sign');
const passwordLogin = document.querySelector('#password-login');
const passwordSign = document.querySelector('#password-sign');
const username = document.querySelector('#username');

links.forEach(link => {
    link.addEventListener("click", () => {
        loginForm.classList.toggle('close');
        signUpForm.classList.toggle('close');

        p.forEach(e => {
            e.classList.toggle('close');
        })
    });
});

async function login(event) {
    event.preventDefault();
    dialog.showModal;

    try {
        const data = {
            email: emailLogin.value.trim(),
            password: passwordLogin.value.trim()
        };
        const response = await axios.post(`${API_URL}/login`, data);
        const authToken = response.data.auth;

        localStorage.setItem('token', authToken);
        window.location.href = '/home.html';
    } catch(error) {
        if(error.response && error.response.status === 400) {
            alert("Senha incorreta!");
            passwordLogin.value = '';
        }else if(error.response && error.response.status === 404) {
            alert("Usuário não existe!");
            emailLogin.value = '';
        }else{
            alert("Erro ao autenticar. Tente novamente");
            console.log(`Erro ao autenticar: ${error.message}`);
        }
    }
}

async function signIn(emailInput, passwordInput) {
    dialog.showModal();

    try {
        const data = {
            email: emailInput,
            password: passwordInput
        };
        const response = await axios.post(`${API_URL}/login`, data);
        const authToken = response.data.auth;

        localStorage.setItem('token', authToken);
        window.location.href = '/home.html';
    } catch(error) {
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
        alert("Erro ao criar conta de usuário. Tente novamente");
        console.log(`Erro ao criar usuário: ${error.message}`);
    }
}

loginForm.addEventListener("submit", login);
signUpForm.addEventListener("submit", createAccount);