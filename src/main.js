import './style.css'
import { eleves, groupes } from './data.js'
let listeEleves = document.querySelector("#liste-eleves"); 

let compteur = document.querySelector("#compteur");

function creerLigne (eleve){
  
 let ligne = document.createElement("li"); 
 ligne.dataset.id = eleve.id
 ligne.dataset.groupeId = eleve.groupeId
ligne.classList.add("carte-eleve");
let nom = document.createElement("h3");
nom.textContent = "Nom complet : " + eleve.nom + " " + eleve.prenom;
ligne.appendChild (nom);
let absence = document.createElement("p")
absence.textContent ="Absence " +  eleve.absences;
let message = document.createElement("span");

message.textContent = "Prévenir les parents";
message.classList.add("message-alerte");
if(eleve.absences >= 3){
  absence.classList.add("alerte");
  ligne.appendChild(message);
}
ligne.appendChild(absence)
let actions = document.createElement("div");
actions.classList.add("actions");

let btnAjouter = document.createElement("button");
btnAjouter.textContent = "ajouter la note";
btnAjouter.classList.add("btn-Ajouter");
let input = document.createElement("input");
let erreurNote = document.createElement("p");
erreurNote.classList.add("erreur-note");
actions.appendChild(erreurNote);
input.classList.add("input");
input.type = "number";
input.min ="0";
input.max ="20";
actions.appendChild(input);
btnAjouter.addEventListener("click",()=>{
   let nouvelleNote = Number(input.value);
   if(input.value === "" || input.value < 0 || input.value > 20){
erreurNote.textContent = "Veuillez entrer une note entre 0 et 20";
return;
   }
   eleve.notes.push(nouvelleNote);
   let total = eleve.notes.reduce((acc, note) => {
    return acc + note;
}, 0);
let resultat = total / eleve.notes.length;
  moyenne.textContent = "Moyenne : " + resultat.toFixed(2) + " / 20";

    input.value = "";
})
let btnAbsent = document.createElement("button");
btnAbsent.textContent = "Absent";
btnAbsent.classList.add("btn-Absent");

btnAbsent.addEventListener("click", () => {

    eleve.absences++;

    absence.textContent = "Absence " + eleve.absences;

    if (eleve.absences >= 3) {
        absence.classList.add("alerte");

        if (!ligne.contains(message)) {
            ligne.appendChild(message);
        }
    }

});
actions.appendChild(btnAjouter);
actions.appendChild(btnAbsent);

ligne.appendChild(actions);
let moyenne = document.createElement("p");
if(eleve.notes.length===0){moyenne.textContent="Moyenne : -"}
else{
 let total = eleve .notes .reduce ((acc,note)=>{
return acc + note
 },0);
 let resultat = total/eleve.notes.length;
 moyenne.textContent = "Moyenne : " + resultat + " / 20";

} ligne.appendChild(moyenne);
return ligne}
// les lignes de toutes les eleves
let lignes = eleves.map(creerLigne); // [li, li, li ]
// les lignes dans la liste html
listeEleves.append(...lignes); // li, li,  li, ...

compteur.textContent = eleves.length + " élèves";

// let page = document.getElementById("page");
// une boucle pour les options dans les  select
// Récupérer les éléments HTML
let section = document.getElementById("filtre-groupe");
let input = document.getElementById("recherche");

// Remplir le select avec les groupes
groupes.forEach((group) => {
    let option = document.createElement("option");
    option.value = group.id;
    option.textContent = group.nom;
    section.appendChild(option);
});

// Filtrer les élèves par groupe
section.addEventListener("change", () => {

    let optionFiltrer = section.value;

    let resultat;

    if (optionFiltrer === "Tous les groupes") {
        resultat = eleves;
    } else {
        resultat = eleves.filter((eleve) => {
            return String(eleve.groupeId) === optionFiltrer;
        });
    }

    // Vider l'ancienne liste
    listeEleves.innerHTML = "";

    // Afficher les résultats
    resultat.forEach((eleve) => {
        let ligne = creerLigne(eleve);
        listeEleves.appendChild(ligne);
    });

    // Mettre à jour le compteur
    compteur.textContent = resultat.length + " élèves";
});

input.addEventListener("input", () => {

    let recherche = input.value.toLowerCase().trim();

    let resultat = eleves.filter((eleve) => {
        return eleve.nom.toLowerCase().includes(recherche) ||
               eleve.prenom.toLowerCase().includes(recherche);
    });

    listeEleves.innerHTML = "";

    resultat.forEach((eleve) => {
        let ligne = creerLigne(eleve);
        listeEleves.appendChild(ligne);
    });

    compteur.textContent = resultat.length + " élèves";
});

