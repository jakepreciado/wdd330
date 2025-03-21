import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// function productDetailsTemplate(product) {
//   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
//       <h2 class="divider">${product.NameWithoutBrand}</h2>
//       <img
//         class="divider"
//         src="${product.PrimaryLarge}"
//         alt="${product.NameWithoutBrand}"
//       />
//       <p class="product-card__price">$${product.FinalPrice}</p>
//       <p class="product__color">${product.Colors[0].ColorName}</p>
//       <p class="product__description">
//       ${product.DescriptionHtmlSimple}
//       </p>
//       <div class="product-detail__add">
//         <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//       </div></section>`;
// }
function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  const euroPrice = new Intl.NumberFormat('en-US',
    {
      style: 'currency', currency: 'USD',
    }).format(Number(product.FinalPrice) * 0.85);
  document.querySelector("#p-price").textContent = `${euroPrice}`;
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product.Id;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    let cart = JSON.parse(localStorage.getItem('so-cart')) || [];
    // Checks if the item is already in the cart, and adds 1 to the quantity if it is
    const itemIndex = cart.findIndex(item => item.Id === this.product.Id);
    if (itemIndex !== -1) {
      cart[itemIndex].Quantity += 1;
    } else {
      this.product.Quantity = 1;
      cart.push(this.product);
    }
    localStorage.setItem('so-cart', JSON.stringify(cart));
    console.log("Updated cart:", cart);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

