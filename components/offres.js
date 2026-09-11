function initialiserOffres() {
    var tabCartes = document.getElementById("tab-cartes");
    var tabCredits = document.getElementById("tab-credits");
    var tabEpargne = document.getElementById("tab-epargne");
    var tabAssurance = document.getElementById("tab-assurance");

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
    var tousLesContenus = ["content-cartes", "content-credits", "content-epargne", "content-assurance"];

    for (var i = 0; i < tousLesContenus.length; i++) {
        document.getElementById(tousLesContenus[i]).classList.add("hidden");
    }

    document.getElementById(idContenu).classList.remove("hidden");
}

function activerTab(tabActif) {
    var tousLesTabs = document.querySelectorAll("#view-offres .tab-btn");
    for (var i = 0; i < tousLesTabs.length; i++) {
        tousLesTabs[i].classList.remove("active");
    }
    tabActif.classList.add("active");
}

export { initialiserOffres };
