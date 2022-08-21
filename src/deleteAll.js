
import { ul } from "../script.js";
import { deletingMessage, emptyListMessage } from "./messages.js";


export function deleteAllList(e) {
  // Listes
  const listItemPre = document.querySelectorAll('li');
  const listItem = ul.children;

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