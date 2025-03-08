const API_URL = 'http://localhost:8081';

const urlParams = new URLSearchParams(window.location.search);
const folderName = urlParams.get("folder");
const folderId = urlParams.get("folderId");

const form = document.querySelector('form');
const titleInput = document.querySelector('input');
const contentInput = document.querySelector('.editor');
const saveBtn = document.querySelector('#saveBtn');
const cancelBtn = document.querySelector('#cancel');
const dialog = document.querySelector('dialog');
document.documentElement.style.setProperty('--folder', `"na pasta ${folderName}"`);

// Token JWT
const authToken = localStorage.getItem('token');
if(!authToken) {
    window.location.href = '/index.html';
}else{
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}

saveBtn.addEventListener("click", () => {
    dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
});

async function addNote(event) {
    event.preventDefault();

    const newNote = {
        title: titleInput.value,
        content: contentInput.innerHTML
    };

    try {
        await axios.post(`${API_URL}/${folderId}`, newNote);
        window.location.href = `/folder.html?name=${folderName}&folderId=${folderId}`;
    } catch(error) {
        alert("Erro ao salvar nota.");
        console.log(`Erro ao salvar nota: ${error}`);
    }
}

form.addEventListener("submit", addNote);
