function crearTabla() {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);

    let html = "<table>";

    html += "<tr><th></th>";
    for (let j = 0; j < cols; j++) {
        html += `<th>D${j + 1}</th>`;
    }
    html += "<th>Oferta</th></tr>";

    for (let i = 0; i < rows; i++) {
        html += `<tr><th>O${i + 1}</th>`;

        for (let j = 0; j < cols; j++) {
            html += `<td>
                <input type="number" id="c_${i}_${j}" value="0">
            </td>`;
        }

        html += `<td>
            <input type="number" id="s_${i}" value="0">
        </td>`;
        html += "</tr>";
    }

    html += "<tr><th>Demanda</th>";

    for (let j = 0; j < cols; j++) {
        html += `<td>
            <input type="number" id="d_${j}" value="0">
        </td>`;
    }

    html += "<td></td></tr>";
    html += "</table>";

    document.getElementById("tabla-container").innerHTML = html;
}

function resolver() {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);

    let costos = [];
    let oferta = [];
    let demanda = [];

    for (let i = 0; i < rows; i++) {
        costos[i] = [];
        for (let j = 0; j < cols; j++) {
            costos[i][j] = parseFloat(
                document.getElementById(`c_${i}_${j}`).value
            );
        }
        oferta[i] = parseFloat(
            document.getElementById(`s_${i}`).value
        );
    }

    for (let j = 0; j < cols; j++) {
        demanda[j] = parseFloat(
            document.getElementById(`d_${j}`).value
        );
    }

    esquinaNoroeste(costos, oferta, demanda);
}

function esquinaNoroeste(costos, oferta, demanda) {
    let i = 0;
    let j = 0;
    let total = 0;
    let pasosHTML = "";

    const ofertaTemp = [...oferta];
    const demandaTemp = [...demanda];

    while (i < oferta.length && j < demanda.length) {
        const cantidad = Math.min(ofertaTemp[i], demandaTemp[j]);

        total += cantidad * costos[i][j];

        pasosHTML += `
            <div class="paso">
                <h3>Paso ${i + j + 1}</h3>
                <p>
                    Asignar <strong>${cantidad}</strong> unidades
                    desde O${i + 1} hacia D${j + 1}
                </p>
                <p>
                    Costo unitario: ${costos[i][j]}
                </p>
                <p>
                    Costo acumulado: ${total}
                </p>
            </div>
        `;

        ofertaTemp[i] -= cantidad;
        demandaTemp[j] -= cantidad;

        if (ofertaTemp[i] === 0) {
            i++;
        } else {
            j++;
        }
    }

    pasosHTML += `
        <div class="total">
            Costo Total = ${total}
        </div>
    `;

    document.getElementById("resultado").innerHTML = pasosHTML;
}

crearTabla();
