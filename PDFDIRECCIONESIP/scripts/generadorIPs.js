alert("funciona!")

function mostrarDireccionRed() {
    document.getElementById("ip").textContent = "192.168.1.0";
}

function mostrarPuertaEnlace() {
    document.getElementById("ip").textContent = "192.168.1.1";
}

function generarIP() {
    let numero = Math.floor(Math.random() * (254 - 2 + 1)) + 2;
    let ip = "192.168.1." + numero;
    document.getElementById("ip").textContent = ip;
}

function mostrarBroadcast() {
    document.getElementById("ip").textContent = "192.168.1.255";
}

function mostrarMascara() {
    document.getElementById("ip").textContent = "255.255.255.0";
}