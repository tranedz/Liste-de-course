import { btnDeleteList, ul } from "../script.js";

export let message = document.createElement('p');
message.className = 'message';
document.querySelector('#msg-status').appendChild(message);

export function deletingMessage(content) {

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
export function emptyListMessage() {
  if (ul.childElementCount === 0) {
    message.textContent = "Votre liste est vide. Besoin d'idées ?";
    btnDeleteList.disabled = true;
    btnDeleteList.style.backgroundColor = "grey";
  } else {
    message.textContent = '';
  }
}