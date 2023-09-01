import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../store/types/komentar';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }

  vratiSveReviews(id:number):Observable<Review[]>{
    return this.http.get<Review[]>(`http://localhost:3000/review/vratiKomentareZaId/${id}`,{
      withCredentials:true
    })
  }
}
