import { chargerDashboard } from "../components/dashboard.js";
import { chargerProfil } from "../components/profil.js";
import { chargerHistorique } from "../components/historique.js";
import { chargerRewards } from "../components/rewards.js";
import { estConnecte } from "../storage/storage.js";

let toutesLesVues = [
    "view-login",
    "view-register",
    "view-dashboard",
    "view-offres",
    "view-simulation",
    "view-rewards",
    "view-flash",
    "view-historique",
    "view-profil"
];

function afficherVue(idVue, updateHistory = true) {
    if (!estConnecte() && idVue !== "view-login" && idVue !== "view-register") {
        idVue = "view-login";
        masquerNavbar();
    }

    for (let i = 0; i < toutesLesVues.length; i++) {
        let element = document.getElementById(toutesLesVues[i]);
        if (element !== null) {
            element.classList.add("hidden");
        }
    }
    
    let vueactive = document.getElementById(idVue);
    if (vueactive !== null) {
        vueactive.classList.remove("hidden");
    }
    
    mettreajourNavbar(idVue);
    
    let nomRoute = idVue.replace("view-", "");
    let nouvelleUrl = "/" + nomRoute;
    
    if (updateHistory && window.location.pathname !== nouvelleUrl) {
        window.history.pushState({ vue: idVue }, "", nouvelleUrl);
    }

    if (estConnecte()) {
        if (idVue === "view-dashboard") {
            chargerDashboard();
        } else if (idVue === "view-profil") {
            chargerProfil();
        } else if (idVue === "view-historique") {
            chargerHistorique("tout");
        } else if (idVue === "view-rewards") {
            chargerRewards();
        }
    }

    let menuLinks = document.getElementById("navbar-links");
    if (menuLinks) {
        menuLinks.classList.remove("open");
    }
}

function afficherNavbar() {
    document.getElementById("main-navbar").classList.remove("hidden");
    document.getElementById("main-footer").classList.remove("hidden");
}

function masquerNavbar() {
    document.getElementById("main-navbar").classList.add("hidden");
    document.getElementById("main-footer").classList.add("hidden");
}

function mettreajourNavbar(idVue) {
    let buttons = document.querySelectorAll(".nav-btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }

    switch (idVue) {
        case "view-dashboard":
            document.getElementById("nav-dashboard")?.classList.add("active");
            break;

        case "view-offres":
            document.getElementById("nav-offres")?.classList.add("active");
            break;

        case "view-simulation":
            document.getElementById("nav-simulation")?.classList.add("active");
            break;

        case "view-rewards":
            document.getElementById("nav-rewards")?.classList.add("active");
            break;

        case "view-flash":
            document.getElementById("nav-flash")?.classList.add("active");
            break;

        case "view-historique":
            document.getElementById("nav-historique")?.classList.add("active");
            break;

        case "view-profil":
            document.getElementById("nav-profil")?.classList.add("active");
            break;
    }
}

function initialiserNavigation() {
    let liens = [
        { id: "nav-dashboard", vue: "view-dashboard" },
        { id: "nav-offres", vue: "view-offres" },
        { id: "nav-simulation", vue: "view-simulation" },
        { id: "nav-rewards", vue: "view-rewards" },
        { id: "nav-flash", vue: "view-flash" },
        { id: "nav-historique", vue: "view-historique" },
        { id: "nav-profil", vue: "view-profil" }
    ];

    liens.forEach(lien => {
        let btn = document.getElementById(lien.id);
        if (btn) {
            btn.addEventListener("click", () => {
                afficherVue(lien.vue);
            });
        }
    });

    let btnHamburger = document.getElementById("hamburger-btn");
    let menuLinks = document.getElementById("navbar-links");
    if (btnHamburger && menuLinks) {
        btnHamburger.addEventListener("click", () => {
            menuLinks.classList.toggle("open");
        });
    }

    window.addEventListener("popstate", () => {
        let chemin = window.location.pathname.replace(/^\/+/, "").toLowerCase();
        if (!estConnecte()) {
            afficherVue(chemin === "register" ? "view-register" : "view-login", false);
            return;
        }

        let vue = "view-" + chemin;
        if (toutesLesVues.includes(vue)) {
            afficherVue(vue, false);
        } else {
            afficherVue("view-dashboard", false);
        }
    });
}

export { afficherVue, afficherNavbar, masquerNavbar, mettreajourNavbar, initialiserNavigation };
