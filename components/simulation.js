function initialiserSimulation(){
    let btnSimuler = document.getElementById("btn-simuler");
    btnSimuler.addEventListener("click" , calculerMensualiste) 
}

function calculerMensualiste(){
        let montant = parseFloat(document.getElementById("sim-montant").value);
        let duree = parseInt(document.getElementById("sim-duree").value);
        let taux = parseFloat(document.getElementById("sim-taux").value);
        let erreur = document.getElementById("sim-error");
        let resultat = document.getElementById("sim-result");

        erreur.classList.add("hidden");
        resultat.classList.add("hidden");
        erreur.textContent = "";

        if(isNaN(montant) || montant <= 0){
            erreur.textContent = "Veuillez entrer un montant possitif";
            erreur.classList.remove("hidden");
            return;
        }

        if (isNaN(duree) || duree <= 0) {
        erreur.textContent = "Veuillez choisir une durée de remboursement.";
        erreur.classList.remove("hidden");
        return;
        }

        let tauxMensuel = (taux / 100) / 12;
        let mensualite;
            if (tauxMensuel === 0) {
            mensualite = montant / duree;
             } else {
            mensualite = montant * (tauxMensuel * Math.pow(1 + tauxMensuel, duree)) / (Math.pow(1 + tauxMensuel, duree) - 1);
            }
            let coutTotal = mensualite * duree;

    document.getElementById("sim-mensualite").textContent = mensualite.toFixed(2) + " EUR";
    document.getElementById("sim-cout-total").textContent = coutTotal.toFixed(2) + " EUR";
    document.getElementById("sim-taux-affiche").textContent = taux + "%";
    document.getElementById("sim-duree-affiche").textContent = duree + " mois";
    resultat.classList.remove("hidden");
}
export { initialiserSimulation };
