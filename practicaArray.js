/*Con los datos de ventas y articulos hay que crear un programa que permita calcular el 
articulo mas vendido en el ultimo cuatrimestre, de mayor 
facturacion en cada mes, el de menor facturacion en cada trimestre*/

let ventas = [
  { idArticulo: 1, cant: 20, Fecha: "2022-02-20" },
  { idArticulo: 2, cant: 30, Fecha: "2022-09-02" },
  { idArticulo: 3, cant: 5, Fecha: "2022-07-10" },
  { idArticulo: 4, cant: 10, Fecha: "2022-06-19" },
  { idArticulo: 5, cant: 13, Fecha: "2022-05-04" },
  { idArticulo: 1, cant: 29, Fecha: "2022-04-22" },
  { idArticulo: 2, cant: 31, Fecha: "2022-03-28" },
  { idArticulo: 3, cant: 20, Fecha: "2022-02-17" },
  { idArticulo: 4, cant: 56, Fecha: "2022-01-18" },
  { idArticulo: 5, cant: 68, Fecha: "2022-12-20" },
  { idArticulo: 1, cant: 31, Fecha: "2022-11-06" },
  { idArticulo: 2, cant: 16, Fecha: "2022-10-08" },
  { idArticulo: 3, cant: 18, Fecha: "2022-09-23" },
  { idArticulo: 4, cant: 38, Fecha: "2022-08-15" },
  { idArticulo: 5, cant: 81, Fecha: "2022-12-14" },
  { idArticulo: 1, cant: 24, Fecha: "2022-11-17" },
  { idArticulo: 5, cant: 3, Fecha: "2022-1-18" },
];

let articulos = [
  { idArticulo: 1, articulo: "Auriculares Bluetooth", precio: 7000 },
  { idArticulo: 2, articulo: "Parlante Boom3", precio: 20000 },
  { idArticulo: 3, articulo: "SmartWatch", precio: 8000 },
  { idArticulo: 4, articulo: "Teclado con mouse", precio: 10000 },
  { idArticulo: 5, articulo: "Monitor", precio: 15000 },
];

//Devuelve el mes de la fecha que se le ingresa

const mesVenta = (Fecha) => {
  return parseInt(Fecha.substring(5, 7));
};

//Devuelve el articulo que se le pide mediante el "id"
const returnArticulo = (id) => {
  let articulo = articulos.filter((a) => a.idArticulo === id);
  return articulo[0];
};

//Crea el array "ventasArticulos" donde se encuentra la información de ventas junto al nombre del articulo y lo que facturo por venta

let ventasArticulos = ventas.map((venta) => {
  let objArt = returnArticulo(venta.idArticulo);

  return {
    ...venta,
    articulo: objArt.articulo,
    facturacion: objArt.precio * venta.cant,
  };
});

//Crea un array llamado "totalArticulosCuatrimestre" donde se muestran las ganancias de cada producto en el ultimo cuatrimestre

const addCutrimestre = () => {
  let cantidadVentaArticulo = 0;
  let totalArticulosCuatrimestre = [];

  for (let nroArticulo = 1; nroArticulo <= articulos.length; nroArticulo++) {
    for (let articulo = 0; articulo < ventasArticulos.length; articulo++) {
      if (
        mesVenta(ventasArticulos[articulo].Fecha) === 9 ||
        mesVenta(ventasArticulos[articulo].Fecha) === 10 ||
        mesVenta(ventasArticulos[articulo].Fecha) === 11 ||
        mesVenta(ventasArticulos[articulo].Fecha) === 12
      ) {
        if (nroArticulo == ventasArticulos[articulo].idArticulo) {
          cantidadVentaArticulo += ventasArticulos[articulo].cant;
        }
      }
    }
    totalArticulosCuatrimestre.push({
      nroArticulo: nroArticulo,
      cantidadVenta: cantidadVentaArticulo,
    });
    cantidadVentaArticulo = 0;
  }

  //Calcula con el array "totalArticulosCuatrimestre" cual articulo genero mas ventas en el ultimo cuatrimestre

  let artMasVendidoCuatrimestre = [{ articulo: 0, cantidadVenta: 0 }];

  for (let x = 0; x < totalArticulosCuatrimestre.length; x++) {
    if (
      totalArticulosCuatrimestre[x].cantidadVenta >
      artMasVendidoCuatrimestre[0].cantidadVenta
    ) {
      artMasVendidoCuatrimestre[0].articulo =
        totalArticulosCuatrimestre[x].nroArticulo;
      artMasVendidoCuatrimestre[0].cantidadVenta =
        totalArticulosCuatrimestre[x].cantidadVenta;
    }
  }
  let lista = document.getElementById("lista");
  let fila = document.createElement("tr");
  fila.innerHTML = `
        <td class="has-text-centered">${
          artMasVendidoCuatrimestre[0].articulo
        }</td>
        <td class="has-text-centered">${
          returnArticulo(artMasVendidoCuatrimestre[0].articulo).articulo
        }</td>
        <td class="has-text-centered">${
          artMasVendidoCuatrimestre[0].cantidadVenta
        }</td>`;
  lista.appendChild(fila);
};

