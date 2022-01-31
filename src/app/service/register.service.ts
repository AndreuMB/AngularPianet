import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerAuth(dataJSON:{}):Observable<{}>{
    
    // let datos = { ...dataJSON, returnSecureToken: true };
    let data1 = {}
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCFfIeHfupYXw89FUOMeorhfQrndz7iIck";
    return this.http.post<{idToken:string, localId:string}>(url,JSON.stringify(dataJSON))
    .pipe(
      map(response => {
        console.log("response", response);
        localStorage.setItem('idToken',response.idToken);
        localStorage.setItem('localId',response.localId);
        return response;
      })
    );
  }

  registerDB(dataJSON:{}):Observable<{}>{
    // console.log("datos return", datos);
    // let data1 = { "email" : dataJSON.email };
    this.registerAuth(dataJSON);
    let url = "https://daw2022-64f58-default-rtdb.europe-west1.firebasedatabase.app/users/";
    let url2 = url+localStorage.getItem('localId')+".json?auth="+localStorage.getItem('idToken');

    let datos2 = this.http.put<{}>(url2,JSON.stringify(dataJSON));

    return datos2;


  }
  // getAccess():{}{
  //   const datos = {test: "test"};
  //   console.log(datos);
  //   return datos;
  // }
  
}
