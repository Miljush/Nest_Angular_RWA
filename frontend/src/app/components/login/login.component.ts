import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

interface ApiResponse {
  message: string;
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: any[] = [];
  user:any;

  constructor(private authService: AuthenticationService, private http: HttpClient,private cookieService: CookieService,private userService:UserService) {}

  async login() {
    const credentials = {
      username:"milos1234",
      sifra:"milos1234"
    };
  
    await this.authService.login(credentials);
    const jwt = this.cookieService.get('jwt');
  }
  async logout(){
    this.authService.logout();
  }
  async ngOnInit() {
      const response=await this.userService.vratiSveUsere();
      response.forEach(res => {
        this.users.push(res);
      });

  }
  async vratiSveUsere(){

    this.users.forEach(user => {
      console.log(user);
    });
    
  }
  async vratiUseraZaCookie(){
    const user=await (await this.userService.vratiUseraZaCookie()).subscribe(
      async (data:any)=>{
        this.user=await data;
        console.log(this.user);
      }
    )
  }
  prikazi(){
    console.log(this.user);
  }
}
