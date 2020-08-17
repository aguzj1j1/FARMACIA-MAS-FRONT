cargarProductosDesdeJson();
var contenidoJson = [];
function cargarProductosDesdeJson() {
    fetch('productos.json')
        .then(data => data.json())
        .then(data => {
            for (dat of data) {
                contenidoJson.push(dat);
            }
            cargarProductosCarrito(contenidoJson, false);
        })
        .catch(error => {
            console.log(error);
        })
};

function cargarProductosCarrito(contenidoJson, cargoCarrito) {
    var categoria = document.querySelector('#productos');

    var total = 0;
    console.log(contenidoJson);
    if (cargoCarrito) {
        categoria.innerHTML = ''
    }
    for (let item of contenidoJson) {
        //   total = Number(total) + totalPorProductos(Number(item.cantidad),Number(item.precio));
        var totalProductos = totalPorProductos(Number(item.cantidad), Number(item.precio));
        console.log(totalProductos)
        categoria.innerHTML += `
                <tr><!--esto-->
                    <td>
                            <img src="${item.img}" alt="..." class="img-thumbnail">   
                        </td>
                        <td>
                            <div class="row">
                                <div class="col-lg-12">
                                    <h4> ${item.Producto}</h4>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <h9>${item.descripcion}</h4>
                                </div>
                            </div>
                        </td>
                        <td>
                            <h4>$${item.precio}</h4>
                        </td>
                        <td>
                            <div class="input-group">
                                <div class="input-group-prepend" >
                                    <button class="botonCustomCarrito botonCarritoMM" id = "${item.id}" type="button" onclick="restar(${item.id})">-</button>
                                    <h4 id="${item.valorId}">${item.cantidad}</h4>
                                    <button class="botonCustomCarrito botonCarritoMM" id = "${item.id}" type="button" onclick="sumar(${item.id})">+</button>
                                </div>
                            </div>
                        </td>
                        <td>
                            <h4 id="${item.precioProducto}">$${totalProductos > item.precio ? totalProductos : item.precio}</h4>
                        </td>
                        <td>
                            <a href="#" onClick="eliminarProducto(${item.idEliminar})">X</a>
                        </td>
                    </tr><!--esto-->`
    }
    cargarTotalesCarrito(false)
    // totalCarrito.innerHTML =`<h4>Total $${total}</h4>
    //               <button type="button" class=" btn botonCustomCarrito ">Siguiente Paso</button>`
}
function cargarTotalesCarrito(actualizados) {
    var total=0;
    for (let item of contenidoJson) {
        total = Number(total) + totalPorProductos(Number(item.cantidad), Number(item.precio));
    }
    //if (!actualizados){
        var totalCarrito = document.querySelector('#totalCarrito');
        
        totalCarrito.innerHTML = `<h4 id="totalCarrito">Total $${Number(total)}</h4>
                                   <button type="button id="siguientePaso" class=" btn botonCustomCarrito ">Siguiente Paso</button>`
  //  }else{
        var totalCarritoActualizado = document.getElementById("totalCarrito");
        // var objTotalCarrito = { c: total }
        // var c = new Binding({
        //     object: objTotalCarrito,
        //     property: "c"
        // })
        // c.addBinding(totalCarritoActualizado, "value", "keyup")
        // c.addBinding(totalCarritoActualizado, "innerHTML")

    //}

    
}

