import { recupererUtilisateur, sauvegarderUtilisateur, ajouterGainSpinner, recupererGainsSpinner } from "../storage/storage.js";

let rotationActuelle = 0;
let enTrainDeTourner = false;

// 1. Mettre a jour les points et l'historique des gains
function chargerRewards() {
    let utilisateur = recupererUtilisateur();
    if (utilisateur !== null) {
        let pts = utilisateur.points !== undefined ? utilisateur.points : 500;
        let pointsElem = document.getElementById("points-actuels");
        if (pointsElem) {
            pointsElem.textContent = pts + " pts";
        }
    }

    // Charger l'historique des gains
    let conteneur = document.getElementById("rewards-history");
    if (!conteneur) return;

    let gains = recupererGainsSpinner();
    if (gains.length > 0) {
        conteneur.innerHTML = "";
        for (let i = 0; i < gains.length; i++) {
            let g = gains[i];
            let item = document.createElement("div");
            item.className = "history-item";
            item.innerHTML =
                '<div class="history-item-left">' +
                    '<span class="history-item-title">' + g.titre + '</span>' +
                    '<span class="history-item-date">' + g.date + '</span>' +
                '</div>' +
                '<span class="history-item-amount green">+' + g.points + ' pts</span>';
            conteneur.appendChild(item);
        }
    }
}

// 2. Faire tourner la roue
function tournerRoue() {
    if (enTrainDeTourner) return;

    let wheel = document.getElementById("spinner-wheel");
    let btnSpin = document.getElementById("btn-spin");
    let spinResult = document.getElementById("spin-result");
    let spinResultText = document.getElementById("spin-result-text");

    if (!wheel) return;

    enTrainDeTourner = true;
    btnSpin.disabled = true;
    spinResult.classList.add("hidden");

    // Les 6 recompenses possibles
    let lots = [
        { titre: "50 points", points: 50 },
        { titre: "100 points", points: 100 },
        { titre: "Cashback 5 EUR", points: 50 },
        { titre: "200 points", points: 200 },
        { titre: "Rejouer", points: 0 },
        { titre: "Cadeau surprise", points: 150 }
    ];

    // Choisir un lot au hasard
    let indexGagnant = Math.floor(Math.random() * lots.length);
    let lotGagne = lots[indexGagnant];

    // Ajouter au moins 5 tours complets (1800 deg) plus l'angle du segment
    let degresSupplementaires = 1800 + (indexGagnant * 60) + Math.floor(Math.random() * 30);
    rotationActuelle += degresSupplementaires;

    wheel.style.transition = "transform 3s cubic-bezier(0.2, 0.8, 0.3, 1)";
    wheel.style.transform = "rotate(" + rotationActuelle + "deg)";

    // Attendre la fin de l'animation (3 secondes)
    setTimeout(function() {
        enTrainDeTourner = false;
        btnSpin.disabled = false;

        // Afficher le resultat
        if (lotGagne.points > 0) {
            spinResultText.textContent = "Félicitations ! Vous avez gagné : " + lotGagne.titre + " (+" + lotGagne.points + " pts) !";
        } else {
            spinResultText.textContent = "Vous avez obtenu : Rejouer ! Tentez encore votre chance.";
        }
        spinResult.classList.remove("hidden");

        // Mettre a jour les points de l'utilisateur
        let utilisateur = recupererUtilisateur();
        if (utilisateur !== null) {
            if (utilisateur.points === undefined) {
                utilisateur.points = 500;
            }
            utilisateur.points += lotGagne.points;
            sauvegarderUtilisateur(utilisateur);

            // Enregistrer dans l'historique des gains
            let gain = {
                titre: lotGagne.titre,
                points: lotGagne.points,
                date: new Date().toLocaleDateString("fr-FR")
            };
            ajouterGainSpinner(gain);

            // Recharger l'affichage des points et de l'historique
            chargerRewards();
        }
    }, 3000);
}

function initialiserRewards() {
    let btnSpin = document.getElementById("btn-spin");
    if (btnSpin) {
        btnSpin.addEventListener("click", tournerRoue);
    }
    chargerRewards();
}

export { chargerRewards, initialiserRewards };
