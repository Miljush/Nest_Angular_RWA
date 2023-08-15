import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  form:FormGroup;
  
  
  

  constructor(private authService: AuthenticationService, private http: HttpClient,private cookieService: CookieService,private userService:UserService,private router: Router) {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async login() {
    const credentials=this.form.value;
  
    (await this.authService.login(credentials)).subscribe(
      async (response) => {
        await this.vratiUseraZaCookie();
        this.router.navigate(['']);
      },
      () => {
        alert('pogresna sifra ili username');
      }
    );
    
    
  }
  async logout(){
    this.authService.logout();
    localStorage.removeItem("loggedUser");
  }
  async ngOnInit() {
    
     

  }
  async vratiSveUsere(){

    this.users.forEach(user => {
      console.log(user);
    });
    
  }
  async vratiUseraZaCookie(){
    await (await this.userService.vratiUseraZaCookie()).subscribe(
      async (data:any)=>{
        this.user=await data;
        localStorage.setItem("loggedUser",JSON.stringify(this.user));
      }
    )
  }
  prikazi(){
    console.log(this.user);
  }
}
