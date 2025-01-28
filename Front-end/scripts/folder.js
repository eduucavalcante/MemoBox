const API_URL = 'http://localhost:8081';

const notesContainer = document.querySelector('.notesContainer');
const h1 = document.querySelector('h1');
const newNoteBtn = document.querySelector('#newNote');

newNoteBtn.addEventListener("click", () => {
    window.location.href = `/add.html?folder=${h1.innerText}`;
});

const urlParams = new URLSearchParams(window.location.search);
const folderName = urlParams.get("name");

async function fetchNotes() {
    notesContainer.innerHTML = '';

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
                <div class="deleteDiv">
                    <button class="deleteBtn" onclick="deleteNote(${note.id})"><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/filled-trash.png" alt="filled-trash"/></button>
                </div>
                <hr>
            `;
            notesContainer.appendChild(noteElement);
        });
    } catch(error) {
        notesContainer.innerHTML = '<p>Erro ao carregar as notas...';
        console.log(`Erro ao carregar notas: ${error}`);
    }
}

async function deleteNote(id) {
    const confirmDelete = confirm("Tem certeza que quer excluir a nota?");

    if(!confirmDelete) {
        return;
    }

    try  {
        await axios.delete(`${API_URL}/${folderName}/${id}`);
        fetchNotes();
    } catch (error) {
        alert("Erro ao excluir nota.");
        console.log(`Erro ao excluir a nota: ${error}`);
    }
}

fetchNotes();