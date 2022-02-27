import { Component, OnInit } from '@angular/core';
import { SheetsService } from 'src/app/service/sheets.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Sheets } from '../../interfaces/sheets';



@Component({
  selector: 'app-sheets',
  templateUrl: './sheets.component.html',
  styleUrls: ['./sheets.component.css']
})
export class SheetsComponent implements OnInit {

  sheets!: Sheets[];
  title:string="";
  filter:string="";
  constructor(private sheetsService: SheetsService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.sheetsService.getSheets().subscribe({next : datos=>{
      console.log("datos" , datos);
      this.sheets = datos;
    },
    error : () => {
      console.error('no sheets');
      this.sheets=[];
    }})
  }

  secureUrl(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  newSheet(){
    console.log(this.title);
    this.sheetsService.addSheet(this.title).subscribe(datos=>{
      console.log(datos);
      this.sheetsService.getSheets().subscribe(datos=>{
        console.log(datos);
        this.sheets = datos;
      })
    })
  }

  deleteSheet(id:string){
    console.log(id);
    this.sheetsService.deleteSheet(id).subscribe(datos=>{
      console.log(datos);
      this.sheetsService.getSheets().subscribe({next : datos=>{
        console.log(datos);
        this.sheets = datos;
      },
      error : error => {
        console.error('no sheets');
        this.sheets=[];
      }})
    })
  }

}
