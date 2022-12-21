const noteTitle = document.querySelector('.note-title');
const noteText = document.querySelector('.note-textarea')
const saveBtn = document.querySelector('.save-note');
const newBtn = document.querySelector('.new-note');
const noteList = document.querySelcetor('.list-container .list-gorup')

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/***';
});


const newNote = {};

const getNote = () =>
    fetch('/api/notes', {
        method: 'GET',
        headers: {
            'Contenet-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
            console.error('Error:', error)
        })

const saveNote = (note) =>
    fetch('/api/notes', {
         method: 'POST',
         headers: {
            'Contenet-Type': 'application/json',
        },
        body: JSON.stringify(note)
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data);
            createContext(note);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

const deleteNote = () => {};