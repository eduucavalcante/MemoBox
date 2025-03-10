const API_URL = "https://memobox-api.onrender.com";

const notesContainer = document.querySelector('.notesContainer');
const h1 = document.querySelector('h1');
const newNoteBtn = document.querySelector('#newNote');
const delFolderBtn = document.querySelector("#deleteFolder");
const menuBtn = document.querySelector('#menu');
const nav = document.querySelector('nav');
const logoutButton = document.querySelector('#logout');

const urlParams = new URLSearchParams(window.location.search);
const folderName = urlParams.get("name");
const folderId = urlParams.get("folderId");

// Token JWT
const authToken = localStorage.getItem('token');
if(!authToken) {
    window.location.href = '/index.html';
}else{
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}

async function fetchNotes() {
    notesContainer.innerHTML = '';

    h1.innerText = folderName;

    try {
        const response = await axios.get(`${API_URL}/${folderId}`);
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
        await axios.delete(`${API_URL}/${folderId}/${id}`);
        fetchNotes();
    } catch (error) {
        alert("Erro ao excluir nota.");
        console.log(`Erro ao excluir a nota: ${error}`);
    }
}

async function deleteFolder(id) {
    const confirmDelete = confirm("Tem certeza que quer excluir a pasta?");

    if(!confirmDelete) {
        return;
    }

    try {
        await axios.delete(`${API_URL}/${id}`);
        window.location.href = "/home.html";
    } catch(error) {
        alert("Erro ao excluir pasta.");
        console.log(`Erro ao excluir pasta: ${error}`);
    }
}

newNoteBtn.addEventListener("click", () => {
    window.location.href = `/add.html?folder=${folderName}&folderId=${folderId}`;
});

delFolderBtn.addEventListener("click", () => {
    deleteFolder(folderId);
});

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle('open');
    nav.classList.toggle('open');
});

logoutButton.addEventListener("click", () => {
    localStorage.removeItem('token');
    window.location.href = '/index.html';
});

fetchNotes();