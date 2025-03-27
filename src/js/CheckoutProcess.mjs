import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
    this.calculateOrderTotal();
  }

  calculateItemSummary() {
    // Get the elements where the summary will be displayed
    const itemNumElement = document.querySelector(this.outputSelector + " #num-items");
    const subtotalElement = document.querySelector(this.outputSelector + " #cartTotal");

    // Calculate the total number of items (accounting for quantity)
    const totalQuantity = this.list.reduce((sum, item) => sum + item.Quantity, 0);
    itemNumElement.textContent = totalQuantity;

    // Calculate the total price of all items in the cart
    const amounts = this.list.map((item) => item.FinalPrice * item.Quantity);
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
    subtotalElement.textContent = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    // Calculate tax (e.g., 6% of the subtotal)
    this.tax = this.itemTotal * 0.06;

    // Calculate shipping (e.g., $10 flat rate + $2 per additional item)
    const baseShipping = 10;
    const additionalShipping = (this.list.length - 1) * 2;
    this.shipping = baseShipping + additionalShipping;

    // Calculate the total order amount
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // Update the DOM
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const taxElement = document.querySelector(this.outputSelector + " #tax");
    const shippingElement = document.querySelector(this.outputSelector + " #shipping");
    const orderTotalElement = document.querySelector(this.outputSelector + " #orderTotal");

    taxElement.textContent = `$${this.tax.toFixed(2)}`;
    shippingElement.textContent = `$${this.shipping.toFixed(2)}`;
    orderTotalElement.textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  checkout() {
    // Handle the checkout process (e.g., send data to the server)
    alert("Order placed successfully!");
    localStorage.removeItem(this.key); // Clear the cart
    window.location.href = "/checkout/success.html"; // Redirect to success page
  }
}