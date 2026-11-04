import './style.css'
import { eleves, groupes } from './data.js'
let listeEleves = document.querySelector("#liste-eleves"); 

let compteur = document.querySelector("#compteur");

function creerLigne (eleve){
  
 let ligne = document.createElement("li"); 
ligne.classList.add("carte-eleve");
let nom = document.createElement("h3");
nom.textContent = "Nom complet : " + eleve.nom + " " + eleve.prenom;
ligne.appendChild (nom);
let absence = document.createElement("p")
absence.textContent= "Absences : " + eleve.absences;
if(eleve.absences >= 3){
  absence.classList.add("alerte");
}
ligne.appendChild(absence)
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

    if (optionFiltrer === "tous") {
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