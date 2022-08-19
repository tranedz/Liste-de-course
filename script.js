const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const allBtnDelete = document.querySelectorAll('.delete');
const btnConfirm = document.querySelector('button');
const btnDeleteList = document.getElementById('deleteAll');


let message = document.createElement('p');
message.className = 'message';
document.querySelector('#msg-status').appendChild(message);

let listUser = ["Apprendre JavaScript", "Apprendre HTML", "Apprendre CSS", "Apprendre NodeJS et ExpressJS"];

// input.focus();

// Submit a new task
form.addEventListener('submit', (e) => {
    if (inputSize()) {
        e.preventDefault();
        newTask();
        emptyListMessage();
        // Empty field after submit
        input.value = '';
    } else {
        alert("Vous n'avez encore rien écrit.");
    }

    // Réactiver le bouton effacer liste
    btnDeleteList.disabled = false;
    btnDeleteList.style.backgroundColor = "red";
})


function inputSize() {
    if (input.value.length > 0) {
        return true;
    } else {
        return false;
    }
}

function createTasks() {
    for (let item of listUser) {
        task = document.createElement('li');
        task.textContent = item;
        ul.appendChild(task);


        const btnUpdate = document.createElement('span');
        btnUpdate.textContent = "Modifier";
        btnUpdate.classList = "edit";

        const btnDelete = document.createElement('span');
        btnDelete.textContent = "Supprimer";
        btnDelete.classList = "delete";

        task.appendChild(btnUpdate);
        task.appendChild(btnDelete);

        btnDelete.addEventListener('click', deleteTask);
    }
}



createTasks();

// Add new task
function newTask() {
    let userValue = input.value;
    const task = document.createElement('li');
    task.textContent = userValue;
    // task.classList = "task";
    ul.appendChild(task);

    const btnUpdate = document.createElement('span');
    btnUpdate.textContent = "Modifier";
    btnUpdate.classList = "edit";

    const btnDelete = document.createElement('span');
    btnDelete.textContent = "Supprimer";
    btnDelete.classList = "delete";

    task.appendChild(btnUpdate);
    task.appendChild(btnDelete);

    btnDelete.addEventListener('click', deleteTask);

    btnUpdate.addEventListener('click', updateTask);

}

// Get all btn for deleting / only existing tasks
for (let i = 0; i < allBtnDelete.length; i++) {
    const btnDelete = allBtnDelete[i];
    btnDelete.addEventListener('click', deleteTask);
    // console.log(btnDelete)
}

// Delete a task of the list
function deleteTask(e) {
    let taskName = e.target.parentElement.firstChild.textContent;
    deletingMessage(taskName);

    setTimeout(() => {
        e.target.parentElement.remove();

    }, 3000);

    setTimeout(() => {
        emptyListMessage()
    }, 3000);
}


function deletingMessage(content) {

    // Loading simulation
    setTimeout(() => {
        message.textContent = `Suppression de : ${content}.`;
    }, 500)
    setTimeout(() => {
        message.textContent = `Suppression de : ${content}..`;
    }, 1000)
    setTimeout(() => {
        message.textContent = `Suppression de : ${content}...`;
    }, 1500)

    // Loading
    setTimeout(() => {
        message.textContent = `Suppression de : ${content}.`;
    }, 2000)
    setTimeout(() => {
        message.textContent = `Suppression de : ${content}..`;
    }, 2500)
    setTimeout(() => {
        message.textContent = `Suppression de : ${content}...`;
    }, 3000)

    setTimeout(() => {
        message.textContent = '';
    }, 3000);
}


function emptyListMessage() {
    if (ul.childElementCount === 0) {
        message.textContent = "Votre liste est vide. Besoin d'idées ?";
        btnDeleteList.disabled = true;
        btnDeleteList.style.backgroundColor = "grey";
    } else {
        message.textContent = '';
    }
}


emptyListMessage();


const allBtnUpdate = document.querySelectorAll('.edit');
// Update tasks
// Get all btn for deleting / only existing tasks
for (let i = 0; i < allBtnUpdate.length; i++) {
    const btnUpdate = allBtnUpdate[i];
    btnUpdate.addEventListener('click', updateTask);
}

// Mise à jour
function updateTask(e) {
    // Récupérer l'élément à mettre à jour
    let taskToUpdate = e.target.parentElement.firstChild.textContent;
    // Récupérer l'ancien élément à remplacer plus tard
    const oldItem = e.target.parentElement;

    // Récupéer l'élément ul parent
    const taskElement = e.target.parentElement.parentElement;

    // Création d'un formulaire avec input et bouton à l'intérieur d'un élément li
    // li
    const newItem = document.createElement('li');
    // Form
    const formForUpdate = document.createElement('form');
    // Input
    const inputForUpdate = document.createElement('input');
    // Bouton
    const btnForUpdate = document.createElement('button');
    // Afficher la valeur de l'ancien élément dans le nouvel input
    inputForUpdate.value = taskToUpdate;

    btnForUpdate.classList = "update";
    btnForUpdate.textContent = "Mettre à jour";

    formForUpdate.appendChild(inputForUpdate);
    formForUpdate.appendChild(btnForUpdate);

    newItem.appendChild(formForUpdate);

    // Remplacer l'ancien élément par le nouveau
    taskElement.replaceChild(newItem, oldItem);

    // Action pour mettre à jour un élément
    formForUpdate.addEventListener('submit', (e) => {
        e.preventDefault();
        // Remplacer le nouveau par l'ancien élément
        taskElement.replaceChild(oldItem, newItem);
        // Et donner la valeur du nouveau à l'ancien
        oldItem.firstChild.textContent = inputForUpdate.value;

        message.innerHTML = `Une tâche mise à jour : <br>
             - ancien : "${taskToUpdate}", <br>
            - nouveau : "${oldItem.firstChild.textContent}".`;

        setTimeout(() => {
            message.textContent = '';
        }, 5000);
    })
}



const listItem = ul.children;
const listItemPre = document.querySelectorAll('li');

btnDeleteList.addEventListener('click', deleteAllList)

function deleteAllList(e) {

    if (confirm('Cette action effacera toute la liste. Continuez ?') == true) {
        deletingMessage("toute la liste");

        setTimeout(() => {
            for (const itemPre of listItemPre) {
                itemPre.remove();
            }

            for (let i = 0; i < listItem.length; i++) {
                const item = listItem[i];
                item.remove();
            }
            emptyListMessage();
        }, 3000)

        e.target.disabled = true;
        e.target.style.backgroundColor = "grey";
    }
}

