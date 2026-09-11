import { recupererUtilisateur, sauvegarderUtilisateur, toutEffacer } from "../storage/storage.js";
import { verifierMotDePasse, hacherMotDePasse } from "../security/security.js";
import { afficherVue, masquerNavbar } from "../router/router.js";


function chargerProfil() {
    let utilisateur = recupererUtilisateur();

    if (utilisateur === null) {
        return;
    }

    
    let premiereLettre = utilisateur.nom.charAt(0).toUpperCase();
    document.getElementById("profile-avatar").textContent = premiereLettre;

    
    document.getElementById("profile-name").textContent = utilisateur.nom;
    document.getElementById("profile-email").textContent = utilisateur.email;

    
    document.getElementById("info-name").textContent = utilisateur.nom;
    document.getElementById("info-email").textContent = utilisateur.email;
    document.getElementById("info-date").textContent = utilisateur.dateInscription;
    let pts = utilisateur.points !== undefined ? utilisateur.points : (utilisateur.point || 500);
    document.getElementById("info-points").textContent = pts + " pts";

    
    document.getElementById("edit-name").value = utilisateur.nom;
    document.getElementById("edit-email").value = utilisateur.email;
}


function modifierProfil() {
    let utilisateur = recupererUtilisateur();
    if (utilisateur === null) {
        return;
    }

    let nouveauNom = document.getElementById("edit-name").value;
    let nouvelEmail = document.getElementById("edit-email").value;

    if (nouveauNom === "" || nouvelEmail === "") {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    
    utilisateur.nom = nouveauNom;
    utilisateur.email = nouvelEmail;

   
    sauvegarderUtilisateur(utilisateur);

    
    chargerProfil();

    alert("Profil modifie avec succes !");
}


async function changerMotDePasse() {
    let utilisateur = recupererUtilisateur();
    if (utilisateur === null) {
        return;
    }

    let ancienMdp = document.getElementById("edit-password-old").value;
    let nouveauMdp = document.getElementById("edit-password-new").value;

    if (ancienMdp === "" || nouveauMdp === "") {
        alert("Veuillez remplir les deux mots de passe !");
        return;
    }

    if (nouveauMdp.length < 6) {
        alert("Le nouveau mot de passe doit faire au moins 6 caracteres !");
        return;
    }

  
    let estCorrect = await verifierMotDePasse(ancienMdp, utilisateur.motDePasseHache);
    if (!estCorrect) {
        alert("L'ancien mot de passe est faux !");
        return;
    }

  
    let hash = await hacherMotDePasse(nouveauMdp);
    utilisateur.motDePasseHache = hash;
    sauvegarderUtilisateur(utilisateur);

  
    document.getElementById("edit-password-old").value = "";
    document.getElementById("edit-password-new").value = "";

    alert("Mot de passe change !");
}


function supprimerCompte() {
    let reponse = confirm("Voulez-vous vraiment supprimer votre compte ?");
    if (reponse === true) {
        toutEffacer();
        masquerNavbar();
        afficherVue("view-login");
        alert("Compte supprime !");
    }
}


function initialiserProfil() {
    let btnModifier = document.getElementById("btn-save-profile");
    let btnMdp = document.getElementById("btn-change-password");
    let btnSupprimer = document.getElementById("btn-delete-account");

    btnModifier.addEventListener("click", modifierProfil);
    btnMdp.addEventListener("click", changerMotDePasse);
    btnSupprimer.addEventListener("click", supprimerCompte);
}

export { chargerProfil, initialiserProfil };
