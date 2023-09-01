import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReceptService } from 'src/app/services/recept.service';
import { vratiRecepte } from 'src/app/store/actions/recept.actions';
import { selectorError, selectorLoading, selectorRecepti } from 'src/app/store/selectors/recept.selectors';
import { Recept } from 'src/app/store/types/recept';
import { ReceptStateInterface } from 'src/app/store/types/recept.interface';

@Component({
  selector: 'app-svi-recepti',
  templateUrl: './svi-recepti.component.html',
  styleUrls: ['./svi-recepti.component.scss']
})
export class SviReceptiComponent {
  isLoading$: Observable<boolean>;
  recepts$: Observable<Recept[]>;
  error$:Observable<string | null>;
  recepts: any[] = [];

  constructor(private dataService: ReceptService,private store: Store<ReceptStateInterface>) {
    this.isLoading$ = this.store.select(selectorLoading);
    this.error$=this.store.select(selectorError);
    this.recepts$=this.store.select(selectorRecepti);
  }

  ngOnInit(): void {
    this.store.dispatch(vratiRecepte());
  }
}
