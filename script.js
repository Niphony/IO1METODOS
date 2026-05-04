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
    let i = 0;   //Oferta                                           //Iniciarlizar var, i ,j total, y para los pasos
    let j = 0;    //Demanda
    let total = 0; //total
    let pasosHTML = "";
    let desbalanceHTML = "";

    const ofertaTemp = [...oferta];  //copias de las variables para usarlas en la rpta y no modificar la comparacion del original
    const demandaTemp = [...demanda];

    while (i < oferta.length && j < demanda.length) {  // mientra i < longitud de la oferta y j igual con la demanda (que no se haya recorrido todo)
        const cantidad = Math.min(ofertaTemp[i], demandaTemp[j]);  //Asigna el min entre oferta u demanda

        total += cantidad * costos[i][j]; //Calculo de la asignación
        desbalance = oferta[i] - demanda[j];

      //COnstruye el log de pasos
      //
      
      desbalanceHTML += `  
      <div class="desbalance">
        <h1>Desbalance ${desbalance}</h1>
       `;

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

        ofertaTemp[i] -= cantidad;  //resta la cantidad a las temporales
        demandaTemp[j] -= cantidad;

        if (ofertaTemp[i] === 0) {
            i++; //si el origen se lleno sigue para abajo
        } else {
            j++; //si no sigue a la derecha tipo matriz
        }
    }
  //Muestra el resultado de los pasos
    pasosHTML += `
        <div class="total">
            Desbalance = ${desbalance}
            Costo Total = ${total}
        </div>
    `;

    document.getElementById("resultado").innerHTML = pasosHTML;
}
//inicializa la tabla de resultado
crearTabla();
