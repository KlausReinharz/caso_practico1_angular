import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from './Pages/add-customer/add-customer.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  Person!:FormGroup;

  constructor(private fb: FormBuilder,
    private dialog: MatDialog
  ){

  }

  openAddEditCustmFor(){
    this.dialog.open(AddCustomerComponent);
  }



}
