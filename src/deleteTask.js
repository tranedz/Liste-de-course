import { getDataSaved, getUserDataSaved } from "../script.js";
import { deletingMessage, emptyListMessage } from "./messages.js";

// Supprimer une tâche de la liste
export function deleteTask(e) {
  let taskName = e.target.parentElement.firstChild.textContent;
  deletingMessage(taskName);

  // Effacer un élément du stockage local
  // Le tableau
  for (const item of getDataSaved) {
    if (item === taskName) {
      let indexOfItem = getDataSaved.indexOf(item);
      getDataSaved.splice(indexOfItem, 1);

      localStorage.setItem('items', JSON.stringify(getDataSaved));
      break;
    }
  }
  // L'objet
  for (const data of getUserDataSaved) {
    if (data.taskName === taskName) {
      let indexOfItem = getUserDataSaved.indexOf(data);
      console.log(data);
      getUserDataSaved.splice(indexOfItem, 1);

      localStorage.setItem('Data', JSON.stringify(getUserDataSaved));
      break;
    }
  }
  // Simulation du chargement
  setTimeout(() => {
    e.target.parentElement.remove();

  }, 3000);

  setTimeout(() => {
    emptyListMessage()
  }, 3000);
}