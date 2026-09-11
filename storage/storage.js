let CLE_UTILISATEUR = "smartbank_user";
let CLE_TRANSACTIONS = "smartbank_transactions";
let CLE_GAINS_SPINNER = "smartbank_gains_spinner";

function sauvegarderUtilisateur(utilisateur){
    localStorage.setItem(CLE_UTILISATEUR , JSON.stringify(utilisateur));
}

function recupererUtilisateur(){
    let data = localStorage.getItem(CLE_UTILISATEUR);
    if(data === null){
        return null 
    }
    return JSON.parse(data);
}

function supprimerUtilisateur(){
    localStorage.removeItem(CLE_UTILISATEUR);
}

function recupererTransactions(){
    let data = localStorage.getItem(CLE_TRANSACTIONS);
    if(data === null){
        return [];
    }
        return JSON.parse(data);
}

function sauvegarderTransaction(list){
    localStorage.setItem(CLE_TRANSACTIONS, JSON.stringify(list));
}

function ajouterTransactions(transaction){
    let list = recupererTransactions();
    list.unshift(transaction);
    sauvegarderTransaction(list);
}

function recupererGainsSpinner() {
    let data = localStorage.getItem(CLE_GAINS_SPINNER);
    if (data === null) {
        return [];
    }
    return JSON.parse(data);
}

function ajouterGainSpinner(gain) {
    let liste = recupererGainsSpinner();
    liste.unshift(gain);
    localStorage.setItem(CLE_GAINS_SPINNER, JSON.stringify(liste));
}

function toutEffacer() {
    localStorage.removeItem(CLE_UTILISATEUR);
    localStorage.removeItem(CLE_TRANSACTIONS);
    localStorage.removeItem(CLE_GAINS_SPINNER);
}

function creerTransactionDefault(){
    let defaut = [
        { titre: "Bonus bienvenue", date: "01/09/2026", montant: 50.00, type: "entree" }
    ];
    sauvegarderTransaction(defaut);
}

export{
    sauvegarderUtilisateur,
    recupererUtilisateur,
    supprimerUtilisateur,
    recupererTransactions,
    sauvegarderTransaction,
    ajouterTransactions,
    recupererGainsSpinner,
    ajouterGainSpinner,
    toutEffacer,
    creerTransactionDefault
};

