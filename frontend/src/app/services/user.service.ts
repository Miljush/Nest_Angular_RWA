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
  vratiUseraZaCookie(){
    const user= this.http.get('http://localhost:3000/user/vratiUseraZaCookie',{
      withCredentials:true
    })
    return user
  }
  vratiLoggedStatus():Observable<boolean>{
    return this.http.get<boolean>('http://localhost:3000/user/vratiLoggedStatus',{
      withCredentials:true
    })
  }
  async kreirajUsera(credentials:any): Promise<boolean>{
    console.log(credentials);
    const url = 'http://localhost:3000/user/register';
    try {
      await this.http.post(url, credentials, {
        withCredentials: true
      }).toPromise();
  
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  vratiUsera(){
    return this.http.get<any>('http://localhost:3000/user/vratiUsera')
  }
}

