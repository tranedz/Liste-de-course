const form = document.querySelector('form');
export const input = document.querySelector('input');
export const ul = document.querySelector('ul');
const allBtnDelete = document.querySelectorAll('.delete');
const btnConfirm = document.querySelector('button');
export const btnDeleteList = document.getElementById('deleteAll');

import { deleteTask } from './src/deleteTask.js';
import { deletingMessage, emptyListMessage } from './src/messages.js';
import todayDate from './src/horodatage.js';
import { inputSize, limitCharacters } from './src/inputSize.js';
import { updateTask } from './src/updateTask.js';
import { deleteAllList } from './src/deleteAll.js';
import { taskValidation } from './src/validateTask.js';
import { newTask } from './src/addTask.js';
import { createTasks } from './src/createLocalTasks.js';


// let userList = ["Apprendre JavaScript", "Apprendre HTML", "Apprendre CSS", "Apprendre NodeJS et ExpressJS"];

export let getDataSaved;
export let userDataArray = [];
export let getUserDataSaved;


export class objectData {
    constructor(taskName, dateOfCreation, isValidated) {
        this.taskName = taskName,
            this.dateOfCreation = dateOfCreation,
            this.isValidated = isValidated
    }
}

// Vérifier l'existence de données dans le stockage
// S'il y a des données convertir et récupérer
// Sinon assigner un tableau vide
if (localStorage.getItem("items") == null) {
    getDataSaved = [];
} else {
    getDataSaved = JSON.parse(localStorage.getItem('items'))
}
// Pour l'objet
if (localStorage.getItem("Data") == null) {
    getUserDataSaved = [];
} else {
    getUserDataSaved = JSON.parse(localStorage.getItem('Data'))
}


// Ajouter une nouvelle tâche
form.addEventListener('submit', (e) => {
    if (inputSize()) {
        if (limitCharacters()) {
            e.preventDefault();

            let inputValue = input.value;

            getDataSaved.unshift(inputValue);
            // getDataSaved.push(inputValue);

            localStorage.setItem('items', JSON.stringify(getDataSaved));

            // // Création de données de création
            // let userData = new objectData(inputValue, todayDate, false);
            // console.log(userData);

            // userDataArray.push(userData);

            // // Stockage des données de création dans le stockage local
            // localStorage.setItem('Data', JSON.stringify(userDataArray));



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



createTasks();

// Récupérer tous les boutons de suppression de tâche / tâches existantes uniquement
for (let i = 0; i < allBtnDelete.length; i++) {
    const btnDelete = allBtnDelete[i];
    btnDelete.addEventListener('click', deleteTask);
}

emptyListMessage();


// Récupérer tous les boutons de suppression de tâche / tâches existantes uniquement
const allBtnUpdate = document.querySelectorAll('.edit');
for (let i = 0; i < allBtnUpdate.length; i++) {
    const btnUpdate = allBtnUpdate[i];
    btnUpdate.addEventListener('click', updateTask);
}

btnDeleteList.addEventListener('click', deleteAllList);