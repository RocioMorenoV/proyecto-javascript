let cart = [];
const prod1 = { name: "azules", price: 50, quantity: 1 };
const prod2 = { name: "rojos", price: 50, quantity: 1 };
const prod3 = { name: "mixtos", price: 150, quantity: 1 };
let stock = [prod1, prod2, prod3];

// Descomentar la siguiente linea para vaciar el carrito cada vez que se recarga la pagina.
// localStorage.cart = JSON.stringify(cart);

if (typeof Storage !== "undefined") {
  if (localStorage.cart == undefined || localStorage.cart == null) {
    localStorage.cart = JSON.stringify(cart);
    console.log("Carrito recien creado.");
  } else {
    console.log("El carrito tiene: ", localStorage.cart);
    total();
    cart = JSON.parse(localStorage.cart);
    stock.forEach((element, index) => {
      cart.map((val, cartIndex) => {
        if (
          JSON.stringify({ ...val.name }) ===
          JSON.stringify({ ...element.name })
        ) {
          document.getElementById("minus" + index).removeAttribute("disabled");
          document.getElementById("producto" + index).innerHTML =
            cart[cartIndex].quantity;
        }
      });
    });
  }
}

function total() {
  cart = JSON.parse(localStorage.cart);
  let total = 0;
  let displayMessage = "Su total es $ ";
  cart.forEach((element) => {
    total = total + element.price * element.quantity;
  });
  document.getElementById("total").innerHTML =
    total == 0 ? "Your cart is empty 🙊" : displayMessage + total;
}

function addToCart(selectedProduct) {
  cart = JSON.parse(localStorage.cart);
  let present = -1;
  cart.map((val, index) => {
    if (
      JSON.stringify({ ...val.name }) ===
      JSON.stringify({ ...stock[selectedProduct].name })
    )
      present = index;
  });
  if (present != -1) {
    cart[present].quantity++;
    document.getElementById("producto" + selectedProduct).innerHTML =
      cart[present].quantity;
  } else {
    cart.push(stock[selectedProduct]);
    document
      .getElementById("minus" + selectedProduct)
      .removeAttribute("disabled");
    document.getElementById("producto" + selectedProduct).innerHTML = 1;
  }
  Toastify({
    text: "Agregaste " + stock[selectedProduct].name,
    duration: 3000,
    style: { background: "white", color: "black" },
  }).showToast();

  localStorage.cart = JSON.stringify(cart);
  total();
}

function removeFromCart(selectedProduct) {
  cart = JSON.parse(localStorage.cart);
  let present = -1;
  cart.map((val, index) => {
    if (
      JSON.stringify({ ...val.name }) ===
      JSON.stringify({ ...stock[selectedProduct].name })
    )
      present = index;
  });
  if (cart[present].quantity == 1) {
    cart.splice(present, 1);
    document
      .getElementById("minus" + selectedProduct)
      .setAttribute("disabled", "");
    document.getElementById("producto" + selectedProduct).innerHTML = "";
  } else {
    cart[present].quantity--;
    document.getElementById("producto" + selectedProduct).innerHTML =
      cart[present].quantity;
  }
  Toastify({
    text: "Removiste " + stock[selectedProduct].name,
    duration: 3000,
    style: { background: "white", color: "black" },
  }).showToast();
  localStorage.cart = JSON.stringify(cart);
  total();
}
