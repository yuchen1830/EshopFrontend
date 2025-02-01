import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =[
    {path: '', component: ProductListComponent },
    {path: ':id', component: ProductDetailComponent },
];

@NgModule({
    declarations: [
        ProductListComponent,
        ProductDetailComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        ProductListComponent,
        ProductDetailComponent
    ]
})
export class ProductsModule{}