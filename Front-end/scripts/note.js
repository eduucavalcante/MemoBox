const API_URL = 'http://localhost:8081';

const urlParams = new URLSearchParams(window.location.search);
const folderName = urlParams.get("name");
const noteId = urlParams.get("id");

const noteContainer = document.querySelector('.noteContainer');

async function fetchNoteDetails() {
    try {
        const response = await axios.get(`${API_URL}/${folderName}/${noteId}`);
        const note = response.data;

        const noteElement = document.createElement('div');
        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <small>${note.createdAt}</small>
            <br>
            <button>Excluir nota</button>
        `;
        noteContainer.appendChild(noteElement);
    } catch(error) {
        noteContainer.innerHTML = 'Erro ao carregar detalhes da nota';
        console.log(`Erro ao carregar nota: ${error}`);
    }
}

fetchNoteDetails();