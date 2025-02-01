import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes =[
]

@NgModule({
    declarations: [
        TopNavigationComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        TopNavigationComponent
    ]
})
export class BaseModule{}