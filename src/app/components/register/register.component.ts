import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegisterService } from 'src/app/service/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!:FormGroup;

  constructor(private registerService: RegisterService, private formBuilder: FormBuilder,
    private router: Router) {
    this.createForm();
  }
  createForm(){
    // can be done in the constructor
    this.registerForm= this.formBuilder.group({
      username: ['',[Validators.required, Validators.minLength(3)]],
      email: ['',[Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    })
  }

  get emailNotValid(){
    if (this.registerForm.get('email')?.invalid && 
    this.registerForm.get('email')?.touched) {
      return "is-invalid";
    }
    if (this.registerForm.get('email')?.valid && 
    this.registerForm.get('email')?.touched) {
      return "is-valid";
    }
    return "";
  }
  
  get usernameNotValid(){
    if (this.registerForm.get('username')?.invalid && 
    this.registerForm.get('username')?.touched) {
      return "is-invalid";
    }
    if (this.registerForm.get('username')?.valid && 
    this.registerForm.get('username')?.touched) {
      return "is-valid";
    }
    return "";
  }

  get passwordNotValid(){
    if (this.registerForm.get('password')?.invalid && 
    this.registerForm.get('password')?.touched) {
      return "is-invalid";
    }
    if (this.registerForm.get('password')?.valid && 
    this.registerForm.get('password')?.touched) {
      return "is-valid";
    }
    return "";
  }

  ngOnInit(): void {
    
  }

  register(){
    // let data1 = {"email":this.email,"password":this.psswd}
    // this.registerService.registerAuth(data1).subscribe(datos=>{
    //   console.log(datos);
    //   let data2 = {"user": this.user, "email":this.email}
    //   this.registerService.registerDB(data2).subscribe(datos=>{
    //     console.log(datos);
    //     window.location.href = "/#/login";
    //   })
    // })
    console.log(this.registerForm.value);
    
    this.registerService.registerAuth(this.registerForm.value).subscribe(datos=>{
      console.log(datos);
      // let data2 = {"user": this.user, "email":this.email}
      this.registerService.registerDB(this.registerForm.value).subscribe(datos=>{
        console.log(datos);
        this.router.navigate(['/login']);
      })
    })
  }

}
