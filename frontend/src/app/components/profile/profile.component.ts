import { Component, OnInit } from '@angular/core';
import { ReceptService } from 'src/app/services/recept.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  imageSrc: string = '';
  prezime: string = '';
  ime: string = '';
  username: string = '';
  recepti:any[]=[];
  constructor(private receptService:ReceptService){}
  ngOnInit(): void {
    const userLocal = localStorage.getItem('loggedUser');
    if (userLocal) {
      const userdata = JSON.parse(userLocal);
      this.imageSrc = userdata.slika;
      this.ime = userdata.ime;
      this.prezime = userdata.prezime;
      this.username = userdata.username;
      this.receptService.vratiRecepteZaUsera(userdata.id).subscribe((data)=>
      this.recepti=data
      )
    }
    
    
  }
}
