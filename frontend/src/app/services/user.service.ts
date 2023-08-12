import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private cookieService: CookieService) { }

  async vratiSveUsere() {
    const response=await this.http.get('http://localhost:3000/user/vratiSveUsere',{
      withCredentials: true, // Send cookies with the request
    })
    return response;
  }
  async vratiUseraZaCookie(){
    const user=await this.http.get('http://localhost:3000/user/vratiUseraZaCookie',{
      withCredentials:true
    })
    return await user
  }
}

