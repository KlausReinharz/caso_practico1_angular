import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from './Pages/add-customer/add-customer.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerService } from './services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit{



  displayedColumns: string[]=[
    'id',
    'name',
    'last_name',
    'email_generated',
    'identification',
    'date_of_birth',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private customerservice: CustomerService,
    private activatedRouter: ActivatedRoute,
    private snackbar: MatSnackBar
  ){
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





  openEditCustomer(id?: number): void {
    if (id) {
      // Modo edición: obtiene los datos del cliente
      this.customerservice.getCustomerById(id).subscribe(customerData => {
        this.getCustomerList();
        this.dialog.open(AddCustomerComponent, {
          width: '400px',
          data: customerData
            // Pasar los datos del cliente para edición
        });

      });
    } else {
      // Modo creación: abre el diálogo sin datos
      this.dialog.open(AddCustomerComponent, {
        width: '400px',
        data: {}  // Pasar un objeto vacío para un nuevo cliente
      });

    }
  }

  deleteCustomer(id:number){
    this.customerservice.deleteCustomer(id).subscribe(res=>{
      this.snackbar.open("Delete exitosamente", 'Close', {duration:5000, panelClass:['mat-snackbar_success']});
      this.getCustomerList();
    }, error=>{
        this.snackbar.open(`No se pudo eliminar`,'Close',{duration:5000, panelClass:['mat-snackbar_error']})
    })
  }



}
