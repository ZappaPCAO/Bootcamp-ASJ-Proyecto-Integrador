const selectProvedores = document.getElementById("SelProvedor");
const arrProveedores = JSON.parse(localStorage.getItem("proveedores")) || [];

for (const provedor of arrProveedores) {
    let opt = document.createElement("option"); // opcion del select

    opt.value = (provedor.razSocial).toLowerCase();
    opt.innerHTML = provedor.razSocial;

    selectProvedores.appendChild(opt);
}

const infoArticulo = document.getElementById("btnCrearArticulo");

infoArticulo.addEventListener("click", (e) => {
    e.preventDefault();

    // Obtengo los valores de los inputs
    
    const provedor = document.getElementById("SelProvedor").value;
    const cod = document.getElementById("inputCode").value;
    const categoria = document.getElementById("SelCategoria").value;
    const producto = document.getElementById("inputProducto").value;
    const descri = document.getElementById("inputDescri").value;
    const precio = document.getElementById("inputPrecio").value;
    
    const arrArticulos = JSON.parse(localStorage.getItem("articulos")) || [];

    let id = 1;

    if(arrArticulos.length > 0)
        id = arrArticulos[arrArticulos.length - 1].id + 1;

    const articulos = {
        id: id, 
        provedor: provedor,       
        cod: cod,
        categoria: categoria,
        producto: producto,
        descri: descri,
        precio: precio,
    };

    arrArticulos.push(articulos);

    localStorage.setItem("articulos", JSON.stringify(arrArticulos));

    // Limpiar el formulario después de guardar
    document.getElementById("form-articulos").reset();

    window.location.href = "../index.html";
    //agregar msj con libreria.
});