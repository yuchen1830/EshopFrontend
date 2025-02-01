import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {OrderService} from 'src/app/services/order.service'

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  userId = 2; // hardcoded

  orders: any[] = [];
  orderItems: any[] = [];
  selectedOrder: any = null;
  
  constructor(
    private http: HttpClient, 
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.fetchUserOrders();
  }

  // all user orders
  fetchUserOrders() {
    console.log("fetch user order");
    this.orderService.getUserOrders(this.userId).subscribe(
      (data) => {
        console.log(data);
        this.orders=data;
      }
    )
  }

  // orders in date range

  // order items
  viewOrderItems(order: any) {
    this.selectedOrder = order;
    this.http.get<any[]>(`/api/orders/${order.id}`).subscribe(
      data => (this.orderItems = data),
      error => console.error('Error fetching order items:', error)
    );
  }
}
