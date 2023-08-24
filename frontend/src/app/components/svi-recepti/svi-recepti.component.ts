import { Component } from '@angular/core';
import { ReceptService } from 'src/app/services/recept.service';

@Component({
  selector: 'app-svi-recepti',
  templateUrl: './svi-recepti.component.html',
  styleUrls: ['./svi-recepti.component.scss']
})
export class SviReceptiComponent {

  recepts: any[] = [];

  constructor(private dataService: ReceptService) {}

  ngOnInit(): void {
    this.dataService.vratiSveRecepte().subscribe(data=>{
      this.recepts=data;
    })
  }
}
