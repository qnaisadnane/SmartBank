import { hacherMotDePasse, verifierMotDePasse } from "../security/security.js";
import { sauvegarderUtilisateur, recupererUtilisateur, definirSessionConnectee, creerTransactionDefault } from "../storage/storage.js";
import { afficherVue, afficherNavbar, masquerNavbar } from "../router/router.js";
import { chargerDashboard } from "./dashboard.js";

function initialiserAuth() {
    document.getElementById("btn-login").addEventListener("click", gererConnexion);
    document.getElementById("btn-register").addEventListener("click", gererInscription);

    document.getElementById("go-register").addEventListener("click", function (e) {
        e.preventDefault();
        afficherVue("view-register");
    });
    document.getElementById("go-login").addEventListener("click", function (e) {
        e.preventDefault();
        afficherVue("view-login");
    });
    document.getElementById("btn-logout").addEventListener("click", gererDeconnexion);
}

async function gererConnexion() {
    let email = document.getElementById("login-email").value.trim();
    let password = document.getElementById("login-password").value;
    let erreur = document.getElementById("login-error");

    erreur.classList.add("hidden");
    erreur.textContent = "";

    if (email === "" || password === "") {
        erreur.textContent = "Veuillez remplir tous les champs.";
        erreur.classList.remove("hidden");
        return;
    }

    let utilisateur = recupererUtilisateur();
    if (utilisateur === null) {
        erreur.textContent = "Aucun compte existant. Veuillez créer un compte d'abord.";
        erreur.classList.remove("hidden");
        return;
    }

    if (utilisateur.email.toLowerCase() !== email.toLowerCase()) {
        erreur.textContent = "Email ou mot de passe incorrect.";
        erreur.classList.remove("hidden");
        return;
    }

    let correct = await verifierMotDePasse(password, utilisateur.motDePasseHache);

    if (!correct) {
        erreur.textContent = "Email ou mot de passe incorrect.";
        erreur.classList.remove("hidden");
        return;
    }

    definirSessionConnectee(true);
    afficherNavbar();
    afficherVue("view-dashboard");
    chargerDashboard();
}

async function gererInscription() {
    let nom = document.getElementById("reg-name").value.trim();
    let email = document.getElementById("reg-email").value.trim();
    let motDePasse = document.getElementById("reg-password").value;
    let confirmation = document.getElementById("reg-confirm").value;
    let erreur = document.getElementById("register-error");

    erreur.classList.add("hidden");
    erreur.textContent = "";

    if (nom === "" || email === "" || motDePasse === "" || confirmation === "") {
        erreur.textContent = "Veuillez remplir tous les champs.";
        erreur.classList.remove("hidden");
        return;
    }
    if (motDePasse.length < 6) {
        erreur.textContent = "Le mot de passe doit avoir au moins 6 caractères.";
        erreur.classList.remove("hidden");
        return;
    }
    if (motDePasse !== confirmation) {
        erreur.textContent = "Les mots de passe ne correspondent pas.";
        erreur.classList.remove("hidden");
        return;
    }

    let hash = await hacherMotDePasse(motDePasse);
    let nouvelUtilisateur = {
        nom: nom,
        email: email,
        motDePasseHache: hash,
        dateInscription: new Date().toLocaleDateString("fr-FR"),
        points: 500
    };

    sauvegarderUtilisateur(nouvelUtilisateur);
    creerTransactionDefault();
    definirSessionConnectee(false);
    afficherVue("view-login");
    alert("Compte créé avec succès ! Veuillez maintenant vous connecter.");
}

function gererDeconnexion() {
    definirSessionConnectee(false);
    masquerNavbar();
    afficherVue("view-login");
    document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";
}

export { initialiserAuth };