const links = document.querySelectorAll('.link');
const loginForm = document.querySelector('#loginForm');
const signUpForm = document.querySelector('#signUpForm');
const p = document.querySelectorAll('.p');
const h1 = document.querySelector('h1');

links.forEach(link => {
    link.addEventListener("click", () => {
        loginForm.classList.toggle('close');
        signUpForm.classList.toggle('close');

        p.forEach(e => {
            e.classList.toggle('close');
        })
    });
});

h1.addEventListener("click", () => {
    window.location.href = 'home.html';
});