class producto {
    constructor(producto, descripcion, img, precio, precioTotal, cantidad, id, valorId, precioProducto) {
        this.producto = producto,
            this.descripcion = descripcion,
            this.img = img,
            this.precio = precio,
            this.precioTotal = precioTotal,
            this.cantidad = cantidad,
            this.id = id,
            this.valorId = valorId,
            this.precioProducto = precioProducto
    }
}
function restar(id) {
    var filter = contenidoJson.filter(data => data.id == id)
    var cantidad;
    for (let f of filter) {
        var objeto = new producto(f.producto, f.descripcion, f.img, f.precio, f.precioTotal, f.cantidad, f.id, f.valorId, f.precioProducto);
    }
    if (objeto.cantidad > 0) {
        objeto.cantidad = objeto.cantidad - 1;
        var total = totalPorProductos(objeto.cantidad, objeto.precio);
    }
    console.log(cantidad)
    if (objeto.cantidad == 0) {
        contenidoJson = contenidoJson.filter(data => data.id != objeto.id);
        console.log(contenidoJson)
        cargarProductosCarrito(contenidoJson, true);
    } else {
        contenidoJson.filter(data => data.id == id ? data.cantidad = objeto.cantidad : data.cantidad = objeto.cantidad);
        var cantidadProducto = document.getElementById(objeto.valorId)
        var objCantidad = { a: objeto.cantidad }
        var a = new Binding({
            object: objCantidad,
            property: "a"
        })
        //.addBinding(myInputElement1, "value", "keyup")
        a.addBinding(cantidadProducto, "value", "keyup")
        a.addBinding(cantidadProducto, "innerHTML")
        //.addBinding(myDOMElement, "innerHTML")
        var totalProducto = document.getElementById(objeto.precioProducto);
        var objTotalProducto = { b: total }
        var b = new Binding({
            object: objTotalProducto,
            property: "b"
        })
        b.addBinding(totalProducto, "value", "keyup")
        b.addBinding(totalProducto, "innerHTML")
        cargarTotalesCarrito(true);
    }
}
function sumar(id) {
    console.log(id)
    var filter = contenidoJson.filter(data => data.id == id)
    var cantidad = 0;
    for (let f of filter) {
        var objeto = new producto(f.producto, f.descripcion, f.img, f.precio, f.precioTotal, f.cantidad, f.id, f.valorId, f.precioProducto);
    }
    if (objeto.cantidad > 0) {
        objeto.cantidad = Number(objeto.cantidad) + 1  //objeto.cantidad + 1;
        console.log(cantidad);
        var total = totalPorProductos(objeto.cantidad, objeto.precio);
    }
    contenidoJson.filter(data => data.id == id ? data.cantidad = objeto.cantidad : data.cantidad = objeto.cantidad);
    var cantidades = document.getElementById(objeto.valorId);
    var totalProducto = document.getElementById(objeto.precioProducto);
    console.log(document.getElementById(objeto.precioProducto))
    var objCantidad = { a: objeto.cantidad }
    var a = new Binding({
        object: objCantidad,
        property: "a"
    })
    //.addBinding(myInputElement1, "value", "keyup")
    a.addBinding(cantidades, "value", "keyup")
    a.addBinding(cantidades, "innerHTML")

    var objTotalProducto = { b: total }
    var b = new Binding({
        object: objTotalProducto,
        property: "b"
    })
    b.addBinding(totalProducto, "value", "keyup")
    b.addBinding(totalProducto, "innerHTML")
    cargarTotalesCarrito(true);

    //.addBinding(totalProducto, "value", "keyup")
    //.addBinding(totalProducto, "innerHTML")
}
function totalPorProductos(cantidad, precio) {

    return Number(cantidad) * Number(precio);
}
function eliminarProducto(idEliminar) {
    contenidoJson = contenidoJson.filter(data => data.idEliminar != idEliminar);
    console.log(contenidoJson.filter(data => data.idEliminar != idEliminar))
    cargarProductosCarrito(contenidoJson, true);
}
function Binding(b) {
    _this = this
    this.elementBindings = []
    this.value = b.object[b.property]
    this.valueGetter = function () {
        return _this.value;
    }
    this.valueSetter = function (val) {
        _this.value = val
        for (var i = 0; i < _this.elementBindings.length; i++) {
            var binding = _this.elementBindings[i]
            binding.element[binding.attribute] = val
        }
    }
    this.addBinding = function (element, attribute, event) {
        var binding = {
            element: element,
            attribute: attribute
        }
        if (event) {
            element.addEventListener(event, function (event) {
                _this.valueSetter(element[attribute]);
            })
            binding.event = event
        }
        this.elementBindings.push(binding)
        element[attribute] = _this.value
        return _this
    }

    Object.defineProperty(b.object, b.property, {
        get: this.valueGetter,
        set: this.valueSetter
    });

    b.object[b.property] = this.value;
}
