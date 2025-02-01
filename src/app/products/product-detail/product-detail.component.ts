import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ProductService} from 'src/app/services/product.service'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  // any for simplicity; product id is uuid in database
  productId: string | null = null;
  product: any = {};
  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    // extract id from url
    this.product = this.fetchProductById(this.productId);
  }

  fetchProductById(productId: string|null){
    if(!productId) {
      return;
    }
    this.productService.getProductById(productId).subscribe(
      (data => {
        console.log(data);
        this.product=data;
      })
    )

  }
  goBack() {
    this.router.navigate(['/products']); 
  }

}
