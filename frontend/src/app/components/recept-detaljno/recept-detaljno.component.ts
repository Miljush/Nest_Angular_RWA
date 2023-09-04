import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceptService } from '../../services/recept.service'; // Adjust the import path
import { ReviewService } from 'src/app/services/review.service';
import { Observable } from 'rxjs';
import { ReceptSingleStateInterface } from 'src/app/store/types/recept.interface';
import { Store } from '@ngrx/store';
import { selectorErrorSingleRecept, selectorLoadingSingleRecept, selectorRecept } from 'src/app/store/selectors/recept.selectors';
import { vratiRecept } from 'src/app/store/actions/recept.actions';
import { KomentarAdd, Review } from 'src/app/store/types/komentar';
import { selectorReviews } from 'src/app/store/selectors/review.selectors';
import { vratiRevieweZaRecept,kreirajReview } from 'src/app/store/actions/review.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recept-detaljno',
  templateUrl: './recept-detaljno.component.html',
  styleUrls: ['./recept-detaljno.component.scss']
})
export class ReceptDetaljnoComponent implements OnInit {
  recept$: Observable<any|null>;
  reviews$: Observable<Review[]|null>;
  isLoading$: Observable<boolean>;
  error$:Observable<string | null>;
  imageSrc:string='';
  imageUrls:string[]=[];
  receptId:number=0;
  userId:number=0;
  form:FormGroup;

  constructor(private route: ActivatedRoute, private receptService: ReceptService,private reviewService:ReviewService,private store: Store<ReceptSingleStateInterface>,private store2: Store<ReceptSingleStateInterface>) {
    this.recept$=this.store.select(selectorRecept)
    this.isLoading$=this.store.select(selectorLoadingSingleRecept);
    this.error$=this.store.select(selectorErrorSingleRecept);
    this.recept$.subscribe((res)=>{
      this.imageUrls=res.slike
    })
    this.reviews$=this.store2.select(selectorReviews);
    this.form = new FormGroup({
      komentar: new FormControl('', Validators.required),
      starRating:new FormControl(null,Validators.required)
    });
   }

   

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.receptId=id;
      this.store.dispatch(vratiRecept({id:id}));
      this.store2.dispatch(vratiRevieweZaRecept({id:id}));
    });
    const userLocal = localStorage.getItem('loggedUser');
    
    if (userLocal) {
      const userdata = JSON.parse(userLocal);
      this.imageSrc = userdata.slika;
      this.userId=userdata.id
    }
    
  }
  handleImageChanged(imageUrl: string) {
    console.log('New image selected:', imageUrl);
  }
  dodajKomentar(){
    if (this.form.valid) {
      const review2=new KomentarAdd(this.userId,this.form.value.starRating,this.form.value.komentar,this.receptId);
      this.store2.dispatch(kreirajReview({review:review2}));
    }
    else{
      console.log("zoran")
    }
  }
}