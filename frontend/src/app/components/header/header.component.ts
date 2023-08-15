import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  imageSrc: string="";
  authenticated = true;
  constructor(private authService: AuthenticationService,private router: Router){}
  ngOnInit(): void {
    const userLocal=localStorage.getItem("loggedUser");
    if(userLocal){
      const userdata=JSON.parse(userLocal);
      this.imageSrc=userdata.slika;
    }
    Emitters.authEmmiter.subscribe(
      ( auth:boolean) =>{
        this.authenticated=auth;
      }
    )
  }
  async logout(): Promise<void>{
    localStorage.removeItem('loggedUser')
    await this.authService.logout();
    this.authenticated=!this.authenticated;
    this.router.navigate(["/login"])
  }
}
