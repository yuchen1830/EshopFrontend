import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private GET_CART = 'api/cart'

constructor(private http: HttpClient) { }

getUserCart(userId: number): Observable<any> {
  const url = `${this.GET_CART}/${userId}`;
  return this.http.get(url);
}

addProduct(userId: number, productId: string):Observable<any> {
  const url = `${this.GET_CART}/${userId}/add/${productId}`;
  return this.http.post(url, null);
}

removeProduct(userId: number, cartItemId: number):Observable<any> {
  const url = `${this.GET_CART}/${userId}/remove/${cartItemId}`;
  return this.http.delete(url);
}

updateQuantity(userId: number, cartItemId: number, quantity: number):Observable<any> {
  const url = `${this.GET_CART}/${userId}/update/${cartItemId}/${quantity}`;
  return this.http.put(url, null);
}

checkout(userId: number, address: string, cartItems: any[]):Observable<any> {
  const url = `${this.GET_CART}/${userId}/checkout?address=${address}`;
  return this.http.post(url, {address, cartItems}).pipe(
    catchError((error) => {
      return throwError(error.error.message || 'Checkout failed. Try again.');
    })
  );
}

}
