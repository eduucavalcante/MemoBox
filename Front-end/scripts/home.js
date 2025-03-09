const API_URL = process.env.API_URL;

const folderContainer = document.querySelector('.foldersContainer');
const newButton = document.querySelector('#new');
const cancelButton = document.querySelector('#cancel');
const form = document.querySelector('form');
const formDialog = document.querySelector('dialog');
const folderInput = document.querySelector('#nameInput')
const menuBtn = document.querySelector('#menu');
const nav = document.querySelector('nav');
const logoutButton = document.querySelector('#logout');

// Token JWT
const authToken = localStorage.getItem('token');
if(!authToken) {
    window.location.href = '/index.html';
}else{
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}

newButton.addEventListener("click", () => {
    formDialog.showModal();
});

cancelButton.addEventListener("click", () => {
    formDialog.close();
});

logoutButton.addEventListener("click", () => {
    localStorage.removeItem('token');
    window.location.href = '/index.html';
});

async function fetchFolders() {
    folderContainer.innerHTML = '';

    try {
        const response = await axios.get(`${API_URL}/`);
        const folders = response.data;

        if(folders.isEmpty) {
            folderContainer.innerHTML = "<p>Ainda não há pastas.</p>";
            return;
        }

        folders.forEach(folder => {
            const folderElement = document.createElement("div");
            folderElement.innerHTML = `
                <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FAB005/opened-folder.png" alt="opened-folder"/>
                <p>${folder.name}</p>
            `;
            folderElement.classList.add("folder");
            folderElement.addEventListener("click", () => {
                window.location.href = `/folder.html?name=${folder.name}&folderId=${folder.id}`;
            })
            folderContainer.appendChild(folderElement);
        });
    } catch(error) {
        folderContainer.innerHTML = '<p>Erro ao carregar as pastas...';
        console.log(`Erro ao carregar pastas: ${error}`);
    }
}

async function addFolder(event) {
    event.preventDefault();
    
    const newFolder = {
        name: folderInput.value.trim()
    };

    try {
        await axios.post(`${API_URL}/`, newFolder);
        fetchFolders();
    } catch(error) {
        alert("Erro ao criar pasta.");
        console.log(`Erro ao criar pasta: ${error}`);
    }

    folderInput.value = '';
    formDialog.close();
}

form.addEventListener('submit', addFolder);

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle('open');
    nav.classList.toggle('open');
});

window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        newButton.textContent = '+';
    } else {
        newButton.textContent = 'Nova pasta';
    }
});

if (window.innerWidth <= 768) {
    newButton.textContent = '+';
}

fetchFolders();