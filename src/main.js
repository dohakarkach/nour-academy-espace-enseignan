import './style.css'
import { eleves, groupes } from './data.js'
let listeEleves = document.querySelector("#liste-eleves"); 
let listeParents = document.getElementById("liste-parents");
let compteur = document.querySelector("#compteur");
let bilanTitre = document.getElementById("titre-bilan");
let BilanMoyenne = document.getElementById("bilan-moyenne");
let bilanAbsences = document.getElementById("bilan-absences");
let bilanAlertes = document.getElementById("bilan-alertes");
let bilanMeilleur = document.getElementById("bilan-meilleur");

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
  ligne.classList.add("alerte");
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
        ligne.classList.add("alerte");

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

    if (optionFiltrer === "") {
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
    let totalAbsences = resultat.reduce((acc,eleve)=>{
    return acc + eleve.absences
},0);
bilanAbsences.textContent = totalAbsences+"absences";
let elevesAlertes = 
resultat.filter((eleve)=>{
    if(eleve.absences>= 3){
return true
    }
    else{
        return false
    }
})
 bilanAlertes.textContent = elevesAlertes.length ;
 listeParents.innerHTML = "";

elevesAlertes.forEach((eleve) => {
    let li = document.createElement("li");

    li.textContent = eleve.nom + " " + eleve.prenom +
        " — Téléphone : " + eleve.telephoneParent;

    listeParents.appendChild(li);
    // Moyenne générale
let elevesAvecNotes = resultat.filter((eleve) => {
    return eleve.notes.length > 0;
});

if (elevesAvecNotes.length === 0) {
    BilanMoyenne.textContent = "Aucune moyenne";
} else {
    let total = 0;

    elevesAvecNotes.forEach((eleve) => {
        let somme = eleve.notes.reduce((acc, note) => {
            return acc + note;
        }, 0);

        let moyenne = somme / eleve.notes.length;

        total = total + moyenne;
    });

    let moyenneGenerale = total / elevesAvecNotes.length;

    BilanMoyenne.textContent = moyenneGenerale.toFixed(2) + " / 20";
}

// Meilleure moyenne
if (elevesAvecNotes.length === 0) {
    bilanMeilleur.textContent = "Aucun élève";
} else {
    let meilleureMoyenne = 0;
    let meilleurEleve = "";

    elevesAvecNotes.forEach((eleve) => {
        let somme = eleve.notes.reduce((acc, note) => {
            return acc + note;
        }, 0);

        let moyenne = somme / eleve.notes.length;

        if (moyenne > meilleureMoyenne) {
            meilleureMoyenne = moyenne;
            meilleurEleve = eleve.prenom + " " + eleve.nom;
        }
    });

    bilanMeilleur.textContent = meilleurEleve + " : " + meilleureMoyenne.toFixed(2) + " / 20";
}
});
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
let form = document . getElementById("form-eleve");
let inputPrenom = document.getElementById("prenom");
let inputNom = document.getElementById("nom");
let prenomMessage = document.getElementById("prenom-msg");
let nomMessage = document.getElementById("nom-msg");
let grp = document.getElementById("groupe");
let grpMessage = document.getElementById("groupe-msg");
let email = document.getElementById("email");
let EmailMessage = document.getElementById("email-msg");
let telephone = document.getElementById("telephone");
let telephoneMessage = document.getElementById("telephone-msg");
let succesMessage = document.getElementById("form-succes");
let erreurMessage = document.getElementById("form-erreur");
let inputCode = document.getElementById("code");
let codeMessage = document.getElementById("code-msg");
const regexPrenom = /^[A-Za-zÀ-ÿ\s-]{2,}$/;
const regexNom = /^[A-Za-zÀ-ÿ\s-]{2,}$/;
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

const regexTelephone = /^(0[67]\d{8}|\+212[67]\d{8})$/;

const regexCode = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const champPrenom = inputPrenom.parentElement;
 inputPrenom.addEventListener("input",()=>{
    if ( regexPrenom.test(inputPrenom.value))
    {champPrenom.classList.remove("erreur");
        champPrenom.classList.add("valide");
        prenomMessage .textContent ="Prénom valide"
    }
    else  {
        champPrenom.classList.remove("valide");
        champPrenom.classList.add("erreur");
        prenomMessage.textContent = "2 caractères minimum : lettres, espaces ou tirets";
    }
 })
 const champNom = inputNom.parentElement;
 inputNom.addEventListener("input",()=>{
    if ( regexNom.test(inputNom.value))
    {champNom.classList.remove("erreur");
        champNom.classList.add("valide");
        nomMessage .textContent ="Nom valide"
    }
    else  {
        champNom.classList.remove("valide");
        champNom.classList.add("erreur");
        nomMessage.textContent = "2 caractères minimum : lettres, espaces ou tirets";
    }
 })
  const champEmail = email.parentElement;
 email.addEventListener("input",()=>{
    if ( regexEmail.test(email.value))
    {champEmail.classList.remove("erreur");
        champEmail.classList.add("valide");
        EmailMessage .textContent ="Email validé"
    }
    else  {
        champEmail.classList.remove("valide");
        champEmail.classList.add("erreur");
        EmailMessage.textContent = "Veuillez saisir une adresse email valide";
    }
 })
 const champTelephone = telephone.parentElement;
telephone.addEventListener("input", () => {
if (regexTelephone.test(telephone.value)) {
champTelephone.classList.remove("erreur");
champTelephone.classList.add("valide");
telephoneMessage.textContent = "Téléphone valide.";
} else {
champTelephone.classList.remove("valide");
champTelephone.classList.add("erreur");
telephoneMessage.textContent = "Format invalide. Exemple : 0612345678 ou +212612345678.";

}

});form.addEventListener("submit",(event)=>{

    event.preventDefault();
  let existe = eleves.some((eleve)=>{
return eleve.prenom === inputPrenom.value && 
eleve.nom === inputNom.value;
});  
if(existe  ) {  erreurMessage.textContent = "Cet élève existe déjà";
    return;
}
else{
let Neweleve ={
    id : eleves.length + 1,

            prenom: inputPrenom.value,
            nom: inputNom.value,
            groupeId: Number(grp.value),
            telephoneParent: telephone.value,
            absences: 0,
            notes: []
};
eleves.push(Neweleve);

let nouvelleLigne = creerLigne(Neweleve);
listeEleves.appendChild(nouvelleLigne);
compteur.textContent = eleves.length + " élèves";

// pour vider le form

form.reset();






}





});
