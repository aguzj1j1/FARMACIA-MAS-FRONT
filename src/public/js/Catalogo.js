var contenidoJson = [];
var contenidoJsonCategorias = [];
var contenidoJsonSubCategorias = [];
var objetoProducto = [];
var carrito = [];
var categorias = [];
var subcategorias = [];

renderCategorias();
function initializer() {
    document.getElementById("botonFiltro").click();
    cargarProductosDesdeJson();
    cargarCategoriasDesdeJson();
    renderCategorias()
    loadLs();
}

function cargarProductosDesdeJson() {
    fetch('productos.json')
        .then(data => data.json())
        .then(data => {
            for (dat of data) {
                contenidoJson.push(dat);
                objetoProducto.push(new Producto(dat.nombre, dat.descripcion, dat.img, dat.precio, dat.precioTotal, dat.cantidad, dat.idProducto, dat.precioProducto))
            }
            cargarProductosCatalogo();
        })
        .catch(error => {
            console.log(error);
        })

}
check("@",1)
function cargarCategoriasDesdeJson() {
    fetch('categorias.json')
        .then(data1 => data1.json())
        .then(data1 => {
            for (dat of data1) {
                contenidoJsonCategorias.push(dat);
                categorias.push(new Categorias(dat.idCategoria, dat.nombre))
            }
            cargarSubcategorias();
        })
        .catch(error => {
            console.log(error);
        })

}
function cargarSubcategorias() {
    fetch('subcategorias.json')
        .then(data2 => data2.json())
        .then(data2 => {
            //debugger;
            for (dat of data2) {
                contenidoJsonSubCategorias.push(dat);
                subcategorias.push(new Categorias(dat.idSubCategoria, dat.nombre, dat.idCategoria));
            }
            renderCategorias();
        })
        .catch(error => {
            console.log(error);
        })
}


class Categorias {
    constructor(idCategoria, nombre) {
        this.idCategoria = idCategoria,
            this.nombre = nombre
    }
}

