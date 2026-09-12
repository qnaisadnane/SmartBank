import { initialiserAuth } from "./components/auth.js";
import { afficherVue, afficherNavbar, masquerNavbar, initialiserNavigation } from "./router/router.js";
import { recupererUtilisateur, estConnecte } from "./storage/storage.js";
import { chargerDashboard } from "./components/dashboard.js";
import { initialiserOffres } from "./components/offres.js";
import { initialiserProfil } from "./components/profil.js";
import { initialiserSimulation } from "./components/simulation.js";
import { initialiserHistorique } from "./components/historique.js";
import { initialiserFlash } from "./components/flash.js";
import { initialiserRewards } from "./components/rewards.js";

function demarrerApp() {
    initialiserSimulation();
    initialiserProfil();
    initialiserAuth();
    initialiserNavigation();
    initialiserOffres();
    initialiserHistorique();
    initialiserFlash();
    initialiserRewards();

    let connecte = estConnecte();
    let utilisateur = recupererUtilisateur();
    let chemin = window.location.pathname.replace(/^\/+/, "").toLowerCase();

    if (connecte && utilisateur !== null) {
        afficherNavbar();
        let vueDemandee = "view-" + chemin;
        let vuesValides = [
            "view-dashboard",
            "view-offres",
            "view-simulation",
            "view-rewards",
            "view-flash",
            "view-historique",
            "view-profil"
        ];

        if (vuesValides.includes(vueDemandee)) {
            afficherVue(vueDemandee);
        } else {
            afficherVue("view-dashboard");
        }
        chargerDashboard();
    } else {
        masquerNavbar();
        if (chemin === "register") {
            afficherVue("view-register");
        } else {
            afficherVue("view-login");
        }
    }
}

demarrerApp();