const infoProveedor = document.getElementById("btnCrearProveedor");

infoProveedor.addEventListener("click", (e) => {
    e.preventDefault();

    // Obtengo los valores de los inputs
    const cod = document.getElementById("inputCode").value;
    const razSocial = document.getElementById("inputRazonSocial").value;
    const email = document.getElementById("inputEmail").value;
    const rubro = document.getElementById("inputRubro").value;
    const calle = document.getElementById("inputCalle").value;
    const nro = document.getElementById("inputCalleNro").value;
    const pais = document.getElementById("SelPais").value;
    const provincia = document.getElementById("SelProvincia").value;
    const localidad = document.getElementById("SelLocalidad").value;
    const cuit = document.getElementById("inputCuit").value;
    const condIva = document.getElementById("inputCondIva").value;
    const nombre = document.getElementById("inputNombre").value;
    const apellido = document.getElementById("inputApellido").value;
    const telefono = document.getElementById("inputTelefono").value;
    const rol = document.getElementById("inputRol").value;
    
    const arrProveedores = JSON.parse(localStorage.getItem("proveedores")) || [];

    let id = 1;

    if(arrProveedores.length > 0)
        id = arrProveedores[arrProveedores.length - 1].id + 1;

    const proveedor = {
        id: id,        
        cod: cod,
        razSocial: razSocial,
        email: email,
        rubro: rubro,
        calle: calle,
        nro: nro,
        pais: pais,
        provincia: provincia,
        localidad: localidad,
        cuit: cuit,
        condIva: condIva,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        rol: rol,
    };

    arrProveedores.push(proveedor);

    localStorage.setItem("proveedores", JSON.stringify(arrProveedores));

    // Limpiar el formulario después de guardar
    document.getElementById("form-proveedores").reset();
    
    window.location.href = "../index.html";
    //agregar msj con libreria.
});