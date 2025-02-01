import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderId : number| null = null;
  order: any = null;
  orderItem: any={}; 
  constructor(
    private route:ActivatedRoute, private router: Router, 
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.order = this.fetchOrderById(this.orderId);
  }

  fetchOrderById(orderId: number) {
    if(!orderId){
      return;
    }
    console.log(orderId);
    this.orderService.getOrderById(orderId).subscribe(
      (data => {
        console.log(data);
        this.order=data;
        console.log("Order Items:", this.order.orderItems);
      })
    )
  }

  goBack():void {
    this.router.navigate(['/orders']);
  }

}
