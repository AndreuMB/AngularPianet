import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user='';
  email='';
  psswd='';

  constructor(private registerService: RegisterService) {}

  ngOnInit(): void {
    
  }

  register(){
    let data1 = {"email":this.email,"password":this.psswd}
    this.registerService.registerAuth(data1).subscribe(datos=>{
      console.log(datos);
      let data2 = {"user": this.user, "email":this.email}
      this.registerService.registerDB(data2).subscribe(datos=>{
        console.log(datos);
      })
    })
  }

}
