// Declaración de variables globales
let totalGastos = 0;
let numero = 1;
let id = 0;
let arrayGastos = [];
let presupuestoTotal = 0;
let saldoTotal = 0;

// Función para obtener el ID único de cada gasto
const getId = () => {
  id++;
  return id;
}

// Función para crear un objeto de gasto
const getGastosObj = (nombre, valor) => {
  const newGasto = {
    id: getId(), // Obtenemos un ID único
    numero: numero, // Asignamos un número en orden
    nombre: nombre,
    valor: parseInt(valor)
  }
  numero++; // Aumentamos el contador de número
  return JSON.parse(JSON.stringify(newGasto)); // Clonamos el objeto para evitar referencias
}

// Función para crear el HTML de una nueva fila de gasto
const templateAddGastos = (gastos) => {
  const tbody = document.querySelector(".containerTbody");
  tbody.innerHTML += `
  <tr id="elemento${gastos.id}">
    <td>${gastos.numero}</td>
    <td>${gastos.nombre}</td>
    <td>$${gastos.valor.toLocaleString("es-CL")}</td>
    <td>
      <a href="#" onclick="deleteIcon(${gastos.id})" ><i class="fa-regular fa-circle-xmark" style="color: #000;" onmouseover="this.style.color='#d21414'"
      onmouseout="this.style.color='#000'"></i></a>
    </td>
  </tr>
  `;
}

// Evento del botón "Agregar Presupuesto"
let btnPresupuesto = document.querySelector("#agregarPresup");
btnPresupuesto.addEventListener("click", () => {
  let presupValue = parseInt(document.querySelector("#presupInput").value);

  presupuestoTotal = presupValue; // Asignamos el valor del presupuesto total
  saldoTotal = presupuestoTotal - totalGastos; // Calculamos el saldo total

  // Establecemos el contenido del elemento en "$"
  document.querySelector(".presupValue").innerText = "$0";

  // Si el valor de gasto no es un número o es menor o igual a 0, se muestra una alerta y se vacía el valor del input valor
  if (isNaN(presupValue) || presupValue <= 0) {
    alert("Debe ingresar un número mayor a 0");
    document.querySelector(".presupValue").innerText = "$0";
  } else {
    // Si se ingresó un número, lo formateamos y lo mostramos en el elemento
    document.querySelector(".presupValue").innerText = `$${presupuestoTotal.toLocaleString("es-CL")}`;
    document.querySelector(".saldoValue").innerText = `$${saldoTotal.toLocaleString("es-CL")}`;
  }
  // Dejamos vacio el input
  document.querySelector("#presupInput").value = "";
})


// Evento del botón "Agregar Gasto"
let btnGastos = document.querySelector("#agregarGasto");
btnGastos.addEventListener("click", () => {
  // Obtenemos el valor del input de nombre de gasto
  let gastosNombre = document.querySelector("#nombreInput").value;

  // Obtenemos el valor del input de valor de gasto y lo convertimos a entero con parseInt
  let gastosValor = parseInt(document.querySelector("#valorInput").value);

  // Validamos que se hayan ingresado números o mayor a 0
  if (isNaN(gastosValor) || gastosValor <= 0) {
    // Si el valor de gasto no es un número o es menor o igual a 0, se muestra una alerta y se vacía el valor del input valor
    alert("Debe ingresar un número mayor a 0");
    document.querySelector("#valorInput").value = "";
  } else {
    // Si el valor de gasto es válido, se crea un objeto gastos con la función getGastosObj y se agrega al array de gastos
    let gastos = getGastosObj(gastosNombre, gastosValor);
    // Se actualiza el total de gastos sumando el valor del nuevo gasto
    totalGastos += gastos.valor;
    arrayGastos.push(gastos);

    // Se actualiza el valor mostrado del total de gastos en el HTML
    document.querySelector(".gastosValue").innerText = `$${totalGastos.toLocaleString("es-CL")}`;

    // Se calcula el total de saldo restando el total de gastos del presupuesto total
    let totalSaldo = (presupuestoTotal - totalGastos);

    // Se actualiza el valor mostrado del saldo en el HTML

    document.querySelector(".saldoValue").innerText = `$${totalSaldo.toLocaleString("es-CL")}`;
    // Se vacían los valores de los inputs nombre y valor
    document.querySelector("#nombreInput").value = "";
    document.querySelector("#valorInput").value = "";

    // Se agrega el gasto al template de lista de gastos en el HTML
    templateAddGastos(gastos);
  }
})



// Función que se ejecuta al presionar el botón de eliminar en una fila de gastos
const deleteIcon = (id) => {
  // Se filtra el array de gastos para eliminar el gasto con el id correspondiente
  arrayGastos = arrayGastos.filter((gastos) => {
    if (gastos.id == id) {
      // Se busca y remueve la fila correspondiente a este gasto
      let borrarFila = document.querySelector("#elemento" + gastos.id);
      borrarFila.remove();
      // Se retorna falso para eliminar este elemento del array
      return false
    }
    // Se retorna verdadero para mantener el resto de elementos en el array
    return true;
  });

  // Se actualizan los números de las filas en la tabla
  const tbody = document.querySelector(".containerTbody");
  const filas = tbody.querySelectorAll("tr");
  // Recorrer cada fila con un ciclo forEach y pasar el índice (index)
  filas.forEach((fila, index) => {
    // Obtener el primer elemento td de cada fila (el número de la fila)
    const numero = fila.querySelector("td:first-child");
    // Actualizar el contenido del número con el índice + 1 (ya que el índice empieza en 0)
    numero.textContent = index + 1;
  });

  // Se recalcula el total de gastos y el saldo disponible
  totalGastos = arrayGastos.reduce((total, valor) => total + valor.valor, 0)
  saldoTotal = presupuestoTotal - totalGastos;

  document.querySelector(".gastosValue").innerText = `$${totalGastos.toLocaleString("es-CL")}`;
  document.querySelector(".saldoValue").innerText = `$${saldoTotal.toLocaleString("es-CL")}`;
}


