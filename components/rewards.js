import { recupererUtilisateur, sauvegarderUtilisateur, ajouterGainSpinner, recupererGainsSpinner } from "../storage/storage.js";

let rotationActuelle = 0;
let enTrainDeTourner = false;

// Configuration des 6 lots avec couleurs adaptees a la valeur de chaque avantage (sans emojis)
const lots = [
    { titre: "50 points", points: 50, couleur: "#2563eb", classe: "blue" },
    { titre: "100 points", points: 100, couleur: "#8b5cf6", classe: "purple" },
    { titre: "Cashback 5 EUR", points: 50, couleur: "#10b981", classe: "cashback" },
    { titre: "200 points (Jackpot)", points: 200, couleur: "#f59e0b", classe: "gold" },
    { titre: "Rejouer", points: 0, couleur: "#06b6d4", classe: "replay" },
    { titre: "Cadeau surprise", points: 150, couleur: "#ec4899", classe: "surprise" }
];

// 1. Mettre a jour les points, l'historique des gains et l'etat des boutons d'avantages
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

    // Mettre a jour les boutons d'avantages selon le solde
    let btnsAvantages = document.querySelectorAll(".btn-benefit");
    btnsAvantages.forEach(btn => {
        let cout = parseInt(btn.getAttribute("data-cost"), 10);
        if (pts < cout) {
            btn.title = "Il vous manque " + (cout - pts) + " pts";
        } else {
            btn.title = "Cliquez pour échanger cet avantage";
        }
    });

    // Charger l'historique des gains avec les couleurs adaptees
    let conteneur = document.getElementById("rewards-history");
    if (!conteneur) return;

    let gains = recupererGainsSpinner();
    if (gains.length > 0) {
        conteneur.innerHTML = "";
        for (let i = 0; i < gains.length; i++) {
            let g = gains[i];
            let item = document.createElement("div");
            item.className = "history-item";

            // Determination de la classe de couleur
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

// 2. Faire tourner la roue avec ciblage precis du segment et couleur adaptee
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

    // Choisir un lot au hasard
    let indexGagnant = Math.floor(Math.random() * lots.length);
    let lotGagne = lots[indexGagnant];

    // Calcul precis de l'angle :
    // Segment 0 (50 pts) : [0, 60], centre 30 deg -> angle roue = 330 deg
    // Segment k : centre (30 + k*60) deg -> angle roue = (330 - k*60) mod 360
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

    // Attendre la fin de l'animation
    setTimeout(function() {
        enTrainDeTourner = false;
        btnSpin.disabled = false;

        // Afficher le resultat avec la couleur adaptee
        spinResult.className = "spin-result " + lotGagne.classe;

        if (lotGagne.points > 0) {
            spinResultText.innerHTML = "<strong>Félicitations !</strong> Vous avez remporté : <strong>" + lotGagne.titre + "</strong> (+" + lotGagne.points + " pts) !";
        } else {
            spinResultText.innerHTML = "<strong>Seconde chance !</strong> Vous pouvez rejouer immédiatement votre tour !";
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
                date: new Date().toLocaleDateString("fr-FR"),
                classe: lotGagne.classe
            };
            ajouterGainSpinner(gain);

            // Recharger l'affichage des points et de l'historique
            chargerRewards();
        }
    }, 3000);
}

// 3. Gestion de l'echange de points contre les avantages
function initialiserEchangesAvantages() {
    let btnsAvantages = document.querySelectorAll(".btn-benefit");
    btnsAvantages.forEach(btn => {
        btn.addEventListener("click", function() {
            let cout = parseInt(this.getAttribute("data-cost"), 10);
            let nomAvantage = this.getAttribute("data-reward");
            let utilisateur = recupererUtilisateur();

            if (!utilisateur) return;
            let solde = utilisateur.points !== undefined ? utilisateur.points : 500;

            if (solde < cout) {
                alert("Solde insuffisant ! Il vous faut " + cout + " points pour cet avantage (solde actuel : " + solde + " pts).");
                return;
            }

            let confirmer = confirm("Confirmez-vous l'échange de " + cout + " points contre l'avantage : \"" + nomAvantage + "\" ?");
            if (confirmer) {
                utilisateur.points = solde - cout;
                sauvegarderUtilisateur(utilisateur);

                // Ajouter dans l'historique
                let gain = {
                    titre: "Échange : " + nomAvantage,
                    points: -cout,
                    date: new Date().toLocaleDateString("fr-FR"),
                    classe: "purple"
                };
                ajouterGainSpinner(gain);

                alert("Bravo ! L'avantage \"" + nomAvantage + "\" a été activé sur votre compte.");
                chargerRewards();
            }
        });
    });
}

function initialiserRewards() {
    let btnSpin = document.getElementById("btn-spin");
    if (btnSpin) {
        btnSpin.onclick = tournerRoue;
    }
    initialiserEchangesAvantages();
    chargerRewards();
}

export { chargerRewards, initialiserRewards };
