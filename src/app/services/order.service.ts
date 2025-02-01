import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private USER_ORDERS = 'api/orders/user';
  private ORDER_ID='api/orders';
  constructor(private http:HttpClient) {}

  getUserOrders(userId: number):Observable<any> {
    const url = `${this.USER_ORDERS}/${userId}`;
    return this.http.get(url);
  }

  getOrderById(orderId: number):Observable<any> {
    const url = `${this.ORDER_ID}/${orderId}`;
    return this.http.get(url);
  }

}
