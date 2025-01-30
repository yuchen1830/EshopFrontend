import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  userId = 1; // need cookie info

  orders: any[] = [];
  selectedFilter = 'all';
  startDate: string = '';
  endDate: string = '';

  orderItems: any[] = [];
  selectedOrder: any = null;
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchOrders();
  }

  // all orders
  fetchOrders() {
    this.selectedFilter = 'all';
    this.http.get<any[]>(`/api/orders/${this.userId}`).subscribe(
      data => (this.orders = data),
      error => console.error('Error fetching orders:', error)
    );
  }

  // orders in date range
  fetchOrdersByDate() {
    if (!this.startDate || !this.endDate) {
      alert('Please select a valid date range.');
      return;
    }

    this.http.get<any[]>(`/api/orders/date-range`, {
      params: {
        startDate: this.startDate,
        endDate: this.endDate
      }
    }).subscribe(
      data => (this.orders = data),
      error => console.error('Error fetching orders by date:', error)
    );
  }

  // order items
  viewOrderItems(order: any) {
    this.selectedOrder = order;
    this.http.get<any[]>(`/api/orders/${order.id}/items`).subscribe(
      data => (this.orderItems = data),
      error => console.error('Error fetching order items:', error)
    );
  }
}
