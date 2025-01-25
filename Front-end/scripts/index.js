const API_URL = 'http://localhost:8081';

const folderContainer = document.querySelector('.folders');
const newButton = document.querySelector('#new');
const form = document.querySelector('form');
const folderInput = document.querySelector('#nameInput')

newButton.addEventListener("click", () => {
    form.classList.toggle('open');
})

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
                <p>${folder.name}</p>
                <hr>
            `;
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
    form.classList.remove('open');
}

form.addEventListener('submit', addFolder);

fetchFolders();