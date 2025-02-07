import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { BaseModule } from './base/base.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [				
    AppComponent,
      CartComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BaseModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
