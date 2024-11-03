import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { DemoAngularMaterailModule } from 'src/app/DemoAngularMaterialModule';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCustomerComponent } from './Pages/add-customer/add-customer.component';



@NgModule({
  declarations: [
    CustomerComponent,
    AddCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DemoAngularMaterailModule,
    ReactiveFormsModule,

  ]
})
export class CustomerModule { }
