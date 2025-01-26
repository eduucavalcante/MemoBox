const API_URL = 'http://localhost:8081';

const urlParams = new URLSearchParams(window.location.search);
const folderName = urlParams.get("folder");

const form = document.querySelector('form');
const titleInput = document.querySelector('input');
const contentInput = document.querySelector('textarea');
document.documentElement.style.setProperty('--folder', `"na pasta ${folderName}"`);

async function addNote(event) {
    event.preventDefault();

    const newNote = {
        title: titleInput.value,
        content: contentInput.value
    };

    try {
        await axios.post(`${API_URL}/${folderName}`, newNote);
        window.location.href = `folder.html?name=${folderName}`;
    } catch(error) {
        alert("Erro ao salvar nota.");
        console.log(`Erro ao salvar nota: ${error}`);
    }
}

form.addEventListener("submit", addNote);
