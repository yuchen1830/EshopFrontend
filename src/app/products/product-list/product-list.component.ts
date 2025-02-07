import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  categories = [
    { value: 'ALL', label: 'All' },
    { value: 'ELECTRONICS', label: 'Electronics' },
    { value: 'CLOTHING', label: 'Clothing' },
    { value: 'FOOD', label: 'Food' },
    { value: 'HOME', label: 'Home' },
    { value: 'TOYS', label: 'Toys' }
  ];
  selectedCategory = 'ALL'; // default
  products: any[] = [];
  userMessage: string = '';

  constructor(private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    console.log("fetch product");
    console.log(this.selectedCategory)
    this.productService.getProducts(this.selectedCategory).subscribe(
      (data) => {
        console.log(data);
        this.products = data;
      }
    );
  }

  onCategoryChange(category: string): void {
    console.log("category changes")
    if (this.selectedCategory !== category) {
      this.selectedCategory = category;
      this.fetchProducts();
    }
  }

  addProduct(productId: string) {
    const userId = this.authService.getUserId() || 2;
    console.log(userId);
    if (!userId) {
      this.showMessage('Please log in to add products to the cart.', 'warning');
      return;
    }

    this.cartService.addProduct(userId, productId).subscribe(
      () => {
        this.showMessage('Product added to cart successfully!', 'success');
      }, (error) => {
        this.showMessage('Failed to add product to cart.', 'error');
      }
    );
  }

  showMessage(message: string, type: 'success' | 'error' |'warning') {
    this.userMessage = message;
    setTimeout(()=> {
      this.userMessage = '';
    }, 2000);
  }
}
