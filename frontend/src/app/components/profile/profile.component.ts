import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReceptService } from 'src/app/services/recept.service';
import { vratiRecepteZaUsera } from 'src/app/store/actions/recept.actions';
import { selectorReceptiZaUsera } from 'src/app/store/selectors/recept.selectors';
import { Recept } from 'src/app/store/types/recept';
import { ReceptStateInterface, ReceptiUserStateInterface } from 'src/app/store/types/recept.interface';

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
  recepti$:Observable<Recept[]>
  constructor(private receptService:ReceptService,private store: Store<ReceptiUserStateInterface>){
    this.recepti$=this.store.select(selectorReceptiZaUsera)
  }
  ngOnInit(): void {
    const userLocal = localStorage.getItem('loggedUser');
    
    if (userLocal) {
      const userdata = JSON.parse(userLocal);
      this.imageSrc = userdata.slika;
      this.ime = userdata.ime;
      this.prezime = userdata.prezime;
      this.username = userdata.username;
      this.store.dispatch(vratiRecepteZaUsera({id:userdata.id}))
    }
    
    
  }
}
