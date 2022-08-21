import { getUserDataSaved, ul } from "../script.js";
import { deleteTask } from "./deleteTask.js";
import { taskValidation } from "./validateTask.js";

// Créer les éléments de la nouvelle tâche : éléments existant dans la base de données
export function createTasks() {
  for (let data of getUserDataSaved) {
    // console.log(data.taskName)
    const task = document.createElement('li');
    ul.appendChild(task);

    const taskName = document.createElement('span');
    taskName.textContent = data.taskName;
    taskName.classList = "taskName";

    const btnUpdate = document.createElement('button');
    btnUpdate.textContent = "Modifier";
    btnUpdate.classList = "edit";

    const btnDelete = document.createElement('button');
    btnDelete.textContent = "Supprimer";
    btnDelete.classList = "delete";

    // Horodatage
    const horodatage = document.createElement('small');
    horodatage.textContent = `Créée le ${data.dateOfCreation.date_de_creation}
    à ${data.dateOfCreation.heure_de_creation}`;
    horodatage.classList = "horodatage";

    task.appendChild(taskName);
    task.appendChild(btnUpdate);
    task.appendChild(btnDelete);
    task.appendChild(horodatage);

    // Vérifier la validation (checked) par l'utilisateur
    if (data.isValidated === true) {
      taskName.classList.add('validated');
    }

    btnDelete.addEventListener('click', deleteTask);
    taskName.addEventListener('click', taskValidation);
  }
}