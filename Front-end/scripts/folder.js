const API_URL = 'http://localhost:8081';

const notesContainer = document.querySelector('.notesContainer');
const h1 = document.querySelector('h1');
const newNoteBtn = document.querySelector('#newNote');

newNoteBtn.addEventListener("click", () => {
    window.location.href = `/add.html?folder=${h1.innerText}`;
});

async function fetchNotes() {
    notesContainer.innerHTML = '';

    const urlParams = new URLSearchParams(window.location.search);
    const folderName = urlParams.get("name");

    h1.innerText = folderName;

    try {
        const response = await axios.get(`${API_URL}/${folderName}`);
        const notes = response.data;

        if(notes.isEmpty) {
            notesContainer.innerHTML = "<p>Ainda não há notas. Clique em + para adicionar uma.</p>";
            return;
        }

        notes.forEach(note => {
            const noteElement = document.createElement("div");
            noteElement.innerHTML = `
                <a href="/note.html?name=${folderName}&id=${note.id}">${note.title}</a>
                <hr>
            `;
            notesContainer.appendChild(noteElement);
        });
    } catch(error) {
        notesContainer.innerHTML = '<p>Erro ao carregar as notas...';
        console.log(`Erro ao carregar notas: ${error}`);
    }
}

fetchNotes();