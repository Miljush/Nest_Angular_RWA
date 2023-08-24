import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserStateInterface } from 'src/app/store/types/user.interface';
import * as UserActions from '../../store/actions/user.actions';
import { selectUserFeature, selectorLoggedin } from 'src/app/store/selectors/user.selectors';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  isLoggedIn$:Observable<boolean>;
  constructor(private authService: AuthenticationService,private router: Router,private store:Store<UserStateInterface>,private readonly userService:UserService){
    this.isLoggedIn$=this.store.select(selectorLoggedin);
  }
  ngOnInit(): void {
    
  }
  logout(){
    this.store.dispatch(UserActions.logoutUser());
  }
}
