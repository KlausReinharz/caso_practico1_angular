import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  signupForm!:FormGroup;

  hidePassword=true;

  constructor(private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private router:Router
  ){}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      userName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password:[null, [Validators.required]],
      confirmPassword:[null, [Validators.required]],
    })

  }

  tooglePasswordVisibility(){
    this.hidePassword =  !this.hidePassword;
  }

  onSubmit():void{
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if(password !== confirmPassword){
      this.snackbar.open("Password do not match.","Close", {duration:5000, panelClass:" error-snackbark"});
    }
  }


}
