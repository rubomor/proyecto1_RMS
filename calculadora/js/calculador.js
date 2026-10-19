let resultadoMostrado = false;

function obtenerPantalla() {
    return document.getElementById("pantalla");
}

function escribir(valor) {
    const pantalla = obtenerPantalla();

    if (!/^(?:\d|[.+\-*/])$/.test(valor)) {
        return;
    }

    if (pantalla.value === "Error") {
        pantalla.value = "0";
        resultadoMostrado = false;
    } else if (resultadoMostrado) {
        if (/\d|\./.test(valor)) {
            pantalla.value = "0";
        }
        resultadoMostrado = false;
    }

    const ultimoCaracter = pantalla.value.slice(-1);

    if (valor === ".") {
        const numeroActual = pantalla.value.split(/[+\-*/]/).pop();
        if (numeroActual.includes(".")) {
            return;
        }
        pantalla.value += numeroActual ? "." : "0.";
        return;
    }

    if (/^\d$/.test(valor)) {
        pantalla.value = pantalla.value === "0" ? valor : pantalla.value + valor;
        return;
    }

    if (/[+\-*/]/.test(ultimoCaracter)) {
        if (valor === "-" && ultimoCaracter !== "-") {
            pantalla.value += valor;
        } else if (ultimoCaracter === "-" && pantalla.value.length > 1 && /[+\-*/]/.test(pantalla.value.slice(-2, -1))) {
            pantalla.value = pantalla.value.slice(0, -2) + valor;
        } else {
            pantalla.value = pantalla.value.slice(0, -1) + valor;
        }
        return;
    }

    pantalla.value += valor;
}

function evaluar(expresion) {
    const tokens = expresion.match(/\d*\.?\d+|[+\-*/]/g);
    if (!tokens || tokens.join("") !== expresion || /[+\-*/.]$/.test(expresion)) {
        throw new Error("Expresión incompleta");
    }

    let posicion = 0;

    function factor() {
        let signo = 1;
        while (tokens[posicion] === "+" || tokens[posicion] === "-") {
            if (tokens[posicion] === "-") {
                signo *= -1;
            }
            posicion++;
        }

        const valor = Number(tokens[posicion++]);
        if (!Number.isFinite(valor)) {
            throw new Error("Número no válido");
        }
        return signo * valor;
    }

    function termino() {
        let valor = factor();
        while (tokens[posicion] === "*" || tokens[posicion] === "/") {
            const operador = tokens[posicion++];
            const siguiente = factor();
            if (operador === "/" && siguiente === 0) {
                throw new Error("División por cero");
            }
            valor = operador === "*" ? valor * siguiente : valor / siguiente;
        }
        return valor;
    }

    function expresionCompleta() {
        let valor = termino();
        while (tokens[posicion] === "+" || tokens[posicion] === "-") {
            const operador = tokens[posicion++];
            const siguiente = termino();
            valor = operador === "+" ? valor + siguiente : valor - siguiente;
        }
        return valor;
    }

    const resultado = expresionCompleta();
    if (posicion !== tokens.length || !Number.isFinite(resultado)) {
        throw new Error("Expresión no válida");
    }
    return Number.parseFloat(resultado.toPrecision(12)).toString();
}

function calcular() {
    const pantalla = obtenerPantalla();
    try {
        pantalla.value = evaluar(pantalla.value);
        resultadoMostrado = true;
    } catch {
        pantalla.value = "Error";
        resultadoMostrado = true;
    }
}

function borrar() {
    obtenerPantalla().value = "0";
    resultadoMostrado = false;
}

document.addEventListener("keydown", (evento) => {
    if (/^\d$/.test(evento.key) || ["+", "-", "*", "/", "."].includes(evento.key)) {
        escribir(evento.key);
    } else if (evento.key === "Enter" || evento.key === "=") {
        calcular();
    } else if (evento.key === "Escape" || evento.key === "Backspace") {
        borrar();
    }
});
