import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noCuatroNumerosSeguidos } from 'src/app/shared';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {

  loading: boolean = false;

  customForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private snackbar: MatSnackBar,
    private router: Router,
    private dialogRef: MatDialogRef<AddCustomerComponent>,
    private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.customForm=this.fb.group({
      /*
      name:[null, Validators.required],
      lastName:[null,Validators.required ],
      identification:[null,[Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dateOfBirth:[null,Validators.required ]
    })*/

      name: [data?.name || '', Validators.required],
      lastName: [data?.last_name || '', Validators.required],
      identification: [data?.identification || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dateOfBirth: [data?.date_of_birth || '', Validators.required]
  })
}
  /*
  submitForm(){
    this.customerService.postCustomer(this.customForm.value).subscribe(data=>{
      console.log(data);
      this.snackbar.open("Customer Client Posted Successfuly", 'Close', {duration:5000});
      this.router.navigateByUrl("/login")
    }, error=>{
      this.snackbar.open(`${error.error}`,'Close',{duration:5000})
    })
  }*/


    submitForm(){
      this.loading = true;
      if (this.data?.id) {
        // Llama al servicio de actualización si hay un ID
        this.customerService.updateCustomer(this.data.id, this.customForm.value).subscribe({
          next: (data) => {
            console.log(data);
            this.loading = false;
            this.dialogRef.close(true);  // Cierra el diálogo y notifica éxito
            this.snackbar.open("Customer updated successfully", 'Close', {
              duration: 5000,
              panelClass: ['mat-snackbar_success']
            });
          },
          error: () => {
            this.loading = false;
            this.snackbar.open(`Error al actualizar`, 'Close', {
              duration: 5000,
              panelClass: ['mat-snackbar_error']
            });
          }
        });
      } else {
        // Llama a la creación de nuevo cliente si no hay ID
        this.customerService.postCustomer(this.customForm.value).subscribe({
          next: (data) => {
            this.loading = false;
            this.dialogRef.close(true);
            this.snackbar.open("Customer created successfully", 'Close', {
              duration: 5000,
              panelClass: ['mat-snackbar_success']
            });
          },
          error: () => {
            this.loading = false;
            this.snackbar.open(`Error al crear cliente`, 'Close', {
              duration: 5000,
              panelClass: ['mat-snackbar_error']
            });
          }
        });
      }

      /*

      this.customerService.postCustomer(this.customForm.value).subscribe({
        next:(data)=>{
          this.loading=false;
          this.dialogRef.close();
          console.log(data);

          this.snackbar.open("Customer Client Posted Successfuly", 'Close', {duration:5000, panelClass:['mat-snackbar_success']});

        },error:()=>{
          this.snackbar.open(`datos incompletos`,'Close',{duration:5000, panelClass:['mat-snackbar_error']})
          this.loading=false;
        }
      })*/
    }

    cancel(){
      this.dialogRef.close();
    }

}
