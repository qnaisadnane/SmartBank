async function hacherMotDePasse(motDePasse) {
    let encoder = new TextEncoder();
    let data = encoder.encode(motDePasse);
    let hashBuffer = await crypto.subtle.digest("SHA-256", data);
    let hashArray = Array.from(new Uint8Array(hashBuffer));
    let hashHex = hashArray.map(function(b) {
        return b.toString(16).padStart(2, "0");
    }).join("");
    return hashHex;
}
async function verifierMotDePasse(motDePasseSaisi, hashStocke) {
    let hashSaisi = await hacherMotDePasse(motDePasseSaisi);
    return hashSaisi === hashStocke;
}
export { hacherMotDePasse, verifierMotDePasse };