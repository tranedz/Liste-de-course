import { getUserDataSaved } from "../script.js";

export function taskValidation(e) {
  // Récupérer l'élément à mettre à jour
  let taskToUpdate = e.target.parentElement.firstChild.textContent;
  // Récupérer l'ancien élément à remplacer plus tard

  for (const data of getUserDataSaved) {
    // console.log(getUserDataSaved.indexOf(data))

    if (data.taskName === taskToUpdate) {
      let indexOfItem = getUserDataSaved.indexOf(data);
      // console.log('Index : ', indexOfItem);

      e.target.parentElement.firstChild.classList.toggle('validated');

      // changement du statut
      data.isValidated = true;

      getUserDataSaved.splice(indexOfItem, 1, data);
      // console.log(getUserDataSaved);
      // Stockage de la mise à jour
      localStorage.setItem('Data', JSON.stringify(getUserDataSaved));

      // Réactualiser le statut à chaque modification
      if (!e.target.parentElement.firstChild.classList.contains('validated')) {
        data.isValidated = false;
        getUserDataSaved.splice(indexOfItem, 1, data);
        localStorage.setItem('Data', JSON.stringify(getUserDataSaved));
      }
      break;
    }
  }
}