function eliminarRow(tipo, row){
    const arrLocalStore = JSON.parse(localStorage.getItem((tipo === 'P') ? "proveedores" :
                                                          (tipo === 'A') ? "articulos" : 
                                                          "ordenes-compras")) || [];
    
    const arrFiltrado = arrLocalStore.filter( r => r.id !== row.id);
    
    localStorage.setItem((tipo === 'P') ? "proveedores" :
                         (tipo === 'A') ? "articulos" : 
                                          "ordenes-compras", JSON.stringify(arrFiltrado));
}

function imprimirTabla(tipo) { // tipo => proveedores, articulos, oc
    const arrLocalStore = JSON.parse(localStorage.getItem((tipo === 'P') ? "proveedores" :
                                                          (tipo === 'A') ? "articulos" : 
                                                          "ordenes-compras")) || [];
    let contenedor = document.getElementById("contenedor-tabla");
    
    if(arrLocalStore.length === 0){
        contenedor.style.display = "none";
        return false;
    }else{
        contenedor.style.display = "block";
    }

    contenedor.innerHTML = `<div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                    Tabla de ${(tipo === 'P') ? "Proveedores" :
                                               (tipo === 'A') ? "Articulos" : "Orden de Compra"}                                 
                            </div>`; 

    // Creo el div que va a tener
    let tabla = document.createElement("div");
  
    // A ese div le agregaremos todos los datos de la tabla
    tabla.innerHTML = `
        <table id="datatablesSimple" class="card-body">
            <thead>         
                <tr>
                ${
                    (tipo === 'P')?
                        `
                        <th>Cod</th>
                        <th>Razon Social</th>
                        <th>Rubro</th>
                        <th>Email</th>
                        <th>Calle</th>
                        <th>Numero</th>
                        <th>Pais</th>
                        <th>Provincia</th>
                        <th>Localidad</th>
                        <th>CUIT</th>
                        <th>Cond. iva</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Telefono</th>
                        <th>Rol</th>
                        `
                    :(tipo === 'A')?
                    `
                        <th>Proveedor</th>
                        <th>Codigo</th>
                        <th>Categoria</th>
                        <th>Producto</th>
                        <th>Descripcion</th>
                        <th>Precio</th>                        
                    `:
                    `
                        <th>Numero orden compra</th>
                        <th>Emision</th>
                        <th>Entrega esperada</th>
                        <th>Direccion</th>
                        <th>Proveedor</th>
                        <th>Productos</th>
                        <th>Cantidad</th>
                        <th>Total</th> 
                    `   
                }
                        <th class="text-center">OPC</th>                    
                </tr>
                <tbody id="body-tabla">                
                </tbody>            
        </table>
    `;
  
    contenedor.appendChild(tabla);
  
    let bodyTabla = document.getElementById("body-tabla");

    for (let elem of arrLocalStore) {
        let fila = document.createElement("tr");

        for (const key in elem) {
            if (elem.hasOwnProperty(key) && key !== 'id') {
                let celda = document.createElement("td");
                celda.innerHTML = elem[key];

                fila.appendChild(celda);
            }
        }

        let celda = document.createElement("td");
        celda.innerHTML = 
        `
            <div class="d-flex">
                <button id="delete-${elem.id}" title="eliminar" class="btn" type="button">
                    <i class="fa-solid fa-trash"></i>
                </button>
                <button id="edit-${elem.id}" title="editar" class="btn" type="button">
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
            </div>
        `
        fila.appendChild(celda);
        bodyTabla.appendChild(fila);

        const btnDelete = document.getElementById(`delete-${elem.id}`);
        btnDelete.addEventListener("click", () => {
            eliminarRow(tipo,elem);
            imprimirTabla(tipo);
        });
    }
}

// const tablas = document.getElementsByName("listado");

// for (let i = 0; i<tablas.length; i++) {
//     tablas[i].addEventListener("click", (e)=>{
//         e.preventDefault();

//         imprimirTabla((i===0?'P':(i===1)?'A':'OC'));

//         window.location.href = "pages/tables.html";
//     });
// }