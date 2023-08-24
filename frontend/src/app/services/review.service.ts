import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }

  vratiSveReviews(id:number):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:3000/review/vratiKomentareZaId/${id}`,{
      withCredentials:true
    })
  }
}
