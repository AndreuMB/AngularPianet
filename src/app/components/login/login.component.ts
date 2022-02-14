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

  constructor(private registerService: RegisterService,private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    let data = {"email":this.email,"password":this.psswd}
  
    this.registerService.login(data).subscribe(datos=>{
      console.log(datos);
      this.router.navigate(['/home']);
    })
  }
}
