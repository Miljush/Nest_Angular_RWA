import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit 
{
  constructor(
    private http:HttpClient,
    private readonly userService:UserService
  ){

  }
  async ngOnInit(): Promise<void> {
    (await this.userService.vratiUseraZaCookie()).subscribe(
      res=>{
        console.log(res)
        Emitters.authEmmiter.emit(true);
      },
      err=>{
        console.log(err)
        Emitters.authEmmiter.emit(false);

      }

    )
  }

}
