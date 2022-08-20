const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const allBtnDelete = document.querySelectorAll('.delete');
const btnConfirm = document.querySelector('button');
const btnDeleteList = document.getElementById('deleteAll');


let message = document.createElement('p');
message.className = 'message';
document.querySelector('#msg-status').appendChild(message);

// let userList = ["Apprendre JavaScript", "Apprendre HTML", "Apprendre CSS", "Apprendre NodeJS et ExpressJS"];

let getDataSaved;

// Vérifier l'existence de données dans le stockage
// S'il y a des données convertir et récupérer
// Sinon assigner un tableau vide
if (localStorage.getItem("items") == null) {
    getDataSaved = [];
} else {
    getDataSaved = JSON.parse(localStorage.getItem('items'))
}


// Ajouter une nouvelle tâche
form.addEventListener('submit', (e) => {
    if (inputSize()) {
        if (limitCharacters()) {
            e.preventDefault();

            let inputValue = input.value;

            getDataSaved.unshift(inputValue);

            localStorage.setItem('items', JSON.stringify(getDataSaved));

            newTask();
            emptyListMessage();
            // Vider le champ
            input.value = '';
        } else {
            alert("Nombre de caractères limité à 30. Soyez plus bref ! :)");
        }
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

function limitCharacters() {
    if (input.value.length <= 30) {
        return true;
    } else {
        return false;
    }
}

// Créer les éléments de la nouvelle tâche : éléments existant dans la base de données
function createTasks() {
    for (let item of getDataSaved) {
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

// Créer les éléments de la nouvelle tâche : nouveaux éléments
function newTask() {
    let userValue = input.value;
    const task = document.createElement('li');
    task.textContent = userValue;
    // task.classList = "task";
    ul.replaceChild(task, ul.firstChild);

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

// Récupérer tous les boutons de suppression de tâche / tâches existantes uniquement
for (let i = 0; i < allBtnDelete.length; i++) {
    const btnDelete = allBtnDelete[i];
    btnDelete.addEventListener('click', deleteTask);
}

// Supprimer une tâche de la liste
function deleteTask(e) {
    let taskName = e.target.parentElement.firstChild.textContent;
    deletingMessage(taskName);

    // Effacer un élément du stockage local
    for (const item of getDataSaved) {
        if (item === taskName) {
            let indexOfItem = getDataSaved.indexOf(item);
            getDataSaved.splice(indexOfItem, 1);

            localStorage.setItem('items', JSON.stringify(getDataSaved));
            // console.log(getDataSaved);
            break;
        }

    }

    setTimeout(() => {
        e.target.parentElement.remove();

    }, 3000);

    setTimeout(() => {
        emptyListMessage()
    }, 3000);
}


function deletingMessage(content) {

    // Simulation d'un chargement / réutilisable
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

// Message pour la liste vide
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


// Récupérer tous les boutons de suppression de tâche / tâches existantes uniquement
const allBtnUpdate = document.querySelectorAll('.edit');
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

        // mettre à jour un élément du stockage local
        for (const item of getDataSaved) {
            if (item === taskToUpdate) {
                let indexOfItem = getDataSaved.indexOf(item);
                getDataSaved.splice(indexOfItem, 1, oldItem.firstChild.textContent);

                localStorage.setItem('items', JSON.stringify(getDataSaved));
                break;
            }

        }
    })
}


//  Supprimer toute la liste
const listItem = ul.children;
const listItemPre = document.querySelectorAll('li');

btnDeleteList.addEventListener('click', deleteAllList)

function deleteAllList(e) {

    if (confirm('Cette action effacera toute la liste. Continuer ?') == true) {
        localStorage.clear();
        deletingMessage("toute la liste");

        setTimeout(() => {
            // suppression des éléments existants
            for (const itemPre of listItemPre) {
                itemPre.remove();
            }
            // suppression des nouveaux éléments
            for (let i = 0; i < listItem.length; i++) {
                const item = listItem[i];
                item.remove();
            }
            // Message liste vide
            emptyListMessage();

        }, 3000)

        // Vérouiller le bouton et changer de couleur
        e.target.disabled = true;
        e.target.style.backgroundColor = "grey";
    }
}

