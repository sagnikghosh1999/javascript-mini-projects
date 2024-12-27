"use strict";

const iconCart = document.querySelector(".icon-cart");
const closeCart = document.querySelector(".closeCart");
const body = document.querySelector("body");
const productListElement = document.querySelector(".listProduct");
const cartListElement = document.querySelector(".listCart");
const iconCartSpanElement = document.querySelector(".icon-cart span");

let productList = [];
let cart = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

closeCart.addEventListener("click", () => {
  body.classList.remove("showCart");
});

const renderProductList = (products) => {
  productListElement.innerHTML = "";
  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("item");
    productItem.dataset.id = product.id;
    productItem.innerHTML = `
            <img
              src="${product.image}"
              alt="Product Image ${product.name}"
            />
            <h2>${product.name}</h2>
            <div class="price">₹${product.price}</div>
            <button class="addCart">Add to cart</button>
            `;
    productListElement.appendChild(productItem);
  });
};

const renderCartProduct = () => {
  console.log(cart, productList);
  cartListElement.innerHTML = "";
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach((cartItem) => {
      const product =
        productList.length &&
        productList.find(
          (productItem) => parseInt(productItem.id) === parseInt(cartItem.id)
        );
      totalQuantity = totalQuantity + cartItem.quantity;
      const newCartItem = document.createElement("div");
      newCartItem.classList.add("item");
      newCartItem.dataset.id = product.id;
      newCartItem.innerHTML = `
            <div class="image">
              <img
                src="${product.image}"
                alt="Product Image 1"
              />
            </div>
            <div class="name">${product.name}</div>
            <div class="totalPrice">₹${cartItem.quantity * product.price}</div>
            <div class="quantity">
              <span class="minus"><</span>
              <span>${cartItem.quantity}</span>
              <span class="plus">></span>
            </div>
        `;
      cartListElement.appendChild(newCartItem);
    });
  }
  iconCartSpanElement.textContent = totalQuantity;
};

const changeQuantityCart = (productId, type) => {
  console.log(productId, type);
  const productIndex = cart.findIndex((product) => product.id === productId);
  if (productIndex !== -1) {
    if (type === "minus") {
      let changeQuantity = cart[productIndex].quantity - 1;
      if (changeQuantity > 0) {
        cart[productIndex].quantity = changeQuantity;
      } else {
        cart.splice(productIndex, 1);
      }
    } else if (type === "plus") {
      cart[productIndex].quantity++;
    }
  }
  renderCartProduct();
  addCartToMemory();
};

cartListElement.addEventListener("click", (event) => {
  const positionClick = event.target;
  console.log(positionClick);
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    const productId = positionClick.parentElement.parentElement.dataset.id;
    console.log(productId);
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantityCart(productId, type);
  }
});

const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const addToCart = (productId) => {
  if (cart.length <= 0) {
    cart.push({ id: productId, quantity: 1 });
  } else {
    const productIndex = cart.findIndex((product) => product.id === productId);
    if (productIndex !== -1) {
      cart[productIndex].quantity++;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }
  }
  renderCartProduct();
  addCartToMemory();
};

const initApp = () => {
  // Fetch product data from API
  fetch("/assets/data/products.json")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      renderProductList(productList);
      // Fetch cart data from local storage
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      if (storedCart) {
        cart = storedCart;
        renderCartProduct();
      }
    });
};

initApp();

productListElement.addEventListener("click", (event) => {
  const positionClicked = event.target;
  if (positionClicked.classList.contains("addCart")) {
    const productId = positionClicked.parentElement.dataset.id;
    addToCart(productId);
  }
});
