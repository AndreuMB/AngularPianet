import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../service/register.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: boolean=false;
  username:string="";
  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
    this.registerService.logged.subscribe(l => {
      console.log(l);
      console.log("login= ",l);
      this.user=l
    })
    this.registerService.getUser().subscribe(user =>{
      console.log(user);
      this.username = user.username;
    })
  }

  logout(){
    this.registerService.logout();
  }

}
