import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, catchError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  logged = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private router: Router) { 
    if(localStorage.getItem('idToken')){
      this.logged.next(true);
    }
  }

  registerAuth(dataJSON:{}):Observable<{}>{
    // let datos = { ...dataJSON, returnSecureToken: true };
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
    let url = "https://daw2022-64f58-default-rtdb.europe-west1.firebasedatabase.app/users/";
    let url2 = url+localStorage.getItem('localId')+".json?auth="+localStorage.getItem('idToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('localId');
    return this.http.put<{}>(url2,JSON.stringify(dataJSON));
  }

  login(data:{}):Observable<{}>{
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCFfIeHfupYXw89FUOMeorhfQrndz7iIck";
    
    return this.http.post<{idToken:string, localId:string}>(url,JSON.stringify(data))
    .pipe(
      map(response => {
        console.log("response", response);
        localStorage.setItem('idToken',response.idToken);
        localStorage.setItem('localId',response.localId);
        this.logged.next(true);
        return response;
      })
    )
  }

  logout(){
    localStorage.removeItem('idToken');
    localStorage.removeItem('localId');
    localStorage.removeItem("idSheet");

    this.logged.next(false);
    this.router.navigate(['/home']);
  }

  
}
