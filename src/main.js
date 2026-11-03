import './style.css'
import { eleves } from './data.js'
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


