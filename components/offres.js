function initialiserOffres() {
    let tabCartes = document.getElementById("tab-cartes");
    let tabCredits = document.getElementById("tab-credits");
    let tabEpargne = document.getElementById("tab-epargne");
    let tabAssurance = document.getElementById("tab-assurance");

    tabCartes.addEventListener("click", function() {
        afficherOnglet("content-cartes");
        activerTab(tabCartes);
    });

    tabCredits.addEventListener("click", function() {
        afficherOnglet("content-credits");
        activerTab(tabCredits);
    });

    tabEpargne.addEventListener("click", function() {
        afficherOnglet("content-epargne");
        activerTab(tabEpargne);
    });

    tabAssurance.addEventListener("click", function() {
        afficherOnglet("content-assurance");
        activerTab(tabAssurance);
    });
}

function afficherOnglet(idContenu) {
    let tousLesContenus = ["content-cartes", "content-credits", "content-epargne", "content-assurance"];

    for (let i = 0; i < tousLesContenus.length; i++) {
        document.getElementById(tousLesContenus[i]).classList.add("hidden");
    }

    document.getElementById(idContenu).classList.remove("hidden");
}

function activerTab(tabActif) {
    let tousLesTabs = document.querySelectorAll("#view-offres .tab-btn");
    for (let i = 0; i < tousLesTabs.length; i++) {
        tousLesTabs[i].classList.remove("active");
    }
    tabActif.classList.add("active");
}

export { initialiserOffres };
