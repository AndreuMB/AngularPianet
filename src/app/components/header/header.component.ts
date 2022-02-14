import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../service/register.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: boolean= false;
  constructor(private registerService: RegisterService,) { }

  ngOnInit(): void {
    this.registerService.logged.subscribe(l => {
      console.log("login= ",l);
      
      this.user=l
    })
  }

  logout(){
    this.registerService.logout();
  }

}
