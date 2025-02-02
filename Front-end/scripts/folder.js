const API_URL = 'http://localhost:8081';

const notesContainer = document.querySelector('.notesContainer');
const h1 = document.querySelector('h1');
const newNoteBtn = document.querySelector('#newNote');
const delFolderBtn = document.querySelector("#deleteFolder");

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
                <p>${note.title}</p>
                <div class="deleteDiv">
                    <button class="deleteBtn" onclick="deleteNote(${note.id})"><img width="28" height="28" src="https://img.icons8.com/ios-glyphs/30/filled-trash.png" alt="filled-trash"/></button>
                </div>
            `;
            noteElement.classList.add('note');
            noteElement.addEventListener("click", () => {
                window.location.href = `/note.html?name=${folderName}&id=${note.id}`;
            })
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

async function deleteFolder(name) {
    const confirmDelete = confirm("Tem certeza que quer excluir a pasta?");

    if(!confirmDelete) {
        return;
    }

    try {
        await axios.delete(`${API_URL}/${name}`);
        window.location.href = "/index.html";
    } catch(error) {
        alert("Erro ao excluir pasta.");
        console.log(`Erro ao excluir pasta: ${error}`);
    }
}

newNoteBtn.addEventListener("click", () => {
    window.location.href = `/add.html?folder=${h1.innerText}`;
});

delFolderBtn.addEventListener("click", () => {
    deleteFolder(folderName);
});

fetchNotes();