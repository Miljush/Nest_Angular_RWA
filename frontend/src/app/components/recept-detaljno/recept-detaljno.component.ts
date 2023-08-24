import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceptService } from '../../services/recept.service'; // Adjust the import path
import { ReviewService } from 'src/app/services/review.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recept-detaljno',
  templateUrl: './recept-detaljno.component.html',
  styleUrls: ['./recept-detaljno.component.scss']
})
export class ReceptDetaljnoComponent implements OnInit {
  recept: any;
  reviews: any[] = [];
  imageUrls:string[]=[];

  constructor(private route: ActivatedRoute, private receptService: ReceptService,private reviewService:ReviewService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.receptService.vratiRecept(id).subscribe(
        (res)=>{this.recept=res;this.imageUrls=res.slike}
      );
      this.reviewService.vratiSveReviews(id).subscribe(
        data=>{
          this.reviews=data;
        }
      )
    });
    
  }
  handleImageChanged(imageUrl: string) {
    console.log('New image selected:', imageUrl);
  }
  
}