import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(private cookieService: CookieService,private http:HttpClient) { }

   login(credentials: any):Observable<string> {
    const url = 'http://localhost:3000/user/login';

    return this.http.post<string>(url,credentials,{
      withCredentials:true
    });
  }
  logout(): Observable<any> {
    localStorage.removeItem('loggedUser');
    return this.http.post(
      'http://localhost:3000/user/logout',
      {},
      {
        withCredentials: true,
      }
    );
  }
}
  

  

