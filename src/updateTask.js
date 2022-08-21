import { getDataSaved, getUserDataSaved } from "../script.js";
import { message } from "./messages.js";


// Mise à jour
export function updateTask(e) {
  // Récupérer l'élément à mettre à jour
  let taskToUpdate = e.target.parentElement.firstChild.textContent;
  // Récupérer l'ancien élément à remplacer plus tard
  const oldItem = e.target.parentElement;

  // Récupéer l'élément ul parent
  const taskElement = e.target.parentElement.parentElement;

  // Création d'un formulaire avec input et bouton à l'intérieur d'un élément li
  // li
  const newItem = document.createElement('li');
  newItem.classList = "item-input";
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

    // L'objet
    for (const data of getUserDataSaved) {
      if (data.taskName === taskToUpdate) {
        data.taskName = oldItem.firstChild.textContent;

        localStorage.setItem('Data', JSON.stringify(getUserDataSaved));
        break;
      }
    }
  })
}