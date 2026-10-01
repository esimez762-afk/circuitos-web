// =========================================================
// GLOSARIO DE TÉRMINOS
// =========================================================
// Para agregar un término nuevo, copia un objeto de la lista
// y cambia su texto. Aparecerá automáticamente ordenado y
// se podrá buscar con el campo de arriba.
// =========================================================

const TERMINOS = [
    { nombre: "Voltaje (V)", definicion: "Diferencia de potencial eléctrico entre dos puntos; es lo que impulsa a los electrones a moverse. Se mide en volts (V)." },
    { nombre: "Corriente (I)", definicion: "Flujo de electrones a través de un conductor por unidad de tiempo. Se mide en amperes (A)." },
    { nombre: "Resistencia (R)", definicion: "Oposición de un material al paso de la corriente eléctrica. Se mide en ohms (Ω)." },
    { nombre: "Ley de Ohm", definicion: "Relación fundamental entre voltaje, corriente y resistencia: V = I × R." },
    { nombre: "Impedancia (Z)", definicion: "Oposición total al paso de corriente alterna, combinando resistencia y reactancia: Z = √(R² + (XL − XC)²)." },
    { nombre: "Reactancia inductiva (XL)", definicion: "Oposición que presenta un inductor a la corriente alterna; aumenta con la frecuencia: XL = 2πfL." },
    { nombre: "Reactancia capacitiva (XC)", definicion: "Oposición que presenta un capacitor a la corriente alterna; disminuye con la frecuencia: XC = 1 / (2πfC)." },
    { nombre: "Frecuencia (f)", definicion: "Número de ciclos que completa una señal en un segundo. Se mide en Hertz (Hz)." },
    { nombre: "Periodo (T)", definicion: "Tiempo que tarda una señal en completar un ciclo completo. Es el inverso de la frecuencia: T = 1/f." },
    { nombre: "Valor pico (Vmax)", definicion: "Amplitud máxima que alcanza una señal alterna, medida desde cero hasta la cresta de la onda." },
    { nombre: "Valor pico a pico (Vpp)", definicion: "Diferencia entre el valor máximo y el valor mínimo de una señal: Vpp = 2 × Vmax." },
    { nombre: "Valor eficaz (RMS)", definicion: "Valor de corriente directa que produciría el mismo efecto de potencia que la señal alterna: Vrms = Vmax / √2." },
    { nombre: "Potencia activa (P)", definicion: "Potencia realmente consumida o transformada en trabajo útil. Se mide en watts (W)." },
    { nombre: "Potencia reactiva (Q)", definicion: "Potencia que oscila entre la fuente y los elementos reactivos (bobinas y capacitores) sin realizar trabajo útil. Se mide en VAR." },
    { nombre: "Potencia aparente (S)", definicion: "Combinación de la potencia activa y reactiva: S² = P² + Q². Se mide en volt-amperes (VA)." },
    { nombre: "Factor de potencia", definicion: "Relación entre la potencia activa y la aparente (cos φ); indica qué tan eficientemente se usa la energía en un sistema de CA." },
    { nombre: "Desfase (φ)", definicion: "Ángulo de diferencia entre la onda de voltaje y la onda de corriente en un circuito de CA." },
    { nombre: "Parámetros Z", definicion: "Conjunto de parámetros de impedancia que describen una red de dos puertos en función del voltaje y la corriente en sus terminales." },
    { nombre: "Parámetros Y", definicion: "Conjunto de parámetros de admitancia, análogos a los parámetros Z pero expresando la corriente en función del voltaje." },
    { nombre: "Parámetros híbridos (h)", definicion: "Combinación de parámetros usados comúnmente para modelar transistores, mezclando relaciones de voltaje y corriente." }
];

const contenedorTerminos = document.getElementById("listaTerminos");
const buscadorTerminos = document.getElementById("buscarTermino");

function renderTerminos(filtro = "") {
    if (!contenedorTerminos) return;

    const filtroLimpio = filtro.trim().toLowerCase();
    const ordenados = [...TERMINOS].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    const lista = ordenados.filter(t =>
        t.nombre.toLowerCase().includes(filtroLimpio) ||
        t.definicion.toLowerCase().includes(filtroLimpio)
    );

    if (lista.length === 0) {
        contenedorTerminos.innerHTML = `<p class="archivos-vacio">No se encontraron términos para "${filtro}".</p>`;
        return;
    }

    contenedorTerminos.innerHTML = lista.map(t => `
        <div class="resultado-box" style="text-align:left; margin-bottom:12px;">
            <strong>${t.nombre}</strong>
            <p style="margin-top:6px; font-weight:normal; color:var(--texto);">${t.definicion}</p>
        </div>
    `).join("");
}

if (buscadorTerminos) {
    buscadorTerminos.addEventListener("input", () => renderTerminos(buscadorTerminos.value));
}

renderTerminos();
