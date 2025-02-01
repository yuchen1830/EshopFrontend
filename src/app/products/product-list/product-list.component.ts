import { Component, OnInit } from '@angular/core';
import {ProductService} from 'src/app/services/product.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  categories = [
    { value: 'all', label: 'All' },
    { value: 'ELECTRONICS', label: 'Electronics' },
    { value: 'CLOTHING', label: 'Clothing' },
    { value: 'FOOD', label: 'Food' },
    { value: 'HOME', label: 'Home' },
    { value: 'TOYS', label: 'Toys' }
  ];
  selectedCategory = 'all'; // default
  products: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    console.log("fetch product");
    this.productService.getProducts(this.selectedCategory).subscribe(
      (data) => {
        console.log(data);
        this.products = data;
      }
    );
  }

  onCategoryChange(category: string):void {
    if (this.selectedCategory !== category) {
      this.selectedCategory = category;
      this.fetchProducts();
    }
  }

}
