import {Injectable} from '@angular/core';
import { Actions, createEffect,ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user.service';
import * as UserActions from '../actions/user.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects{
    loginUser$=createEffect(()=>
    this.actions$.pipe(
        ofType(UserActions.loginUser),
        mergeMap((user)=>{
            return this.authService.login(user.user).pipe(
                map((message)=>UserActions.loginUserSuccess({message:message})),
                catchError((error)=>
                    of(UserActions.loginUserFailure({error:error.message}))
                )
            )
        }

        )
    )
    )
    loginSuccess$ = createEffect(
        () =>
          this.actions$.pipe(
            ofType(UserActions.loginUserSuccess),
            tap(() => {
              if(!localStorage.getItem("loggedUser")){
                this.router.navigate(['/']);
              }
              this.userService.vratiUseraZaCookie().subscribe(
                (user)=>localStorage.setItem("loggedUser",JSON.stringify(user))
              )
            })
          ),
        { dispatch: false } // Avoid dispatching any action from this effect
      );
      logoutUser$=createEffect(()=>
      this.actions$.pipe(
          ofType(UserActions.logoutUser),
          mergeMap((user)=>{
              return this.authService.logout().pipe(
                  map((message)=>UserActions.logoutUserSuccess({message:"success"})),
                  catchError((error)=>
                      of(UserActions.logoutUserFailure({error:error.message}))
                  )
              )
          }
  
          )
      )
      )
      logoutSuccess$ = createEffect(
          () =>
            this.actions$.pipe(
              ofType(UserActions.logoutUserSuccess),
              tap(async () => {
                localStorage.removeItem("loggedUser");
                this.router.navigate(['/login']);
              })
            ),
          { dispatch: false } // Avoid dispatching any action from this effect
        );
      
      refreshUser$ = createEffect(() =>
        this.actions$.pipe(
          ofType(UserActions.refreshUser),
          map(() => {
            const userData = localStorage.getItem('loggedUser');
    
            if (userData) {
              const user = JSON.parse(userData);
              return UserActions.loginUserSuccess({ message: user });
            } else {
              return UserActions.logoutUser();
            }
          }),
          catchError((error) => of(UserActions.refreshUserFailure({ error })))
        )
      );
      vratiUsera$ = createEffect(()=>
      this.actions$.pipe(
        ofType(UserActions.vratiUsera),
        mergeMap((action)=> {
            return this.userService.vratiUseraZaId(action.id).pipe(
                map((user)=>UserActions.vratiUseraSuccess({user:user})),
                catchError((error)=>
                of(UserActions.vratiUseraFailure({error: error.message})))
            )
        })
    )
    )
    updateUser$ = createEffect(()=>
      this.actions$.pipe(
        ofType(UserActions.updateUser),
        mergeMap((action)=> {
            return this.userService.updateUser(action.user.id,action.user.ime,action.user.prezime,action.user.username,action.user.slika).pipe(
                map((user)=>UserActions.updateUserSuccess({user:user})),
                catchError((error)=>
                of(UserActions.updateUserFailure({error: error.message})))
            )
        })
    )
    )


    constructor(private actions$: Actions, private authService:AuthenticationService,private router: Router,private userService:UserService ) {}
}
