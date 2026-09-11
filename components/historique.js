import { recupererTransactions } from "../storage/storage.js";

function chargerHistorique(filtre = "tout") {
    let conteneur = document.getElementById("historique-list");
    if (!conteneur) return;

    let transactions = recupererTransactions();
    conteneur.innerHTML = "";

    let listeFiltree = [];
    for (let i = 0; i < transactions.length; i++) {
        let t = transactions[i];
        if (filtre === "tout") {
            listeFiltree.push(t);
        } else if (filtre === "entree" && t.type === "entree") {
            listeFiltree.push(t);
        } else if (filtre === "sortie" && t.type === "sortie") {
            listeFiltree.push(t);
        }
    }

    if (listeFiltree.length === 0) {
        conteneur.innerHTML = "<p style='color: var(--text-light); padding: 15px;'>Aucune transaction dans cette catégorie.</p>";
        return;
    }

    for (let i = 0; i < listeFiltree.length; i++) {
        let t = listeFiltree[i];
        let couleur = "green";
        let signe = "+";

        if (t.type === "sortie") {
            couleur = "red";
            signe = "-";
        }

        let item = document.createElement("div");
        item.className = "history-item";
        item.innerHTML =
            '<div class="history-item-left">' +
                '<span class="history-item-title">' + t.titre + '</span>' +
                '<span class="history-item-date">' + t.date + '</span>' +
            '</div>' +
            '<span class="history-item-amount ' + couleur + '">' + signe + Number(t.montant).toFixed(2) + ' EUR</span>';

        conteneur.appendChild(item);
    }
}

function changerOngletActif(boutonClique) {
    let onglets = document.querySelectorAll("#view-historique .tab-btn");
    for (let i = 0; i < onglets.length; i++) {
        onglets[i].classList.remove("active");
    }
    boutonClique.classList.add("active");
}

function initialiserHistorique() {
    let btnTout = document.getElementById("hist-tab-tout");
    let btnEntree = document.getElementById("hist-tab-entree");
    let btnSortie = document.getElementById("hist-tab-sortie");

    if (btnTout && btnEntree && btnSortie) {
        btnTout.addEventListener("click", function() {
            changerOngletActif(btnTout);
            chargerHistorique("tout");
        });

        btnEntree.addEventListener("click", function() {
            changerOngletActif(btnEntree);
            chargerHistorique("entree");
        });

        btnSortie.addEventListener("click", function() {
            changerOngletActif(btnSortie);
            chargerHistorique("sortie");
        });
    }
}

export { chargerHistorique, initialiserHistorique };