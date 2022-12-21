const noteTitle = document.querySelector('.note-title');
const noteText = document.querySelector('.note-textarea')
const saveBtn = document.querySelector('.save-note');
const newBtn = document.querySelector('.new-note');
const noteList = document.querySelcetor('.list-container .list-gorup')

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/***';
});

// Not Really sure what this is doing
const createCard = (note) => {
    const noteE1 = document.createElement('div');
    noteE1.classList.add('card', 'mb-3', 'm-3');
    noteE1.setAttribute('key', note.note_id)
}

const noteHeaderE1 = document.createElement('div');
noteHeaderE1.classList.add(
    'card-header'
)