import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword = true;


  constructor(
    private formBuilder: FormBuilder,
  ){

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[null, [Validators.required]],
      password:[null,[Validators.required]]
    })

  }


  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(){

  }



}
