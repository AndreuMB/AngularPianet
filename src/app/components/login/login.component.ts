import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/service/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email='';
  psswd='';
  errormsg='';

  constructor(private registerService: RegisterService,private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    let data = {"email":this.email,"password":this.psswd, "returnSecureToken" : true}

  
    this.registerService.login(data).subscribe({next:datos=>{
      console.log("enter");
      console.log("datos " + datos);
      this.router.navigate(['/home']);
    },
    error:(error) => {
      console.error('error caught in component')
      this.errormsg="Email or password incorrect"
    }})




  }
}