//Crea el array ventasMesArticulos donde guarda las ganancias de cada artículo en cada mes

const mesMasGanancia = () => {
let gananciaArticuloMes = 0;
let ventasMesArticulos = [];

for (let mes = 1; mes <= 12; mes++) {
  for (let nroArticulos = 1; nroArticulos <= articulos.length; nroArticulos++) {
    for (let Articulo = 0; Articulo < ventasArticulos.length; Articulo++) {
      if (mesVenta(ventasArticulos[Articulo].Fecha) === mes) {
        if (nroArticulos == ventasArticulos[Articulo].idArticulo) {
          gananciaArticuloMes += ventasArticulos[Articulo].facturacion;
        }
      }
    }
    ventasMesArticulos.push({
      idArticulo: nroArticulos,
      ganancia: gananciaArticuloMes,
      mes: mes
    });
    gananciaArticuloMes = 0;
  }
}

//Con el array ventasMesArticulos crea el array mayorGananciaMes donde guarda el artículo mas vendido en cada mes
let mayorGananciaMes = []
let VentasMes = [{articulo: 0, ganancia: ventasMesArticulos[0].ganancia}]

for (let mes = 1; mes <= 12; mes++) {
  for (let elemento = 0; elemento < ventasMesArticulos.length; elemento++) {
    if(ventasMesArticulos[elemento].mes === mes){
      if(ventasMesArticulos[elemento].ganancia >= VentasMes[0].ganancia){
        VentasMes[0].articulo = ventasMesArticulos[elemento].idArticulo
        VentasMes[0].ganancia = ventasMesArticulos[elemento].ganancia
      }
    }
  }
  mayorGananciaMes.push({
    articulo: VentasMes[0].articulo,
    ganancia: VentasMes[0].ganancia,
    mes: mes
  })
  VentasMes[0].ganancia = ventasMesArticulos[0].ganancia
}

let lista = document.getElementById("lista");
  for (let i = 0; i < mayorGananciaMes.length; i++) {
    let fila = document.createElement("tr");
      fila.innerHTML = `
      <td class="has-text-centered">${
        mayorGananciaMes[i].mes
      }</td>
      <td class="has-text-centered">${
        mayorGananciaMes[i].articulo
      }</td>
      <td class="has-text-centered">${
        returnArticulo(mayorGananciaMes[i].articulo).articulo
      }</td>
      <td class="has-text-centered">$${
        mayorGananciaMes[i].ganancia
      }</td>`;
  lista.appendChild(fila);
  }
}

//Calcula la facturación de cada producto en el primer trimestre

