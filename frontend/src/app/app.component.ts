import { Store } from '@ngrx/store';
import { refreshUser } from './store/actions/user.actions';
import * as UserActions from './store/actions/user.actions';
import { Component, OnInit } from '@angular/core';
import 'bootstrap';
import { UserStateInterface } from './store/types/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<UserStateInterface>) {}
  title = 'Client';

  ngOnInit(): void {
    // Check local storage for user data
    const userData = localStorage.getItem('loggedUser');
    if (userData) {
      this.store.dispatch(UserActions.refreshUser({message: JSON.stringify(userData)}));
    }
  }
}
