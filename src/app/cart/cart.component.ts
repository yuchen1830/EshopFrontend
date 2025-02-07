import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any = null;
  productNames: { [key: string]: string } = {}; // store name by id
  productPrices: { [key: string]: number } = {}; // store name by id
  // userId: number | null = null;
  userId = 2
  shippingAddress: string = '';
  cartItems: any[] = [];

  constructor(private cartService: CartService, private productService: ProductService, private authService: AuthService) { }

  ngOnInit(): void {
    // this.userId = this.authService.getUserId();
    // if (this.userId) {
    //   this.loadCart();
    // }
    this.loadCart()
  }

  loadCart() {
    this.cartService.getUserCart(this.userId!).subscribe(
      (data) => {
        console.log(data)
        this.cart = data;
        this.cartItems = data.items;
        this.loadProductNames();
      },
      (error) => {
        console.error('Error fetching cart:', error);
      }
    );
  }

  loadProductNames() {
    console.log("name match")
    if (!this.cart?.cartItems) return;
    const productRequests = this.cart.cartItems.map((item: any) =>
      this.productService.getProductById(item.productId)
    );
    forkJoin(productRequests).subscribe(
      (data) => {
        console.log(data)
        data.forEach((product: any, index: number) => {
          this.productNames[this.cart.cartItems[index].productId] = product.productName;
          this.productPrices[this.cart.cartItems[index].productId] = product.price;
        });
      },
      (error) => {
        console.error('Error fetching product names:', error);
      }
    );
  }

  removeItem(cartItemId: number) {
    if (!this.userId) return;
    this.cartService.removeProduct(this.userId, cartItemId).subscribe(
      () => this.loadCart(),
      (error) => console.error('Error removing item: ', error)
    );
  }

  updateQuantity(cartItem: any, change: number) {
    if (!this.userId) return;
    // ensure the quantity wont go below 1
    const newQuantity = cartItem.quantity + change;
    if (newQuantity < 1) return;
    this.cartService.updateQuantity(this.userId, cartItem.cartItemId, change).subscribe(
      () => { 
        cartItem.quantity = newQuantity;
        this.loadCart();
      },
      (error) => console.error('Error updating item: ', error)
    )
  }

  updateAddress(event: any) {
    this.shippingAddress = event.target.value;
  }

  checkout() {
    // use .trim()
    if(!this.shippingAddress.trim()) {
      alert('Please enter the address');
      return;
    }
    this.cartService.checkout(this.userId, this.shippingAddress, this.cartItems).subscribe(
      (data) => {
        alert('Order placed successfully');
        this.cartItems = [];
        this.shippingAddress = '';
      },
      (error) => {
        alert(error); //  stock issues or checkout errors
      }
    )
    this.loadCart()
  }
}