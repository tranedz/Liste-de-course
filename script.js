const form = document.querySelector('#main-form');
const styleForm = document.querySelector('#style-form');
const input = document.querySelector('#input-text');
const ul = document.querySelector('ul');

// KEEP FOCUS ON FIELD
input.focus();

const clearBtn = document.querySelector('#clear-btn');

// ASSIGN ARRAY TO LOCAL STORAGE
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));

// ARRAY FOR DATE
const data = JSON.parse(localStorage.getItem('items'));

// console.log(itemsArray);
// console.log(data);

// STYLE APPAREANCE
let arrayColors = localStorage.getItem('colors') ? JSON.parse(localStorage.getItem('colors')) : [];
localStorage.setItem('colors', JSON.stringify(arrayColors));

// CREATE NEW ITEM
function createItem(text) {

    const item = document.createElement('li');

    const editBtn = createEditBtn();

    // CREATE CHILD EDIT BUTTON
    function createEditBtn() {
        // <span class="material-symbols-outlined edit-btn">edit</span>
        const editBtn = document.createElement('span');
        editBtn.setAttribute('class', 'material-symbols-outlined edit-btn');
        editBtn.appendChild(document.createTextNode('edit'));
        return editBtn;
    };

    // CREATE CHILD SPAN TEXT CONTENT
    // <span class="item-name li-checked">Acheter des fruits</span>
    const itemName = document.createElement('span');
    itemName.setAttribute('class', 'item-name');
    itemName.textContent = text;

    // CREATE INPUT'S ITEM FOR UPDATING SPAN TEXT CONTENT
    const itemInput = document.createElement('input');
    itemInput.setAttribute('type', 'text');
    itemInput.className = 'item-input';
    itemInput.classList.add('invisible');
    itemInput.value = itemName.textContent;

    // CREATE EDIT OFF BUTTON
    const closeEditBtn = createCloseEditBtn();
    function createCloseEditBtn() {
        // < span class="material-symbols-outlined invisible" >edit_off</span >
        const closeEditBtn = document.createElement('span');
        closeEditBtn.setAttribute('class', 'material-symbols-outlined close-edit-btn');
        closeEditBtn.appendChild(document.createTextNode('edit_off'));
        closeEditBtn.style.display = 'none';
        return closeEditBtn;
    };

    // EVENT FOR EDIT OFF BUTTON
    // DISPLAY INPUT'S ITEM
    editBtn.addEventListener('click', displayItemInput);
    function displayItemInput(e) {
        // Faire disparaître le bouton d'édition et faire apparaître close edition
        e.target.style.display = 'none';
        closeEditBtn.style.display = 'block';
        // Faire disparaître le span contenant le nom de l'article
        itemName.classList.add('invisible');
        // Faire apparaître l'input pour l'édition de l'article
        itemInput.classList.remove('invisible');
        itemInput.focus();
    };

    // CREATE CLOSE BUTTON WHO DELETE ITEM
    // <span class="material-symbols-outlined close-btn">close</span>
    const closeBtn = document.createElement('span');
    closeBtn.setAttribute('class', 'material-symbols-outlined close-btn');
    closeBtn.appendChild(document.createTextNode('close'));

    // EVENT FOR CLOSE EDIT BUTTON
    // GETTING THE NEW VALUE FOR SPAN TEXT CONTENT
    closeEditBtn.addEventListener('click', closeItemInput);
    function closeItemInput(e) {
        e.target.style.display = 'none';
        editBtn.style.display = 'block';
        itemName.classList.remove('invisible');
        itemInput.classList.add('invisible');

        let newValue = itemInput.value;

        // UPDATE LOCAL STORAGE ELEMENT
        updateOnStorage(itemName.textContent, newValue);

        itemName.textContent = newValue;
        // console.log('New value :', newValue);
    }

    // APPEN CHILD ITEM AND PARENT UL
    item.appendChild(editBtn);
    item.appendChild(closeEditBtn);
    item.appendChild(itemName);
    item.appendChild(itemInput);

    // INSERT THE NEW ITEM ON TOP
    item.insertBefore(itemInput, itemName);

    item.appendChild(closeBtn);

    ul.appendChild(item);
    ul.insertBefore(item, ul.firstElementChild);

    // VALIDATE ITEM
    item.addEventListener('click', (e) => {
        if (e.target.classList.contains('item-name')) {
            return e.target.classList.toggle('li-checked');
        };
    });
    return item;
};

