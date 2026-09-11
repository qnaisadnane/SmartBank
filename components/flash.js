let tempsRestant = 2 * 3600; // 2 heures en secondes
let timerInterval = null;

function lancerTimerFlash() {
    let timerElement = document.getElementById("flash-timer");
    if (!timerElement) return;

    // Si le timer tourne deja, on ne le relance pas
    if (timerInterval !== null) return;

    timerInterval = setInterval(function() {
        if (tempsRestant <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "00:00:00 - Terminé";
            return;
        }

        tempsRestant = tempsRestant - 1;

        let heures = Math.floor(tempsRestant / 3600);
        let minutes = Math.floor((tempsRestant % 3600) / 60);
        let secondes = tempsRestant % 60;

        // Ajouter un zero devant si inferieur a 10
        let h = heures < 10 ? "0" + heures : heures;
        let m = minutes < 10 ? "0" + minutes : minutes;
        let s = secondes < 10 ? "0" + secondes : secondes;

        timerElement.textContent = h + ":" + m + ":" + s;
    }, 1000);
}

function initialiserFlash() {
    lancerTimerFlash();

    // Ecouteur sur les boutons "Saisir l'offre"
    let boutons = document.querySelectorAll("#view-flash .offer-card button");
    for (let i = 0; i < boutons.length; i++) {
        boutons[i].addEventListener("click", function() {
            let titre = this.parentElement.querySelector("h4").textContent;
            alert("Félicitations ! Vous avez profité de l'offre : " + titre);
        });
    }
}

export { initialiserFlash };
