
const images = [
  { thumbnail: "images/image-product-1-thumbnail.jpg", full: "images/image-product-1.jpg" },
  { thumbnail: "images/image-product-2-thumbnail.jpg", full: "images/image-product-2.jpg" },
  { thumbnail: "images/image-product-3-thumbnail.jpg", full: "images/image-product-3.jpg" },
  { thumbnail: "images/image-product-4-thumbnail.jpg", full: "images/image-product-4.jpg" }
];


const state = { currentImage: 0 , quantity: 0 , cart: null  };


const mainImage = document.querySelector(".bigimg-con img");
const thumbnails = document.querySelectorAll(".smallimg-con button");
const mainImageButton = document.querySelector(".main-image");


const minusButton = document.querySelector(".minusButton");
const plusButton = document.querySelector(".plusButton");
const quantityDisplay = document.querySelector(".quantityDisplay");


const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const closeButton = document.querySelector(".lightbox-close");
const previousButton = document.querySelector(".lightbox-previous");
const nextButton = document.querySelector(".lightbox-next");

const previousMobile = document.querySelector(".mobile-previous");
const nextMobile = document.querySelector(".mobile-next");


const addButton = document.querySelector(".add");
const cartCount = document.querySelector(".cart-count");
const cartDropdown = document.querySelector(".cart-dropdown");
const cartButton = document.querySelector(".open-cart");


const menuButton = document.querySelector(".menu-button");
const navClose = document.querySelector(".nav-close");
const mobileOverlay = document.querySelector(".mobile-overlay");
const nav = document.querySelector("nav");




function renderImage() {
  const image = images[state.currentImage];

  mainImage.src = image.full;
  lightboxImage.src = image.full;


  thumbnails.forEach((thumbnail, index) => {
  const isActive = index === state.currentImage;

  thumbnail.classList.toggle("is-active", isActive);

  if (isActive) {
    thumbnail.setAttribute("aria-current", "true");
  } else {
    thumbnail.removeAttribute("aria-current");
  }
});

}



function openMenu() {
  nav.classList.add("is-open");
  mobileOverlay.classList.add("is-open");
  menuButton.setAttribute("aria-expanded", "true");
  navClose.focus();
}

function closeMenu() {
  nav.classList.remove("is-open");
  mobileOverlay.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.focus();
}

menuButton.addEventListener("click", openMenu);
navClose.addEventListener("click", closeMenu);
mobileOverlay.addEventListener("click", closeMenu);


document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("is-open")) {
    closeMenu();
  }
});


thumbnails.forEach((button) => {
  button.addEventListener("click", () => {
    state.currentImage = Number(button.dataset.index);
    renderImage();
  });
});

mainImageButton.addEventListener("click", () => {
  lightbox.showModal();
});

previousButton.addEventListener("click", () => {
  state.currentImage = (state.currentImage - 1 + images.length) % images.length;
  renderImage();
});

nextButton.addEventListener("click", () => {
  state.currentImage = (state.currentImage + 1) % images.length;
  renderImage();
});


closeButton.addEventListener("click", () => {
  lightbox.close();
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});



// ---------------------------------------------------------------------------

previousMobile.addEventListener("click", () => {
  state.currentImage = (state.currentImage - 1 + images.length) % images.length;
  renderImage();
})

nextMobile.addEventListener("click", () => {
  state.currentImage = (state.currentImage + 1) % images.length;
  renderImage();
});

renderImage();
// ----------------------------------------------------------------------------

function renderQuantity() {
  quantityDisplay.textContent = state.quantity;
}

minusButton.addEventListener("click",() => {
  if (state.quantity >= 1){
    state.quantity -= 1;
    renderQuantity()    
  }
})

plusButton.addEventListener("click", () =>{
  state.quantity += 1;
  renderQuantity();
})
renderQuantity()

addButton.addEventListener("click", () => {
  if (state.quantity === 0) return; 
  if (state.cart === null){
    state.cart = { quantity: state.quantity };
    state.quantity = 0;                    
  } else {
    state.cart.quantity += state.quantity;
    state.quantity = 0;
  }

  renderQuantity();
  renderCart();
});


// ------------------------------------------------------------------------

function renderCart() {
  if (state.cart === null) {
    cartCount.hidden = true; 
    cartDropdown.innerHTML = `
      <h2>Cart</h2>
      <p>Your cart is empty.</p>
    `;
    return;
  }

  const total = 125 * state.cart.quantity;

  cartCount.hidden = false;
  cartCount.textContent = state.cart.quantity;

  cartDropdown.innerHTML = `
    <h2>Cart</h2>
    <div class="cart-item">
      <img src="images/image-product-1-thumbnail.jpg" alt="Product">
      <div>
        <p>Fall Limited Edition Sneakers</p>
        <p>$125.00 × ${state.cart.quantity} <strong>$${total}.00</strong></p>
      </div>
      <button data-action="remove" aria-label="Remove product">×</button>
    </div>
    <button id="checkout-button"  data-action="checkout" >Checkout</button>
  `;
}


renderCart();

cartButton.addEventListener("click", () => {
  cartDropdown.hidden = !cartDropdown.hidden;

  cartButton.setAttribute("aria-expanded", String(!cartDropdown.hidden));
});

cartDropdown.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="remove"]');

  if (!button) return;  

  state.cart = null;
  renderCart();
  
});



cartDropdown.addEventListener("click", (event) =>{
  const button = event.target.closest('[data-action="checkout"]')
  if (!button) return;

  state.cart = null;
  renderCart();
})
// ---------------------------------------------------------------------------------


