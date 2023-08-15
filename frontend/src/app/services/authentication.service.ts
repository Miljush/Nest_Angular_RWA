import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(private cookieService: CookieService,private http:HttpClient) { }

  async login(credentials: any) {
    const url = 'http://localhost:3000/user/login';

    const response = await this.http.post(url, credentials, {
      responseType: 'text', // Receive the response as text (including the cookie)
      withCredentials: true, // Send cookies with the request
    });
    return response;
  }
  async logout(): Promise<any> {
    const url = 'http://localhost:3000/user/logout';

    await this.http.post(url, null, {
      withCredentials: true, // Send cookies with the request
    }).toPromise();
  }
  

  
}
