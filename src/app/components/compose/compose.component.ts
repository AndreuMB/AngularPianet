import { Component, OnInit } from '@angular/core';
import Vex from "vexflow";

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {

  notes = 'A,B,C,D,E,F,G'.split(',');
  context:any;
  data:any;

  constructor() { }

  ngOnInit(): void {
    // container
    let container=document.querySelector('#container')!;
    
    // div
    // let div = document.createElement('div');
    // div.id='stave_container';
    // container.append(div);
    // div.style.backgroundColor='white';
    let div:any = document.querySelector("#stave_container")!;
    
    
    // COMPLEX VF
    
    let VF = Vex.Flow;    
    
    let renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    
    // Size our SVG:
    renderer.resize(div.offsetWidth, 700); // width and height to print notes
    
    // Get a drawing context:
    let context:any = renderer.getContext();
    this.context = context;
    
    // ini void vars
    // let notesMeasurex:any = [];
    // let notesComplete:any = [];
    // let timex = 10; // x position time
    // let yStave = 0; // position y of stave
    // let group:any = {};
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
    
    // let stave:any = [];
    // let song:any = []

    // time / set first stave position
    data.staveMeasurex = new Vex.Flow.Stave(10,0,300);
  
    data.staveMeasurex.addClef("treble").addTimeSignature("4/4");
    data.staveMeasurex.setContext(context).draw(); // print stave/time
    
  }

  print_note(id:String){
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
    if (data.notesMeasurex.length != 0) {
      context.svg.removeChild(data.group);
    }
    data.group = context.openGroup();

    // add note
    data.notesMeasurex.push(new Vex.Flow.StaveNote({ keys: [""+id+"/4"], duration: "q" }));
    data.notesComplete.push(new Vex.Flow.StaveNote({ keys: [""+id+"/4"], duration: "q" }));

    console.log('id = ' + id, " context = ", context + " data = " , data);

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
  

}
