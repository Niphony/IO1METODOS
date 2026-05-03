function esquinaNoroeste(oferta, demanda) {
    let i = 0, j = 0;
    let pasos = [];
    let asignacion = Array(oferta.length)
        .fill()
        .map(() => Array(demanda.length).fill(0));

    while (i < oferta.length && j < demanda.length) {
        let x = Math.min(oferta[i], demanda[j]);

        asignacion[i][j] = x;

        pasos.push({
            fila: i,
            columna: j,
            cantidad: x,
            oferta: [...oferta],
            demanda: [...demanda]
        });

        oferta[i] -= x;
        demanda[j] -= x;

        if (oferta[i] === 0) i++;
        else j++;
    }

    return { asignacion, pasos };
}
