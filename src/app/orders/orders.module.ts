import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =[
    {path: '', component: OrderListComponent },
    {path: ':id', component: OrderDetailsComponent },
];

@NgModule({
    declarations: [
        OrderListComponent,
        OrderDetailsComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        OrderListComponent,
        OrderDetailsComponent
    ]
})
export class OrdersModule{}