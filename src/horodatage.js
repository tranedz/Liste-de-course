// Jour et heure pour l'horodatage
let todayDate = new Date();
let dd = String(todayDate.getDate()).padStart(2, '0');
let mm = String(todayDate.getMonth() + 1).padStart(2, '0');
let yyyy = todayDate.getFullYear();
let hh = String(todayDate.getHours()).padStart(2, '0');
let min = String(todayDate.getMinutes()).padStart(2, '0');
let sec = String(todayDate.getSeconds()).padStart(2, '0');

// horodatage
todayDate = {
  date_de_creation: `${dd}/${mm}/${yyyy}`,
  heure_de_creation: `${hh}:${min}:${sec}`
}

export default todayDate;