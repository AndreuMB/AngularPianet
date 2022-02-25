import { Component, OnInit } from '@angular/core';
import { fromEvent, throttleTime } from 'rxjs';
import { RegisterService } from 'src/app/service/register.service';
import { SheetsService } from 'src/app/service/sheets.service';
import Vex from "vexflow";

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {

  notes = 'A,B,C,D,E,F,G'.split(',');
  user: boolean=false;
  context:any;
  data:any;

  constructor(private sheetsService: SheetsService,
    private registerService: RegisterService) { }

  ngOnInit(): void {
    // container
    // let container=document.querySelector('#container')!;
    this.registerService.logged.subscribe(l => {
      console.log(l);
      console.log("login= ",l);
      this.user=l
    })

    
    // ini void vars
    let data:any = {
      notesMeasurex : [],
      notesComplete : [],
      staveMeasurex : {},
      timex : 10,
      yStave : 0,
      group : {},
      div : document.querySelector("#stave_container"),
    }
    this.data = data;
    this.getSheet();
    // this.createSheet();

    const resizeObservable = fromEvent(window, "resize").pipe(throttleTime(100));

  resizeObservable.subscribe((e) => {
    this.data.div.innerHTML="";
    this.createSheet();
    console.log("resize ", this.data.notesComplete);
    this.data.notesComplete.forEach((element: any) => {
      console.log(element.keys);
      this.print_note(element.keys,false);
    });
  })
    
  }

  getSheet(){
    this.createSheet();
    if (localStorage.getItem("idSheet")) {
      this.sheetsService.getSheet()
      .subscribe({next:datos=>{
        console.log("datos getSheet", datos);
        if (datos.sheetNotes) {
          this.data.notesComplete = datos.sheetNotes;
          console.log("enter notes complete ", this.data.notesComplete);
          this.data.notesComplete.forEach((element: any) => {
            console.log(element.keys);
            this.print_note(element.keys,false);
          });
        }
      }})
    }
    
  }


  createSheet(){
    this.data.notesMeasurex = [];
    this.data.timex = 10;
    this.data.yStave = 0;
    
    // COMPLEX VF
    
    let VF = Vex.Flow;    
    
    let renderer = new VF.Renderer(this.data.div, VF.Renderer.Backends.SVG);
    
    // Size our SVG:
    renderer.resize(this.data.div.offsetWidth, 700); // width and height to print notes
    
    // Get a drawing context:
    this.context = renderer.getContext();
    
    // let stave:any = [];
    // let song:any = []

    // time / set first stave position
    this.data.staveMeasurex = new Vex.Flow.Stave(10,0,300);
  
    this.data.staveMeasurex.addClef("treble").addTimeSignature("4/4");
    this.data.staveMeasurex.setContext(this.context).draw(); // print stave/time
    // this.data.notesMeasurex={};
  }

  print_note(id:String,sw:boolean=true){
    // console.log("print_note");
    
    let data = this.data;
    let context = this.context;
    
    if (data.notesMeasurex.length == 4) {
      data.timex = data.timex + 300;
      console.log("timex = " + data.timex + " div = " + data.div.offsetWidth);
      if (this.change_line(data.timex+300, data.div.offsetWidth)) {
        data.timex = 10;
        data.yStave += 100;
      }
      // new time / x,y,width
      data.staveMeasurex = new Vex.Flow.Stave(data.timex,data.yStave,300);
      data.staveMeasurex.setContext(context).draw(); // print stave/time
      data.notesMeasurex = [];
    }


    // reload time
    console.log("data.notesMeasurex.length" , data.notesMeasurex.length);
    
    if (data.notesMeasurex.length != 0) {
      console.log("remove child");
      
      context.svg.removeChild(data.group);
    }
    data.group = context.openGroup();

    // add note
    data.notesMeasurex.push(new Vex.Flow.StaveNote({ keys: [id+"/4"], duration: "q" }));
    if (sw) {
      data.notesComplete.push({ keys: id+"/4", duration: "q" });
    }

    // console.log('id = ' + id, " context = ", context + " data = " , data);

    // print notes
    Vex.Flow.Formatter.FormatAndDraw(context, data.staveMeasurex, data.notesMeasurex);
    
    context.closeGroup();
    console.log(data.notesMeasurex);
    this.data = data;
    return data;
  }

  change_line(width_stave:number, width_div:number):boolean{
    if (width_stave>width_div) {
      return true;
    }
    return false;
  }


  saveSheet(){
    let svg = document.querySelector("svg")!;
    // console.log("svg " , svg);
    
    var xml = new XMLSerializer().serializeToString(svg);
  
    // make it base64
    var svg64 = btoa(xml);
    var b64Start = 'data:image/svg+xml;base64,';
  
    // prepend a "header"
    let image64:any = b64Start + svg64;


    // console.log("image ", image64);
    

    console.log(this.data.notesComplete);
    
    this.sheetsService.saveSheet(this.data.notesComplete,image64)
    .subscribe({next:datos=>{
      // console.log(datos);
      
    
    }})
  }
  

}
