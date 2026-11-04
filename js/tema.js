const claveTema = "tema-pagina";
const alternadorTema = document.querySelector(".alternador-tema");
const temaGuardado = localStorage.getItem(claveTema);
const temaInicial = temaGuardado === "oscuro" ? "oscuro" : "claro";

function aplicarTema(tema) {
    const esOscuro = tema === "oscuro";

    document.documentElement.dataset.tema = tema;
    alternadorTema.setAttribute("aria-pressed", String(esOscuro));
    alternadorTema.textContent = esOscuro ? "Modo claro" : "Modo oscuro";
}

aplicarTema(temaInicial);

alternadorTema.addEventListener("click", () => {
    const nuevoTema = document.documentElement.dataset.tema === "oscuro" ? "claro" : "oscuro";
    localStorage.setItem(claveTema, nuevoTema);
    aplicarTema(nuevoTema);
    alert(`Has cambiado al modo ${nuevoTema}.`);
});