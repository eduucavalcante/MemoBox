const API_URL = 'http://localhost:8081';

const notesContainer = document.querySelector('.notesContainer');

async function fetchNotes() {
    notesContainer.innerHTML = '';

    const urlParams = new URLSearchParams(window.location.search);
    const folderName = urlParams.get("name");

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
                <p>${note.title}</p>
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