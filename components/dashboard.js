import { recupererUtilisateur , recupererTransactions } from "../storage/storage.js";
import { afficherVue } from "../router/router.js";

function chargerDashboard(){
    let utilisateur = recupererUtilisateur();

    if(utilisateur === null){
        return;
    }
    document.getElementById("dashboard-welcome").textContent = "Bonjour, " + utilisateur.nom;

    document.getElementById("stat-points").textContent = utilisateur.points !== undefined ? utilisateur.points : (utilisateur.point || 0);

    let transactions = recupererTransactions();

    let conteneur = document.getElementById("dashboard-transactions");

    conteneur.innerHTML = "";

    if (transactions.length === 0) {
        conteneur.innerHTML = "<p style='color: var(--text-light); font-size: 0.9rem;'>Aucune transaction pour le moment.</p>";
        return;
    }

    let limite = 3;
    if(transactions.length < 3 ){
        limite = transactions.length;
    }
    for(let i = 0 ; i < limite ; i++){
        let t = transactions[i];

        let couleur = "green";
        let signe = "+";
        if(t.type === "sortie"){
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
            '<span class="history-item-amount ' + couleur + '">' + signe + t.montant.toFixed(2) + ' EUR</span>';
        conteneur.appendChild(item);
    }
    // Bouton hero vers la page offres
    let btnOffres = document.getElementById("hero-btn-offres");
    if (btnOffres) {
        btnOffres.onclick = function() {
            afficherVue("view-offres");
        };
    }
}

export { chargerDashboard };
