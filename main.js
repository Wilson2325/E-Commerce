// Toggle elements
let searchForm = document.querySelector('.search-form');
let shoppingCart = document.querySelector('.shopping-cart');
let account = document.querySelector('.login-form');
let navbar = document.querySelector('.navbar');

document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
  shoppingCart.classList.remove('active');
  account.classList.remove('active');
  navbar.classList.remove('active');
};

document.querySelector('#cart-btn').onclick = () => {
  shoppingCart.classList.toggle('active');
  searchForm.classList.remove('active');
  account.classList.remove('active');
  navbar.classList.remove('active');
};

document.querySelector('#login-btn').onclick = () => {
  account.classList.toggle('active');
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  navbar.classList.remove('active');
};

document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  account.classList.remove('active');
};

window.onscroll = () => {
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  account.classList.remove('active');
  navbar.classList.remove('active');
};

// Swiper for products
let productSwipers = document.querySelectorAll('.product-slider');
productSwipers.forEach(slider => {
  new Swiper(slider, {
    loop: true,
    spaceBetween: 20,
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1020: { slidesPerView: 4 }
    }
  });
});

// Swiper for reviews
new Swiper(".review-slider", {
  loop: true,
  spaceBetween: 20,
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1020: { slidesPerView: 3 }
  }
});

// Update total in cart
function updateTotal() {
  let total = 0;
  document.querySelectorAll('.shopping-cart .box').forEach(box => {
    let priceText = box.querySelector('.price').innerText;
    let price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
    total += price;
  });
  document.querySelector('.shopping-cart .total').innerText =
    `Total: ₹ ${total}/-`;
}

// Add to cart
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();

    const productBox = this.closest('.box');
    const name = productBox.dataset.name;
    const price = productBox.dataset.price;
    const image = productBox.dataset.image;

    const cart = document.querySelector('.shopping-cart');

    const box = document.createElement('div');
    box.classList.add('box');

    box.innerHTML = `
      <i class="fas fa-trash"></i>
      <img src="${image}" alt="${name}">
      <div class="content">
        <h3>${name}</h3>
        <span class="price">₹ ${price}/-</span>
        <span class="quantity">Qty: 1</span>
      </div>
    `;

    // Insert before total line
    const totalElement = cart.querySelector('.total');
    cart.insertBefore(box, totalElement);

    // Attach delete handler
    box.querySelector('.fa-trash').addEventListener('click', function () {
      this.parentElement.remove();
      updateTotal();
    });

    updateTotal();
  });
});
