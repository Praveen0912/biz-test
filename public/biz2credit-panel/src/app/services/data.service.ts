import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  
  //rootUrl = 'http://localhost:8080/';
  rootUrl = '';
  
  addUserDataByTextDile(data): Observable<any> {
    var apiUrl =this.rootUrl+'user/create-user'; 
    const headers = new HttpHeaders({});
    return this.http.post(apiUrl, data, { headers: headers })
  }

  getUserbyLocation(long, lat): Observable<any> {
    var apiUrl =this.rootUrl+'user/user-search/'+long+'/'+lat; 
    const headers = new HttpHeaders({});
    return this.http.get(apiUrl, { headers: headers })
  }
  
  getAllUsers(): Observable<any> {
    var apiUrl =this.rootUrl+'user'; 
    const headers = new HttpHeaders({});
    return this.http.get(apiUrl, { headers: headers })
  }

}