// SUBMIT VALUE
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let inputValue = input.value;

    // ADD SPAN TEXT CONTENT TO AN ARRAY
    itemsArray.push(inputValue);

    // ADD SPAN TEXT CONTENT TO LOCAL STORAGE
    localStorage.setItem('items', JSON.stringify(itemsArray));

    createItem(inputValue);

    // EMPTY THE FIELD
    input.value = "";
});

// RESTORING DATA FROM LOCAL STORAGE
// CREATING EQUIVALENT ITEM
data.forEach(userItem => {
    createItem(userItem);
    // ul.addEventListener('click', deleteItem);
});

// CLEAR LOCAL STORAGE AND ALL ITEMS
clearBtn.addEventListener('click', function () {

    if (confirm("Cette action effacera toute la liste. Souhaitez-vous continuer ?")) {
        localStorage.clear();
        itemsArray = [];
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    }
});

// DELETE AN ITEM FROM
ul.addEventListener('click', deleteItem);

function deleteItem(e) {
    let isCloseBtn = e.target.classList.contains('close-btn');
    if (isCloseBtn) {
        e.target.parentNode.remove();
        console.log(e.target.parentElement.childNodes[3]);

        // DELETE FROM LOCAL STORAGE
        removeFromStorage(e.target.parentElement.childNodes[3]);
    }
};

// FN DELETE FROM LOCAL STORAGE
function removeFromStorage(liItem) {
    // console.log(liItem);
    let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    //  console.log(itemsArray);

    itemsArray.forEach(function (singleElement, index) {

        // console.log(singleElement, index);

        if (liItem.textContent === singleElement) {

            itemsArray.splice(index, 1);
        }
    });
    // console.log(itemsArray);
    localStorage.setItem('items', JSON.stringify(itemsArray));
};

// FN UPDATE ELEMENT ON LOCAL STORAGE
function updateOnStorage(precendItem, itemUpdated) {
    let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    // console.log('verif ', itemsArray);
    itemsArray.forEach((singleElement, index) => {
        if (precendItem === singleElement) {
            // REPLACE OLD BY NEW ELEMENT
            itemsArray.splice(index, 1, itemUpdated);
            // arr.splice(index, 1, item);
        }
    });

    localStorage.setItem('items', JSON.stringify(itemsArray));
    console.log(itemsArray);
}

// BUG
// MESSAGE IF LIST IS EMPTY

function isEmpty() {
    if (ul.childElementCount <= 0) {
        const para = document.createElement('p');
        para.textContent = 'Votre liste est vide.';

        document.querySelector('#message-container').appendChild(para);
    }
}
isEmpty();

// STYLE APPAREANCE

const colors = document.querySelectorAll('input[name=color]');

styleForm.addEventListener('change', (e) => {

    if(e.target.classList.contains('theme1')) {
        changeTheme("#03a9f4", null, "transparent", "black");
    }
    if (e.target.classList.contains('theme2')) {
        changeTheme("#839192", "white", "transparent", null);
    }
    if (e.target.classList.contains('theme3')) {
        changeTheme("#F1948A", "white", "transparent", null);
    }

});

function changeTheme(bgColor, textColor, itemColor, nameColor) {
    document.querySelector('.wrapper').style.backgroundColor = bgColor;
    document.querySelector('.wrapper').style.color = textColor;
    document.querySelector('li').style.backgroundColor = itemColor;
    document.querySelector('.item-name').style.color = nameColor;
}