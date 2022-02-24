import { Component, OnInit } from '@angular/core';
import { SheetsService } from 'src/app/service/sheets.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sheet-details',
  templateUrl: './sheet-details.component.html',
  styleUrls: ['./sheet-details.component.css']
})
export class SheetDetailsComponent implements OnInit {
  title = "";
  constructor(private sheetsService: SheetsService,
    private rutes: ActivatedRoute) { }

  ngOnInit(): void {
    this.rutes.params.subscribe(params => {
      let id= params['id'];
      localStorage.setItem("idSheet", id);
      this.sheetsService.getSheet().subscribe(datos=>{
        console.log(datos);
        this.title=datos.title;
      })
    })
  }

  // saveSheet(){
  //   // this.ngOnInit();
  //   // this.createSheet();
  //   console.log("enter", this.data.notesComplete); // behaviiour subject
  //   // print notes
  //   // Vex.Flow.Formatter.FormatAndDraw(this.context, this.data.staveMeasurex, this.data.notesComplete);
  //   this.sheetsService.saveSheet("test",this.data.notesComplete);
  // }

  

}
