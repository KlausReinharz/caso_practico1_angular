import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noCuatroNumerosSeguidos } from 'src/app/shared';
import { CustomerService } from '../../services/customer.service';
import { AnimationDurations } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

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
    private dialogRef: MatDialogRef<AddCustomerComponent>
  ){
    this.customForm=this.fb.group({
      name:[null, Validators.required],
      lastName:[null,Validators.required ],
      identification:[null,[Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dateOfBirth:[null,Validators.required ]
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

      this.customerService.postCustomer(this.customForm.value).subscribe({
        next:(data)=>{
          this.loading=false;
          this.dialogRef.close();
          console.log(data);

          this.snackbar.open("Customer Client Posted Successfuly", 'Close', {duration:5000});

        },error:()=>{
          this.snackbar.open(`Error ingress data`,'Close',{duration:5000})
          this.loading=false;
        }
      })
    }

    cancel(){
      this.dialogRef.close();
    }

}
