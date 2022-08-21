import { getUserDataSaved, input, objectData, ul, userDataArray } from "../script.js";
import { deleteTask } from "./deleteTask.js";
import todayDate from "./horodatage.js";
import { updateTask } from "./updateTask.js";
import { taskValidation } from "./validateTask.js";


// Créer les éléments de la nouvelle tâche : nouveaux éléments
export function newTask() {
  let userValue = input.value;
  const task = document.createElement('li');
  // task.textContent = userValue;
  ul.appendChild(task);

  const taskName = document.createElement('span');
  taskName.classList = "taskName";
  taskName.textContent = userValue;

  const btnUpdate = document.createElement('button');
  btnUpdate.textContent = "Modifier";
  btnUpdate.classList = "edit";

  const btnDelete = document.createElement('button');
  btnDelete.textContent = "Supprimer";
  btnDelete.classList = "delete";

  task.appendChild(taskName);
  task.appendChild(btnUpdate);
  task.appendChild(btnDelete);

  // Création de données de création
  let userData = new objectData(userValue, todayDate, false);
  console.log(userData);

  getUserDataSaved.push(userData);

  // Stockage des données de création dans le stockage local
  localStorage.setItem('Data', JSON.stringify(getUserDataSaved));

  btnDelete.addEventListener('click', deleteTask);

  btnUpdate.addEventListener('click', updateTask);

  taskName.addEventListener('click', taskValidation);
}