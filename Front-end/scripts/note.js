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
            <div class="note-header"><h2>${note.title}</h2>
            <button id="options"><img width="30" height="30" src="https://img.icons8.com/ios-filled/50/menu-2.png" alt="menu-2"/></button></div>
            <hr>
            <p>${note.content}</p>
            <small>${note.createdAt}</small>
            <br>
        `;
        noteContainer.appendChild(noteElement);
    } catch(error) {
        noteContainer.innerHTML = 'Erro ao carregar detalhes da nota';
        console.log(`Erro ao carregar nota: ${error}`);
    }
}

async function deleteNote(id) {
    const confirmDelete = confirm("Tem certeza que quer excluir a nota?");

    if(!confirmDelete) {
        return;
    }

    try  {
        await axios.delete(`${API_URL}/${folderName}/${id}`);
        window.location.href = `/folder.html?name=${folderName}`;
    } catch (error) {
        alert("Erro ao excluir nota.");
        console.log(`Erro ao excluir a nota: ${error}`);
    }
}

async function menu() {
    await fetchNoteDetails();
    const optionBtn = document.querySelector('#options');
    const menu = document.querySelector("dialog");
    const deleteBtn = document.querySelector('#delete');

    optionBtn.addEventListener("click", () => {
        menu.showModal();
    });

    menu.addEventListener("click", (e) => {
        if (e.target === menu) {
            menu.close();
        }
    });

    deleteBtn.addEventListener("click", () => {
        deleteNote(noteId);
        menu.close();
    });
}

menu();