class SubCategorias {
    constructor(idSubCategoria, nombre, idCategoria) {
        this.idSubCategoria = idSubCategoria,
            this.nombre = nombre
        this.idCategoria = idCategoria
    }
}
class Producto {
    constructor(nombre, descripcion, img, precio, precioTotal, cantidad, idProducto, precioProducto) {
        this.nombre = nombre,
            this.descripcion = descripcion,
            this.img = img,
            this.precio = precio,
            this.precioTotal = precioTotal,
            this.cantidad = cantidad,
            this.idProducto = idProducto,
            this.precioProducto = precioProducto
    }
}
class Carrito {
    constructor(nombre, descripcion, img, precio, precioTotal, cantidad, idProducto, precioProducto) {
        this.nombre = nombre,
            this.descripcion = descripcion,
            this.img = img,
            this.precio = precio,
            this.precioTotal = precioTotal,
            this.cantidad = cantidad,
            this.idProducto = Number(idProducto),
            this.precioProducto = precioProducto
    }
}
function cargarProductosCatalogo() {
    var catalogo = document.querySelector('#producto');

    console.log(catalogo)
    for (let item of objetoProducto) {
        catalogo.innerHTML += `
            <div class="col-xs-12 col-md-4  d-flex justify-content-center" >
                <div class="card cardCatalogo">
                     <img class="card-img-top img-fluid"
                         src=${item.img}
                         alt="Card image cap">
                     <div class="card-block" >
                         <h3 class="card-title cardProductoT">${item.nombre}</h3>
                         <h4 class="card-subtitle cardProductoST">${item.descripcion}</h4>
                         <h3>$${item.precio}</h3>
                         <button href="#"  class="btnprimary cardProductoBTN" " onclick="agregarAlCarrito(${item.idProducto})">Agregar al carrito</button>
                     </div>
                </div>     
            </div>             
             `
    }
}
function loadLs(){
   
    //valido que haya algo en el localstorage para renderizar el carro;
    let ls = JSON.parse(localStorage.getItem('carrito'))
    console.log(ls);
    if(ls == null){
        localStorage.setItem("carrito",'[]');
    }else{
        for(let local of ls){
            carrito.push(local);
        }
    }
}
function agregarAlCarrito(idProducto) {
    var productoActual = objetoProducto.filter(data => data.idProducto == idProducto);
    var estaAgregado;
    if (carrito.length == 0){
    for (let carritos of productoActual) {
        carrito.push(new Carrito(carritos.nombre, carritos.descripcion, carritos.img, carritos.precio, carritos.precioTotal, 1, carritos.idProducto, carritos.precioProducto))
    }
    }else{
     for (let car of carrito){
         if (Number(car.idProducto) === Number(idProducto)){
             car.cantidad = Number(car.cantidad) + 1;
             estaAgregado = true;
             break;
         }
     }
     if(!estaAgregado){
        for (let carritos of productoActual) {
            carrito.push(new Carrito(carritos.nombre, carritos.descripcion, carritos.img, carritos.precio, carritos.precioTotal, 1, carritos.idProducto, carritos.precioProducto))
        }
     }

    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    //var domAgregarAlcarrito = document.querySelector('#IDDOM@'+idProducto);
    //console.log(domAgregarAlcarrito)

}
function check(id) {
    console.log(document.getElementById(id))//.setAttribute('checked', 'checked');      
}

function catalogoOrdenado(objeto) {
    var catalogo = document.querySelector('#producto');
    catalogo.innerHTML = ''
    for (let item of objeto) {
        catalogo.innerHTML += `
            <div class="col-xs-12 col-md-4  d-flex justify-content-center" >
                <div class="card cardCatalogo">
                     <img class="card-img-top img-fluid"
                         src=${item.img}
                         alt="Card image cap">
                     <div class="card-block">
                         <h3 class="card-title cardProductoT">${item.nombre}</h3>
                         <h4 class="card-subtitle cardProductoST">${item.descripcion}</h4>
                         <h3>$${item.precio}</h3>
                         <button href="#" class="btnprimary cardProductoBTN"  onclick="agregarAlCarrito(${item.idProducto})">Agregar al carrito</button>
                     </div>
                </div>     
            </div>             
             `
    }
}
class Categoria {
    constructor(idCategoria, nombre) {
        this.idCategoria = idCategoria,
            this.nombre = nombre
    }

}
class SubCategoria {
    constructor(idSubCategoria, nombre, idCategoria) {
        this.idSubCategoria = idSubCategoria,
            this.nombre = nombre,
            this.idCategoria = idCategoria
    }

}
function renderCategorias() {
    var acordeonCategorias = document.querySelector('#subaccordion1');
    var categoryHtmlBase =
    `<div id="Categoria@IDCATEGORIA">                                                  
        <div class="card border-0">
            <!--CATEGORIA HEADER-->  
            <div class="card-header bg-white border-0 p-1" id="HeaderCategoria@IDCATEGORIA">
                <div class="mb-0">    
                    <div class="form-check">
                        <div class="custom-control form-control-lg custom-checkbox">  
                            <input type="checkbox" value="IDCATEGORIA" class="custom-control-input checkBoton" id="IDCATEGORIA"><!--ID-->
                            <label class="custom-control-label" for="IDCATEGORIA"><!--Hace regerencia al id del check-->
                                <h7>@CATEGORIANOMBRE</h7>  
                            </label> 
                            <label class="custom-control-label"
                                data-toggle="collapse" data-target="#Subcategoria@IDSUBCATEGORIA
                                aria-expanded="true" aria-controls="Subcategoria@IDSUBCATEGORIA"> <!--Apunta al SubCategoriaContenedor para manejar el escondido de eso-->                                              
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill flechita" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                    </svg> 
                            </label> 
                        </div>                                                                                                                             
                    </div>                                                     
                </div>
            </div>
            <!--CATEGORIA HEADER-->  

            <div id="Subcategoria@IDSUBCATEGORIA" class="collapse" aria-labelledby="HeaderCategoria@IDCATEGORIA"
                data-parent="#Categoria@IDCATEGORIA"><!--SubcategoriaContenedor-->
                    <div class="card-body p-1 ml-2">
                        @SUBCATEGORIASCONTAINER
                    </div>
            </div>
        </div>
    </div>`;
    var resCategorys="";
    for (let category of contenidoJsonCategorias)
    {   
        var auxCategory = categoryHtmlBase.replace(/IDCATEGORIA/g, category.idCategoria);
        auxCategory = auxCategory.replace(/@CATEGORIANOMBRE/g, category.nombre);
        for(let subCategoria of category.subCategorias){  
            auxCategory = auxCategory.replace(/IDSUBCATEGORIA/g, subCategoria.idSubCategoria);
        }
        //filter.categorys.push("CheckBoxCategoria" + category.id);
        resCategorys += auxCategory
        var subCategoryHtmlBase = 
        `<div class="form-check">
            <div class="custom-control form-control-lg custom-checkbox">  
                <input type="checkbox" class="custom-control-input checkBoton" id="SubCategoriaCheckBox@IDSUBCATEGORIA">  
                <label class="custom-control-label" for="SubCategoriaCheckBox@IDSUBCATEGORIA">
                    <h7>@SUBCATEGORIANOMBRE</h7>  
                </label>  
            </div>  
        </div>`;
        
        
        //debugger; 
        for(let subCategoria of category.subCategorias)
        {  
   //         debugger;
            if(Number( subCategoria.idCategoria) == Number(category.idCategoria)){
                var aux = subCategoryHtmlBase.replace(/IDSUBCATEGORIA/g, subCategoria.idSubCategoria);
                
                aux = aux.replace(/@SUBCATEGORIANOMBRE/g, subCategoria.nombre);
                
                resCategorys += aux;
            }
            //filter.subCategorys.push("SubCategoriaCheckBox" + subCategory.idSubCategoria);
        }

        resCategorys += auxCategory.replace(/SUBCATEGORIASCONTAINER/g, resCategorys);
    }
 //   console.log(resCategorys);
    acordeonCategorias.innerHTML = resCategorys;
}

function comboChange(opcion) {
    let object
    if (opcion == 1) {
        //menor a mayor
        object = objetoProducto.sort(((a, b) => a.precio - b.precio));
    } else if (opcion == 2) {
        //mayor a menor
        object = objetoProducto.sort(((a, b) => b.precio - a.precio));
    }

    catalogoOrdenado(object);
}