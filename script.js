let carrito =JSON.parse(localStorage.getItem("carrito")) || [];
let resultado = 0
let totalCarrito = document.getElementById("total");
let data="";

Swal.fire({
  title: 'Bienvenido de vuelta',
  confirmButtonText: 'Continuar'
})


const getpruducts = async()=>{
  const response = await fetch("productos.json");
   data = await response.json();
  
  renderizarprod(data)
};
getpruducts();


//primer renderizado
renderizarprod(data);
if(carrito.length!=0){
  for(const prod of carrito){
    document.getElementById("tablacarrito").innerHTML +=`
    <tr>
      <td>${prod.id}</td>
      <td>${prod.nombre}</td>
      <td>${prod.precio}</td>
    </tr>
  `
  resultado += prod.precio;
  }

  totalCarrito.innerHTML = "";

  totalCarrito.innerHTML += `
  Total a pagar $: ${resultado}
  `;
}



// Renderizar los productos
function renderizarprod(productos){
  for (const producto of productos){
    document.getElementById("contenidotienda").innerHTML +=`
    <div class="col-4">
      <div class="card mt-4" style="width: 26rem;">
        <img src="${producto.foto}" class="card-img-top" height="420">
        <div class="card-body">
          <h3 class="card-title">${producto.nombre}</h3>
          <p class="card-text">${"$" + producto.precio}</p>
          <button id=${producto.id} class="compra btn btn-primary">Comprar</button>
        </div>
      </div>
    </div>
    `

    let botones = document.getElementsByClassName("compra");

    for (const boton of botones){
      // PARA AGREGAR PRODUCTOS AL CARRO     
      boton.onclick = () =>{
        const prodACarro = data.find((producto) => producto.id == boton.id);
        agregarACarrito(prodACarro);

        Toastify({
          text: "Añadido al carro",
          duration: 2000,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          }
        }).showToast();
      }
    }
  } 
}

const boton1 = document.getElementById("mayorprecio");
const boton2 = document.getElementById("menorprecio");

boton1.onclick=()=> mayormenor();
boton2.onclick=()=> menormayor();

function mayormenor(){
  Productos.sort((b,a)=>a.precio-b.precio);
  document.getElementById("contenidotienda").innerHTML=""
  renderizarprod(Productos);
}

function menormayor(){
  Productos.sort((a,b)=>a.precio-b.precio);
  document.getElementById("contenidotienda").innerHTML=""
  renderizarprod(Productos);
}

let tablaCarrito = document.getElementById("tablacarrito");

resultado=0;
function agregarACarrito(producto){
  carrito.push(producto);
  tablaCarrito.innerHTML +=`
    <tr>
      <td>${producto.id}</td>
      <td>${producto.nombre}</td>
      <td>${producto.precio}</td>
    </tr>
  `;

  totalCarrito.innerHTML = "";
  resultado += producto.precio;
  //RESULTADO
  totalCarrito.innerHTML += `
  Total a pagar $: ${resultado}
  `;
  
  //local storage
  localStorage.setItem("carrito",JSON.stringify(carrito));
}

//success

//boton de compra
const btncompra = document.getElementById("pagar");

btncompra.onclick = () =>{
  
  Swal.fire({
    icon: 'success',
    title: 'Compra Realizada!',
    confirmButtonText: 'Genial!'

  })

  carrito = [];
  tablaCarrito.innerHTML="" 
  resultado= 0;
  totalCarrito.innerText="Total a pagar $:";
  localStorage.removeItem("carrito");
}

