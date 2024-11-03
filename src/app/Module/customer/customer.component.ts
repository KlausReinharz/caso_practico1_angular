import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from './Pages/add-customer/add-customer.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit{

  customerForm!: FormGroup;
  displayedColumns: string[]=[
    'id',
    'name',
    'last_name',
    'email_generated',
    'identification',
    'date_of_birth'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private customerservice: CustomerService,

  ){

  }

  openAddEditCustmFor(){
    this.dialog.open(AddCustomerComponent);
  }

  ngOnInit(): void {
      this.getCustomerList();
  }

  getCustomerList(){
    this.customerservice.getCustomer().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log
    })
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }



}