const menorGananciaTrimestres = () => {

let gananciaArticuloTrimestre = 0;
let totalArticulosPrimerTrimestre = [];

for (let nroArticulos = 1; nroArticulos <= articulos.length; nroArticulos++) {
  for (let Articulo = 0; Articulo < ventasArticulos.length; Articulo++) {
    if (
      mesVenta(ventasArticulos[Articulo].Fecha) === 1 ||
      mesVenta(ventasArticulos[Articulo].Fecha) === 2 ||
      mesVenta(ventasArticulos[Articulo].Fecha) === 3
    ) {
      if (nroArticulos == ventasArticulos[Articulo].idArticulo) {
        gananciaArticuloTrimestre += ventasArticulos[Articulo].facturacion;
      }
    }
  }
  totalArticulosPrimerTrimestre.push({
    nroArticulos: nroArticulos,
    ganancia: gananciaArticuloTrimestre,
  });
  gananciaArticuloTrimestre = 0;
}

//Calcula con el array "totalArticulosPrimerTrimestre" cual articulo genero menos ganancia en el primer trimestre

let artMenosGananciaPrimerTrimestre = [
  { articulo: 0, ganancia: totalArticulosPrimerTrimestre[0].ganancia },
];

for (let x = 0; x < totalArticulosPrimerTrimestre.length; x++) {
  if (
    totalArticulosPrimerTrimestre[x].ganancia <=
    artMenosGananciaPrimerTrimestre[0].ganancia
  ) {
    artMenosGananciaPrimerTrimestre[0].articulo =
      totalArticulosPrimerTrimestre[x].nroArticulos;
    artMenosGananciaPrimerTrimestre[0].ganancia =
      totalArticulosPrimerTrimestre[x].ganancia;
  }
}

//Calcula la facturación de cada producto en el segundo trimestre

let totalArticulosSegundoTrimestre = [];

for (let nroArticulos = 1; nroArticulos <= articulos.length; nroArticulos++) {
  for (let Articulo = 0; Articulo < ventasArticulos.length; Articulo++) {
    if (
      mesVenta(ventasArticulos[Articulo].Fecha) === 4 ||
      mesVenta(ventasArticulos[Articulo].Fecha) === 5 ||
      mesVenta(ventasArticulos[Articulo].Fecha) === 6
    ) {
      if (nroArticulos == ventasArticulos[Articulo].idArticulo) {
        gananciaArticuloTrimestre += ventasArticulos[Articulo].facturacion;
      }
    }
  }
  totalArticulosSegundoTrimestre.push({
    nroArticulos: nroArticulos,
    ganancia: gananciaArticuloTrimestre,
  });
  gananciaArticuloTrimestre = 0;
}

//Calcula con el array "totalArticulosSegundoTrimestre" cual articulo genero menos ganancia en el segundo trimestre

let artMenosGananciaSegundoTrimestre = [
  { articulo: 0, ganancia: totalArticulosSegundoTrimestre[0].ganancia },
];

for (let x = 0; x < totalArticulosSegundoTrimestre.length; x++) {
  if (
    totalArticulosSegundoTrimestre[x].ganancia <=
    artMenosGananciaSegundoTrimestre[0].ganancia
  ) {
    artMenosGananciaSegundoTrimestre[0].articulo =
      totalArticulosSegundoTrimestre[x].nroArticulos;
    artMenosGananciaSegundoTrimestre[0].ganancia =
      totalArticulosSegundoTrimestre[x].ganancia;
  }
}

//Calcula la facturación de cada producto en el tercer trimestre

let totalArticulosTercerTrimestre = [];

for (let nroArticulos = 1; nroArticulos <= articulos.length; nroArticulos++) {
  for (let Articulo = 0; Articulo < ventasArticulos.length; Articulo++) {
    if (
      mesVenta(ventasArticulos[Articulo].Fecha) === 7 ||
      mesVenta(ventasArticulos[Articulo].Fecha) === 8 ||
      mesVenta(ventasArticulos[Articulo].Fecha) === 9
    ) {
      if (nroArticulos == ventasArticulos[Articulo].idArticulo) {
        gananciaArticuloTrimestre += ventasArticulos[Articulo].facturacion;
      }
    }
  }
  totalArticulosTercerTrimestre.push({
    nroArticulos: nroArticulos,
    ganancia: gananciaArticuloTrimestre,
  });
  gananciaArticuloTrimestre = 0;
}

//Calcula con el array "totalArticulosTercerTrimestre" cual articulo genero menos ganancia en el tercer trimestre

let artMenosGananciaTercerTrimestre = [
  { articulo: 0, ganancia: totalArticulosTercerTrimestre[0].ganancia },
];

for (let x = 0; x < totalArticulosTercerTrimestre.length; x++) {
  if (
    totalArticulosTercerTrimestre[x].ganancia <=
    artMenosGananciaTercerTrimestre[0].ganancia
  ) {
    artMenosGananciaTercerTrimestre[0].articulo =
      totalArticulosTercerTrimestre[x].nroArticulos;
    artMenosGananciaTercerTrimestre[0].ganancia =
      totalArticulosTercerTrimestre[x].ganancia;
  }
}

//Calcula la facturación de cada producto en el cuarto trimestre

let totalArticulosCuartoTrimestre = [];

for (let nroArticulos = 1; nroArticulos <= articulos.length; nroArticulos++) {
  for (let Articulo = 0; Articulo < ventasArticulos.length; Articulo++) {
    if (
      mesVenta(ventasArticulos[Articulo].Fecha) === 10 ||
      mesVenta(ventasArticulos[Articulo].Fecha) === 11 ||
      mesVenta(ventasArticulos[Articulo].Fecha) === 12
    ) {
      if (nroArticulos == ventasArticulos[Articulo].idArticulo) {
        gananciaArticuloTrimestre += ventasArticulos[Articulo].facturacion;
      }
    }
  }
  totalArticulosCuartoTrimestre.push({
    nroArticulos: nroArticulos,
    ganancia: gananciaArticuloTrimestre,
  });
  gananciaArticuloTrimestre = 0;
}

//Calcula con el array "totalArticulosCuartoTrimestre" cual articulo genero menos ganancia en el cuarto trimestre

let artMenosGananciaCuartoTrimestre = [
  { articulo: 0, ganancia: totalArticulosCuartoTrimestre[0].ganancia },
];

for (let x = 0; x < totalArticulosCuartoTrimestre.length; x++) {
  if (
    totalArticulosCuartoTrimestre[x].ganancia <=
    artMenosGananciaCuartoTrimestre[0].ganancia
  ) {
    artMenosGananciaCuartoTrimestre[0].articulo =
      totalArticulosCuartoTrimestre[x].nroArticulos;
    artMenosGananciaCuartoTrimestre[0].ganancia =
      totalArticulosCuartoTrimestre[x].ganancia;
  }
}

let lista = document.getElementById("lista");
  let fila = document.createElement("tr");
  fila.innerHTML = `
        <td class="has-text-centered">
         Primer Trimestre</td>
        <td class="has-text-centered">${
          artMenosGananciaPrimerTrimestre[0].articulo
        }</td>
        <td class="has-text-centered">${
          returnArticulo(artMenosGananciaPrimerTrimestre[0].articulo).articulo
        }</td>
        <td class="has-text-centered">${
          artMenosGananciaPrimerTrimestre[0].ganancia
        }</td>`;
  lista.appendChild(fila);

  fila = document.createElement("tr");
  fila.innerHTML = `
        <td class="has-text-centered">
          Segundo Trimestre</td>
        <td class="has-text-centered">${
          artMenosGananciaSegundoTrimestre[0].articulo
        }</td>
        <td class="has-text-centered">${
          returnArticulo(artMenosGananciaSegundoTrimestre[0].articulo).articulo
        }</td>
        <td class="has-text-centered">${
          artMenosGananciaSegundoTrimestre[0].ganancia
        }</td>`;
  lista.appendChild(fila);

  fila = document.createElement("tr");
  fila.innerHTML = `
        <td class="has-text-centered">
          Tercer Trimestre</td>
        <td class="has-text-centered">${
          artMenosGananciaTercerTrimestre[0].articulo
        }</td>
        <td class="has-text-centered">${
          returnArticulo(artMenosGananciaTercerTrimestre[0].articulo).articulo
        }</td>
        <td class="has-text-centered">${
          artMenosGananciaTercerTrimestre[0].ganancia
        }</td>`;
  lista.appendChild(fila);

  fila = document.createElement("tr");
  fila.innerHTML = `
        <td class="has-text-centered">
         Cuarto Trimestre</td>
        <td class="has-text-centered">${
          artMenosGananciaCuartoTrimestre[0].articulo
        }</td>
        <td class="has-text-centered">${
          returnArticulo(artMenosGananciaCuartoTrimestre[0].articulo).articulo
        }</td>
        <td class="has-text-centered">${
          artMenosGananciaCuartoTrimestre[0].ganancia
        }</td>`;
  lista.appendChild(fila);

  
}

  //Calcula cual fue el articulo con mayor facturación en el año

  const mayorGananciaAño = () => {
  
  let gananciaArticuloAño = 0;
  let articulosGananciaTotal = [];
  
  for (let nroArticulo = 1; nroArticulo <= articulos.length; nroArticulo++) {
    for (let articulo = 0; articulo < ventasArticulos.length; articulo++) {
      if (nroArticulo == ventasArticulos[articulo].idArticulo) {
        gananciaArticuloAño += ventasArticulos[articulo].facturacion;
      }
    }
    articulosGananciaTotal.push({
      nroArticulo: nroArticulo,
      ganancia: gananciaArticuloAño,
    });
    gananciaArticuloAño = 0;
  }
  
  let artMasGananciaAño = [{ idArticulo: 0, ganancia: 0 }];
  
  for (let art = 0; art < articulosGananciaTotal.length; art++) {
    if (articulosGananciaTotal[art].ganancia > artMasGananciaAño[0].ganancia) {
      artMasGananciaAño[0].idArticulo = articulosGananciaTotal[art].nroArticulo;
      artMasGananciaAño[0].ganancia = articulosGananciaTotal[art].ganancia;
    }
  }

  let lista = document.getElementById("lista");
    let fila = document.createElement("tr");
      fila.innerHTML = `
     
      <td class="has-text-centered">${
        artMasGananciaAño[0].idArticulo
      }</td>
      <td class="has-text-centered">${
        returnArticulo(artMasGananciaAño[0].idArticulo).articulo
      }</td>
      <td class="has-text-centered">$${
        artMasGananciaAño[0].ganancia
      }</td>`;
  lista.appendChild(fila);
}