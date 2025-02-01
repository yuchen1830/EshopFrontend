import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private ALL_PRODUCTS = '/api/products/all';
  private CATEGORY_PRODUCTS = '/api/products/category'
  private GET_PRODUCT_BY_ID='api/products'

  constructor(private http: HttpClient) { }

  getProducts(category: string): Observable<any> {
    const url = category === 'all' ? this.ALL_PRODUCTS : `${this.CATEGORY_PRODUCTS}/${category}`;
    return this.http.get(url);
  }

  getProductById(productId: string) : Observable<any> {
    const url = `${this.GET_PRODUCT_BY_ID}/${productId}`;
    return this.http.get(url);
  }
}
