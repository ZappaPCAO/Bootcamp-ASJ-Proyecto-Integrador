const selectProvedores = document.getElementById("SelProvedores");
const selectProductos = document.getElementById("SelProductos");
const arrProveedores = JSON.parse(localStorage.getItem("proveedores")) || [];
const arrProductos = JSON.parse(localStorage.getItem("articulos")) || [];

for (const provedor of arrProveedores) {
    let opt = document.createElement("option"); // opcion del select

    opt.value = (provedor.razSocial).toLowerCase();
    opt.innerHTML = provedor.razSocial;

    selectProvedores.appendChild(opt);
}

for (const producto of arrProductos) {
    let opt = document.createElement("option"); // opcion del select

    opt.value = (producto.producto).toLowerCase();
    opt.innerHTML = producto.producto;

    selectProductos.appendChild(opt);
}

// Completo los campos readonly

const valueOrdenCompra = document.getElementById("inputNroOrdenCompra");
const ValueFecEmi = document.getElementById("inputFecEmi");

valueOrdenCompra.value = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);

let fechaActual = new Date();

let dia = ('0' + fechaActual.getDate()).slice(-2);
let mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2); 
let anio = fechaActual.getFullYear();

let fechaFormateada = `${anio}-${mes}-${dia}`;

ValueFecEmi.value =  fechaFormateada;

const infoOC = document.getElementById("btnCrearOC");

infoOC.addEventListener("click", (e) => {
    e.preventDefault();

    // Obtengo los valores de los inputs
    
    const nroOC = document.getElementById("inputNroOrdenCompra").value;
    const fecEmi = document.getElementById("inputFecEmi").value;
    const fecRecep = document.getElementById("inputFecRecep").value;
    const email = document.getElementById("inputEmail").value;
    const provedor = document.getElementById("SelProvedores").value;
    const articulo = document.getElementById("SelProductos").value;
    const cantidad = document.getElementById("inputCantidad").value;
    
    const art = arrProductos.filter( r => r.producto === articulo);

    const arrOrdenCompra = JSON.parse(localStorage.getItem("ordenes-compras")) || [];

    let id = 1;

    if(arrOrdenCompra.length > 0)
        id = arrOrdenCompra[arrOrdenCompra.length - 1].id + 1;

    const ordenCompra = {
        id: id,
        nroOC: nroOC, 
        fecEmi: fecEmi,       
        fecRecep: fecRecep,
        email: email,
        provedor: provedor,
        articulo: articulo,
        cantidad: cantidad,
        total: art.precio * cantidad,
    };

    arrOrdenCompra.push(ordenCompra);

    localStorage.setItem("ordenes-compras", JSON.stringify(arrOrdenCompra));

    // Limpiar el formulario después de guardar
    document.getElementById("form-oc").reset();

    window.location.href = "../index.html";
    //agregar msj con libreria.
});