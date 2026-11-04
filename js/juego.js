let partidas = 0;
let ganadas = 0;
let empatadas = 0;
let perdidas = 0;

function jugar(jugador) {
    const opciones = ["piedra", "papel", "tijera"];
    const maquina = opciones[Math.floor(Math.random() * opciones.length)];
    let mensaje;

    if (jugador === maquina) {
        mensaje = "Empate";
    } else if (
        (jugador === "piedra" && maquina === "tijera") ||
        (jugador === "papel" && maquina === "piedra") ||
        (jugador === "tijera" && maquina === "papel")
    ) {
        mensaje = "Has ganado";
    } else {
        mensaje = "Has perdido";
    }

    partidas++;
    if (mensaje === "Has ganado") {
        ganadas++;
    } else if (mensaje === "Empate") {
        empatadas++;
    } else {
        perdidas++;
    }

    document.getElementById("jugada-jugador").textContent = `Tu jugada: ${jugador}.`;
    document.getElementById("jugada-maquina").textContent = `Jugada de la máquina: ${maquina}.`;
    document.getElementById("mensaje").textContent = mensaje;
    document.getElementById("marcador").textContent = `Partidas jugadas: ${partidas}`;
    document.getElementById("ganadas").textContent = `Ganadas: ${ganadas}`;
    document.getElementById("empatadas").textContent = `Empates: ${empatadas}`;
    document.getElementById("perdidas").textContent = `Derrotas: ${perdidas}`;
}