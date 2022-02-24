import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Sheets } from '../interfaces/sheets';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  // sheets = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  getSheets():Observable<Sheets[]>{
    let url = "https://daw2022-64f58-default-rtdb.europe-west1.firebasedatabase.app/users/";
    console.log("localId = " +localStorage.getItem('localId'));
    
    let url2 = url+localStorage.getItem('localId')+"/sheets.json?auth="+localStorage.getItem('idToken');
    let sheets = this.http.get<{[key: string]: Sheets}>(url2)
    .pipe(
      map( sObjecte => Object.entries(sObjecte)),
      map( sArray => sArray.map(s=> { 
        s[1].id = s[0]; return s[1]
      }))
    );
    // this.sheets.next(sheets);
    
    return sheets;
  }

  addSheet(sheet_title:string):Observable<{}>{
    let url = "https://daw2022-64f58-default-rtdb.europe-west1.firebasedatabase.app/users/"
    +localStorage.getItem('localId')+"/";
    let url2 = url+"sheets.json?auth="+localStorage.getItem('idToken');
    return this.http.post<Sheets>(url2,JSON.stringify({"title" : sheet_title, "img" : "/assets/img/note.png"}));
  }

  deleteSheet(sheet_id:string):Observable<any>{
    let url = "https://daw2022-64f58-default-rtdb.europe-west1.firebasedatabase.app/users/"
    +localStorage.getItem('localId')+"/sheets/";
    let url2 = url+sheet_id+".json?auth="+localStorage.getItem('idToken');
    return this.http.delete<Sheets>(url2);
  }

  getSheet():Observable<Sheets>{
    let sheet_id:string = localStorage.getItem("idSheet")!;
    let url = "https://daw2022-64f58-default-rtdb.europe-west1.firebasedatabase.app/users/"
    +localStorage.getItem('localId')+"/sheets/";
    let url2 = url+sheet_id+".json?auth="+localStorage.getItem('idToken');
    return this.http.get<Sheets>(url2);
  }

  saveSheet(sheetNotes:any, img:string):Observable<Sheets>{
    let sheet_id:string = localStorage.getItem("idSheet")!;
    let url = "https://daw2022-64f58-default-rtdb.europe-west1.firebasedatabase.app/users/"
    +localStorage.getItem('localId')+"/sheets/";
    let url2 = url+sheet_id+".json?auth="+localStorage.getItem('idToken');
    console.log("url2 = " + url2);
    
    return this.http.patch<Sheets>(url2,JSON.stringify({"sheetNotes" : sheetNotes, "img" : img}));
  }
}
