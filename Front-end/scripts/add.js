const urlParams = new URLSearchParams(window.location.search);
const folderName = urlParams.get("folder");

const h1 = document.querySelector('h1');

h1.innerText = folderName;