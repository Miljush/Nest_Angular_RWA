import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  imageSrc: string="";

  ngOnInit(): void {
    const userLocal=localStorage.getItem("loggedUser");
    if(userLocal){
      const userdata=JSON.parse(userLocal);
      this.imageSrc=userdata.slika;
    }
   
  }
}
