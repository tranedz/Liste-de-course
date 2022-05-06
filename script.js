const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
input.focus();

const clearBtn = document.querySelector('#clear-btn');


let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

console.log(itemsArray);
// console.log(data);




function createItem(text) {

    const item = document.createElement('li');

    const editBtn = createEditBtn();

    function createEditBtn() {
        // <span class="material-symbols-outlined edit-btn">edit</span>
        const editBtn = document.createElement('span');
        editBtn.setAttribute('class', 'material-symbols-outlined edit-btn');
        editBtn.appendChild(document.createTextNode('edit'));
        return editBtn;
    };

    // <span class="item-name li-checked">Acheter des fruits</span>
    const itemName = document.createElement('span');
    itemName.setAttribute('class', 'item-name');
    itemName.textContent = text;

    // <input class="item-input" type="text" value="Acheter des fruits">
    const itemInput = document.createElement('input');
    itemInput.setAttribute('type', 'text');
    itemInput.className = 'item-input';
    itemInput.classList.add('invisible');
    itemInput.value = itemName.textContent;

    const closeEditBtn = createCloseEditBtn();

    function createCloseEditBtn() {
        // < span class="material-symbols-outlined invisible" >edit_off</span >
        const closeEditBtn = document.createElement('span');
        closeEditBtn.setAttribute('class', 'material-symbols-outlined close-edit-btn');
        closeEditBtn.appendChild(document.createTextNode('edit_off'));
        closeEditBtn.style.display = 'none';
        return closeEditBtn;
    };

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

    // <span class="material-symbols-outlined close-btn">close</span>
    const closeBtn = document.createElement('span');
    closeBtn.setAttribute('class', 'material-symbols-outlined close-btn');
    closeBtn.appendChild(document.createTextNode('close'));


    closeEditBtn.addEventListener('click', closeItemInput);
    

    function closeItemInput(e) {
        e.target.style.display = 'none';
        editBtn.style.display = 'block';
        itemName.classList.remove('invisible');
        itemInput.classList.add('invisible');

        
        let newValue = itemInput.value;
        
        
        updateOnStorage(itemName.textContent, newValue);
        


        itemName.textContent = newValue;
        
        console.log('New value :', newValue);

        
    }

    item.appendChild(editBtn);
    item.appendChild(closeEditBtn);
    item.appendChild(itemName);
    item.appendChild(itemInput);
    item.insertBefore(itemInput, itemName);
    item.appendChild(closeBtn);
    ul.appendChild(item);
    ul.insertBefore(item, ul.firstElementChild);

    // Check an item local scope
    item.addEventListener('click', (e) => {
        if (e.target.classList.contains('item-name')) {
            return e.target.classList.toggle('li-checked');
        };
    });

    return item;

};


form.addEventListener('submit', (e) => {
    e.preventDefault();

    let inputValue = input.value;

    itemsArray.push(inputValue);

    localStorage.setItem('items', JSON.stringify(itemsArray));

    createItem(inputValue);

    input.value = "";
});

data.forEach(userItem => {
    createItem(userItem);
    ul.addEventListener('click', deleteItem);
});

clearBtn.addEventListener('click', function () {

    if (confirm("Cette action effacera toute la liste. Souhaitez-vous continuer ?")) {
        localStorage.clear();
        itemsArray = [];
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    }
});

// Delete an item
ul.addEventListener('click', deleteItem);

function deleteItem(e) {
    let isCloseBtn = e.target.classList.contains('close-btn');
    if (isCloseBtn) {
        if (confirm("Cette action effacera toute la liste. Souhaitez-vous continuer ?")) {
            e.target.parentNode.remove();
            console.log(e.target.parentElement.childNodes[3]);
            removeFromStorage(e.target.parentElement.childNodes[3]);
        } 
    }
    
};

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


function updateOnStorage(precendItem, itemUpdated) {
    let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    console.log('verif ', itemsArray);
    itemsArray.forEach((singleElement, index) => {
        if (precendItem === singleElement) {
            itemsArray.splice(index, 1, itemUpdated);
            // arr.splice(index, 1, item);
        }
    });

    localStorage.setItem('items', JSON.stringify(itemsArray));
    console.log(itemsArray);
}

function isEmpty() {

    if(ul.childElementCount <= 0) {
        const para = document.createElement('p');
        para.textContent = 'Votre liste est vide.';

        document.querySelector('#message-container').appendChild(para);
        
    }
}

isEmpty();