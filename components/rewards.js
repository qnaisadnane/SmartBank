import { recupererUtilisateur, sauvegarderUtilisateur, ajouterGainSpinner, recupererGainsSpinner } from "../storage/storage.js";

let rotationActuelle = 0;
let enTrainDeTourner = false;

const lots = [
    { titre: "50 points", points: 50, couleur: "#2563eb", classe: "blue" },
    { titre: "100 points", points: 100, couleur: "#8b5cf6", classe: "purple" },
    { titre: "Cashback 5 EUR", points: 50, couleur: "#10b981", classe: "cashback" },
    { titre: "200 points (Jackpot)", points: 200, couleur: "#f59e0b", classe: "gold" },
    { titre: "Rejouer", points: 0, couleur: "#06b6d4", classe: "replay" },
    { titre: "Cadeau surprise", points: 150, couleur: "#ec4899", classe: "surprise" }
];

function chargerRewards() {
    let utilisateur = recupererUtilisateur();
    let pts = 500;
    if (utilisateur !== null) {
        pts = utilisateur.points !== undefined ? utilisateur.points : 500;
        let pointsElem = document.getElementById("points-actuels");
        if (pointsElem) {
            pointsElem.textContent = pts + " pts";
        }
    }



    let conteneur = document.getElementById("rewards-history");
    if (!conteneur) return;

    let gains = recupererGainsSpinner();
    if (gains.length > 0) {
        conteneur.innerHTML = "";
        for (let i = 0; i < gains.length; i++) {
            let g = gains[i];
            let item = document.createElement("div");
            item.className = "history-item";

            let classeCouleur = g.classe || "gold";
            if (!g.classe) {
                if (g.titre.includes("50")) classeCouleur = "blue";
                else if (g.titre.includes("100")) classeCouleur = "purple";
                else if (g.titre.includes("Cashback")) classeCouleur = "cashback";
                else if (g.titre.includes("200")) classeCouleur = "gold";
                else if (g.titre.includes("Rejouer")) classeCouleur = "replay";
                else if (g.titre.includes("Surprise")) classeCouleur = "surprise";
            }

            let signe = g.points > 0 ? "+" : "";
            item.innerHTML =
                '<div class="history-item-left">' +
                    '<span class="history-item-title">' + g.titre + '</span>' +
                    '<span class="history-item-date">' + g.date + '</span>' +
                '</div>' +
                '<span class="history-item-amount ' + classeCouleur + '">' + signe + g.points + ' pts</span>';
            conteneur.appendChild(item);
        }
    }
}

function tournerRoue() {
    if (enTrainDeTourner) return;

    let wheel = document.getElementById("spinner-wheel");
    let btnSpin = document.getElementById("btn-spin");
    let spinResult = document.getElementById("spin-result");
    let spinResultText = document.getElementById("spin-result-text");

    if (!wheel) return;

    enTrainDeTourner = true;
    btnSpin.disabled = true;
    spinResult.className = "spin-result hidden";

    let indexGagnant = Math.floor(Math.random() * lots.length);
    let lotGagne = lots[indexGagnant];

    let angleCible = (330 - (indexGagnant * 60) + 360) % 360;
    let variation = Math.floor((Math.random() - 0.5) * 24);
    let angleVise = (angleCible + variation + 360) % 360;

    let toursComplets = 5 * 360; // 1800 deg
    let angleActuelMod = ((rotationActuelle % 360) + 360) % 360;
    let delta = (angleVise - angleActuelMod + 360) % 360;
    if (delta < 180) {
        delta += 360;
    }
    rotationActuelle += toursComplets + delta;

    wheel.style.transition = "transform 3s cubic-bezier(0.2, 0.8, 0.3, 1)";
    wheel.style.transform = "rotate(" + rotationActuelle + "deg)";

    setTimeout(function() {
        enTrainDeTourner = false;
        btnSpin.disabled = false;

        spinResult.className = "spin-result " + lotGagne.classe;

        if (lotGagne.points > 0) {
            spinResultText.innerHTML = "<strong>Félicitations !</strong> Vous avez remporté : <strong>" + lotGagne.titre + "</strong> (+" + lotGagne.points + " pts) !";
        } else {
            spinResultText.innerHTML = "<strong>Seconde chance !</strong> Vous pouvez rejouer immédiatement votre tour !";
        }
        spinResult.classList.remove("hidden");

        
        let utilisateur = recupererUtilisateur();
        if (utilisateur !== null) {
            if (utilisateur.points === undefined) {
                utilisateur.points = 500;
            }
            utilisateur.points += lotGagne.points;
            sauvegarderUtilisateur(utilisateur);

        
            let gain = {
                titre: lotGagne.titre,
                points: lotGagne.points,
                date: new Date().toLocaleDateString("fr-FR"),
                classe: lotGagne.classe
            };
            ajouterGainSpinner(gain);

        
            chargerRewards();
        }
    }, 3000);
}


function initialiserRewards() {
    let btnSpin = document.getElementById("btn-spin");
    if (btnSpin) {
        btnSpin.onclick = tournerRoue;
    }
    chargerRewards();
}

export { chargerRewards, initialiserRewards };
