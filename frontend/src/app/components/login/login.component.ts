import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { selectorLoading, selectorLoggedin } from 'src/app/store/selectors/user.selectors';
import { UserStateInterface } from 'src/app/store/types/user.interface';
import * as UserActions from '../../store/actions/user.actions';

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
  isLoading$:Observable<boolean>;
  islogin$:Observable<boolean>;
  
  

  constructor(private authService: AuthenticationService, private http: HttpClient,private cookieService: CookieService,private userService:UserService,private router: Router,private store:Store<UserStateInterface>) {
    this.isLoading$=this.store.pipe(select(selectorLoading));
    this.islogin$=this.store.pipe(select(selectorLoggedin));
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async login():Promise<void> {
    const credentials=this.form.value;
    console.log(credentials);
    this.store.dispatch(UserActions.loginUser({ user: { username: credentials.username, password: credentials.password}}));
  }
  async ngOnInit() {
    
     

  }
  async vratiSveUsere(){

    this.users.forEach(user => {
      console.log(user);
    });
    
  }
  
  prikazi(){
    console.log(this.user);
  }
}
