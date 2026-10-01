// =========================================================
// CALCULADORA DE THÉVENIN / NORTON
// Circuito de ejemplo: fuente V en serie con R1, nodo A
// con R2 a tierra, y RL conectada entre A y tierra.
// =========================================================

let graficaPotencia;

function calcularThevenin() {
    const V = parseFloat(document.getElementById("vFuente").value);
    const R1 = parseFloat(document.getElementById("r1").value);
    const R2 = parseFloat(document.getElementById("r2").value);
    const RL = parseFloat(document.getElementById("rl").value);

    const resultado = document.getElementById("resultadoThevenin");

    if ([V, R1, R2, RL].some(v => isNaN(v))) {
        resultado.innerHTML = "⚠️ Completa los cuatro valores (V, R1, R2, RL).";
        return;
    }

    if (R1 + R2 === 0) {
        resultado.innerHTML = "⚠️ R1 + R2 no puede ser cero.";
        return;
    }

    // --- Thévenin ---
    const Vth = V * R2 / (R1 + R2);
    const Rth = (R1 * R2) / (R1 + R2);

    // --- Norton ---
    const RN = Rth;
    const IN = Rth > 0 ? Vth / Rth : 0;

    // --- Circuito con la carga conectada ---
    const IL = Vth / (Rth + RL);
    const VL = IL * RL;
    const PL = IL * IL * RL;

    const diferenciaRL = Rth > 0 ? Math.abs(RL - Rth) / Rth : 0;
    const notaPotencia = diferenciaRL < 0.05
        ? "✅ RL está muy cerca de Rth: la carga recibe (aprox.) la máxima potencia posible."
        : `ℹ️ Para máxima transferencia de potencia, RL debería ser ≈ ${Rth.toFixed(2)} Ω.`;

    resultado.innerHTML = `
        Vth = ${Vth.toFixed(2)} V &nbsp;·&nbsp; Rth = ${Rth.toFixed(2)} Ω<br>
        IN = ${IN.toFixed(2)} A &nbsp;·&nbsp; RN = ${RN.toFixed(2)} Ω<br>
        Con RL conectada: I = ${IL.toFixed(3)} A, V = ${VL.toFixed(2)} V, P = ${PL.toFixed(3)} W<br>
        ${notaPotencia}
    `;

    dibujarGraficaPotencia(Vth, Rth, RL);
}

function dibujarGraficaPotencia(Vth, Rth, RL) {
    const canvas = document.getElementById("graficaPotencia");
    if (!canvas || typeof Chart === "undefined") return;

    // Rango fijo de puntos para evitar bucles dependientes de Rth=0
    const PUNTOS = 50;
    const limite = Math.max(Rth, RL, 1) * 3 || 100;

    const etiquetas = [];
    const potencias = [];

    for (let i = 0; i <= PUNTOS; i++) {
        const rlPrueba = (limite / PUNTOS) * i || 0.01; // evita dividir entre 0
        const corriente = Vth / (Rth + rlPrueba);
        const potencia = corriente * corriente * rlPrueba;

        etiquetas.push(rlPrueba.toFixed(0));
        potencias.push(potencia.toFixed(3));
    }

    if (graficaPotencia) graficaPotencia.destroy();

    graficaPotencia = new Chart(canvas, {
        type: "line",
        data: {
            labels: etiquetas,
            datasets: [{
                label: "Potencia en RL (W)",
                data: potencias,
                borderColor: "#2563eb",
                backgroundColor: "rgba(37,99,235,0.15)",
                fill: true,
                tension: 0.3,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: "RL (Ω)" } },
                y: { title: { display: true, text: "Potencia (W)" } }
            }
        }
    });
}

// Cálculo inicial con los valores por defecto
document.addEventListener("DOMContentLoaded", calcularThevenin);
