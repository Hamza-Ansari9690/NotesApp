const addBtn = document.getElementById('add');
const DelBtn = document.getElementById('DelNotes');

const notes = JSON.parse(localStorage.getItem('notes'));



if (notes) {
    notes.forEach(note => addNewNote(note));

}

addBtn.addEventListener('click', () => {
    document.getElementById('tone').play();
    addNewNote()
});
function addNewNote(text = '') {
    // const NOTES = document.getElementsByClassName('NOTES')
    let date = new Date();
    let c = document.getElementsByClassName('notes');
    const note = document.createElement('div');
    note.classList.add('notes');

    note.innerHTML = `
    <div class="tools">
    <h4 class="h4"> Write Your Notes Here</h4>
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
</div>

<div class="dateTime">
 Note:- ${c.length + 1}
<div class="date"> Date:- ${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}    </div>
<div class="time"> Time:- ${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}    </div>
</div>
<div class="main ${text ? "" : "hidden"}"></div>
<textarea class="${text ? "hidden" : " "}"></textarea>
    `
    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')
    textArea.value = text;
    main.innerHTML = marked(text);
    deleteBtn.addEventListener('click', () => {
        document.getElementById('tone1').play();
        note.remove();
        updateLS();


    })
    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden')

    })
    textArea.addEventListener('input', (e) => {

        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLS();
    })
    document.body.appendChild(note);

}

DelBtn.addEventListener('click', () => deleteAllnotes())
function deleteAllnotes() {
    const n = document.querySelectorAll('.notes');
    n.forEach(note => note.remove());
    localStorage.setItem('notes', '[]');
}
function updateLS() {
    const notesText = document.querySelectorAll('textarea');
    const notes = [];
    notesText.forEach(note => notes.push(note.value));
    localStorage.setItem('notes', JSON.stringify(notes))
}




function updateClock() {
    var now = new Date();
    dname = now.getDay();
    mon = now.getMonth();
    dnum = now.getDate();
    yr = now.getFullYear();
    hours = now.getHours();
    min = now.getMinutes();
    sec = now.getSeconds();
    pe = "AM";

    if (hours >= 12) {
        pe = "PM";
    }
    if (hours == 0) {
        hou = 12;
    }
    if (hours > 12) {
        hou = hou - 12;
    }

    Number.prototype.pad = function (digits) {
        for (var n = this.toString(); n.length < digits; n = 0 + n);
        return n;
    }

    var months = ["January", "February", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"];
    var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ids = ["dayname", "month", "daynum", "year", "hours", "min", "seconds", "period"];
    var values = [week[dname], months[mon], dnum.pad(2), yr, hours.pad(2), min.pad(2), sec.pad(2), pe];
    for (var i = 0; i < ids.length; i++)
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}

function initClock() {
    updateClock();
    window.setInterval("updateClock()", 1);
}