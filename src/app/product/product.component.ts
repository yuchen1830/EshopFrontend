import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  categories = [
    { value: 'all', label: 'All' },
    { value: 'ELECTRONICS', label: 'Electronics' },
    { value: 'CLOTHING', label: 'Clothing' },
    { value: 'FOOD', label: 'Food' },
    { value: 'HOME', label: 'Home' },
    { value: 'TOYS', label: 'Toys' }
  ];
  selectedCategory = 'all'; // default
  ALL_PRODUCTS='/api/products/all'
  
  products: any[] = [];
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || 'all';
      this.fetchProducts();
    });
  }

  fetchProducts() {
    const url = this.selectedCategory === 'all' ? this.ALL_PRODUCTS: `/api/products/${this.selectedCategory}`;
    this.http.get<any[]>(url).subscribe(
      data => (this.products = data),
      error => console.error('Error fetching products:', error)
    );
  }

  filterProducts(category: string) {
    this.selectedCategory = category;
    this.router.navigate([], { queryParams: { category } });
    this.fetchProducts();
  }

}
