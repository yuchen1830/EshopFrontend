import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/Login.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [				
    AppComponent,
      LoginComponent,
      ProductComponent,
      OrderComponent,
      CartComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
