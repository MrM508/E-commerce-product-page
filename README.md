# Frontend Mentor - E-commerce product page solution

This is a solution to the [E-commerce product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

# Frontend Mentor - E-commerce product page solution

This is a solution to the [E-commerce product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Switch the large product image by clicking on the small thumbnail images
- Open a lightbox gallery by clicking on the large product image, and navigate it with previous/next buttons
- Change the product image on mobile with on-screen arrows
- Change the quantity before adding to the cart, and add more to an existing cart
- View the cart and remove items from it
- Open and close the mobile menu by button, overlay, or the Escape key


### Links

- Solution URL: [solution](https://your-solution-url.com)
- Live Site URL: [live site ](https://mrm508.github.io/E-commerce-product-page/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Vanilla JavaScript with a simple state and render pattern
- Native `dialog` element for the lightbox
- CSS media queries for the mobile layout
- [Google Fonts](https://fonts.google.com/) - Kumbh Sans

### What I learned

This was my first JavaScript project, and the biggest lesson was thinking in a **state and render pattern**: I keep all data in one object, and functions like `renderImage()` and `renderCart()` redraw the page from it. Every button only changes the state, then calls a render function.

```js
const state = { currentImage: 0, quantity: 0, cart: null };

function renderImage() {
  const image = images[state.currentImage];
  mainImage.src = image.full;
}
```

The cart items are rebuilt by `renderCart()` on every change, so I couldn't attach listeners to their buttons directly. **Event delegation** on the cart container solved this:

```js
cartDropdown.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="remove"]');
  if (!button) return;
  state.cart = null;
  renderCart();
});
```

I also learned that `aria-expanded` and `aria-controls` belong on the **button** that opens something, not on the thing that opens. For the off-canvas menu, `visibility: hidden` with a transition delay hides it from keyboard users while keeping the slide animation.

My favorite bug: I tried to accumulate the cart with `state.cart += { quantity: ... }` and the cart showed `undefined` and `NaN`. JavaScript converts objects to strings with `+`, so instead I learned to mutate the property inside the existing object:

```js
state.cart.quantity += state.quantity;
```

### Continued development

- Testing with a real screen reader, and learning focus management for dialogs more deeply
- Saving the cart in `localStorage` so it survives a page refresh
- Improving the layout between 700px and 1100px, where my design is weakest

### Useful resources

- [MDN - dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) - `showModal()` gave me the backdrop and Escape-to-close for free.
- [MDN - Using ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) - helped me understand `aria-expanded`, `aria-controls`, and `aria-current`.

### AI Collaboration

I used an AI assistant as a tutor while building this - it was my first JavaScript project.

- I wrote every line of code myself. The AI reviewed my code, explained concepts before I implemented them, and pointed me toward bugs instead of fixing them for me.
- What worked well: when my cart showed `NaN`, walking through the data step by step revealed I was adding two objects with `+` - a lesson I won't forget.
- What didn't work: when I asked for ready-made code early on, I couldn't understand or maintain it. Hints and explanations worked far better for me than copy-paste solutions.

## Author

- Frontend Mentor - [@MrM508](https://www.frontendmentor.io/profile/MrM508)
