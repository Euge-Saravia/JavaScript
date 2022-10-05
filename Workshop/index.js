class Producto {
  constructor(titulo, imagen, precio) {
    this.titulo = titulo;
    this.imagen = imagen;
    this.precio = precio;
  }
}

const productos = [
  new Producto("lip-1", "./Images/Product-Images/lip-1.jpg", 10),
  new Producto("lip-2", "./Images/Product-Images/lip-1.jpg", 20),
  new Producto("lip-3", "./Images/Product-Images/lip-1.jpg", 30),
  new Producto("lip-4", "./Images/Product-Images/lip-1.jpg", 40),
  new Producto("lip-5", "./Images/Product-Images/lip-1.jpg", 45),
  new Producto("lip-6", "./Images/Product-Images/lip-1.jpg", 50),
  new Producto("lip-7", "./Images/Product-Images/lip-1.jpg", 55),
  new Producto("lip-8", "./Images/Product-Images/lip-1.jpg", 60),
  new Producto("lip-9", "./Images/Product-Images/lip-1.jpg", 65),
  new Producto("lip-10", "./Images/Product-Images/lip-1.jpg", 70),
  new Producto("lip-11", "./Images/Product-Images/lip-1.jpg", 75),
  new Producto("lip-12", "./Images/Product-Images/lip-1.jpg", 80),
  new Producto("lip-13", "./Images/Product-Images/lip-1.jpg", 85),
  new Producto("lip-14", "./Images/Product-Images/lip-1.jpg", 90),
  new Producto("lip-15", "./Images/Product-Images/lip-1.jpg", 95),
  new Producto("lip-16", "./Images/Product-Images/lip-1.jpg", 100),
];

const divisa = "$";
const container = document.getElementById("container");

function renderizarProductos() {
  productos.forEach((info) => {
    console.log(info);
    //Estructura
    const miNodoCardBody = document.createElement("div");
    miNodoCardBody.classList.add("card-body");
    // Titulo
    const miNodoTitle = document.createElement("h5");
    miNodoTitle.classList.add("card-title");
    miNodoTitle.textContent = info.titulo;
    // Imagen
    const miNodoImagen = document.createElement("img");
    miNodoImagen.classList.add("img-lip");
    miNodoImagen.setAttribute("src", info.imagen);
    // Precio
    const miNodoPrecio = document.createElement("p");
    miNodoPrecio.classList.add("card-text");
    miNodoPrecio.textContent = `${divisa}${info.precio}`;
    // Boton
    const miNodoBoton = document.createElement("button");
    miNodoBoton.classList.add("btn");
    miNodoBoton.textContent = "Comprar";
    miNodoBoton.setAttribute("producto", info.titulo);
    miNodoBoton.addEventListener("click", addLocalStorge);
    // Insertamos
    miNodoCardBody.appendChild(miNodoImagen);
    miNodoCardBody.appendChild(miNodoTitle);
    miNodoCardBody.appendChild(miNodoPrecio);
    miNodoCardBody.appendChild(miNodoBoton);
    container.appendChild(miNodoCardBody);
  });
}

//Guardar productos en el local storage

function addLocalStorge(event) {
  // PASOS:
  // Obtener el valor del carrito en el local storage
  const carrito = JSON.parse(localStorage.getItem("Carrito"));
  // Obtener el titulo del producto que hicimos click, esta guardado en el attributo "producto"
  const productTitle = event.target.getAttribute("producto"); // productTitle = "lip-16"
  // Controlar si el carrito tiene algo adentro
  if (carrito == null) {
    // Si no tiene -> Generar el carrito con el producto que estoy clickeando
    let labiales = [];

    // Obtener el producto usando el titulo, desde el array de productos
    const filtrados = productos.filter(
      (producto) => producto.titulo == productTitle
    );

    // Agregarlo al array nuevo
    labiales.push(filtrados[0]);

    // Guardar el valor en el local storage.
    localStorage.setItem("Carrito", JSON.stringify(labiales));
  } else {
    // Si tiene -> Agregarle el producto que estoy clickeando
    const filtrados = productos.filter(
      (producto) => producto.titulo == productTitle
    );

    carrito.push(filtrados[0]);
    // Guardar el valor nuevo de carrito en el local storage
    localStorage.setItem("Carrito", JSON.stringify(carrito));
  }

  // Re-generar el carrito
  //   const carritoHtml = document.getElementById("carrito-items");
  //   carritoHtml.innerHTML = "";
  renderizarCarrito();
}

function renderizarCarrito(params) {
  let containerCarrito = document.getElementById("carrito-items");
  containerCarrito.innerHTML = "";

  //Traer los items del local storage
  const carrito = JSON.parse(localStorage.getItem("Carrito"));

  if (carrito != null) {
    const carritoSinDuplicado = [...new Set(carrito)];

    //Renderizar carrito
    carritoSinDuplicado.forEach((info) => {
// Cuenta el número de veces que se repite el producto
const numeroUnidadesItem = carrito.reduce((total, itemId) => {
    // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
    return itemId === item ? total += 1 : total;
}, 0);




      //Div que contiene a cada elemento del array
      const miNodoCarrito = document.createElement("div");
      miNodoCarrito.classList.add("nodo-carrito");
      //Agregamos la imagen
      const miNodoCarritoImg = document.createElement("img");
      miNodoCarritoImg.classList.add("carrito-img");
      miNodoCarritoImg.setAttribute("src", info.imagen);
      //Agregamos el título
      const miNodoCarritoTitulo = document.createElement("h5");
      miNodoCarritoTitulo.classList.add("carrito-titulo");
      miNodoCarritoTitulo.textContent = info.titulo;
      //Agregamos el precio
      const miNodoCarritoPrecio = document.createElement("p");
      miNodoCarritoPrecio.classList.add("carrito-precio");
      miNodoCarritoPrecio.textContent = `${divisa}${info.precio}`;
      //Insertamos
      miNodoCarrito.appendChild(miNodoCarritoImg);
      miNodoCarrito.appendChild(miNodoCarritoTitulo);
      miNodoCarrito.appendChild(miNodoCarritoPrecio);
      containerCarrito.appendChild(miNodoCarrito);
    });
  }
}

function vaciarCarrito(params) {
  // Borrar el localstorage
  localStorage.removeItem("Carrito");
  // Otra opcion:
  //   localStorage.setItem("Carrito", JSON.stringify([]));
  // volver a renderizar carrito
  renderizarCarrito();
}

//Abro y cierro carrito apretando en el icono de la canasta

let verCarrito = document.getElementById("basquet");

verCarrito.addEventListener("click", showBasquet);

function showBasquet(params) {
  let showCarrito = document.getElementById("carrito");
  showCarrito.classList.toggle("open");
}

const botonVaciar = document.getElementById("vaciar-carrito");
botonVaciar.addEventListener("click", vaciarCarrito);

//Formulario de compra a traves del boton comprar que esta en la canasta (carrito)

let formularioCompra = document.getElementById("comprar");
let formularioDialog = document.getElementById("form-comprar");
let finalizarCompra = document.getElementById("finalizar-compra");
let formulario = document.getElementById("formulario");

//Muestra el formulario para ser completado por el cliente
formularioCompra.addEventListener("click", function () {
  formularioDialog.showModal();
});

//Muestra un pop-up de que la compra fue realizada con exito, vacia el local storage (carrito)
finalizarCompra.addEventListener("click", function () {
  alert("Tu compra ha sido realizada con exito!");
  vaciarCarrito();
  formulario.reset();
});

//Mostrar el contenido de la página
renderizarProductos();
renderizarCarrito();