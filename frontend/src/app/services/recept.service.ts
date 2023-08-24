import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceptService {

  constructor(private http:HttpClient) { }

  vratiSveRecepte(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/recept/vratiSveRecepte',{
      withCredentials: true, // Send cookies with the request
    })
  }
  vratiRecept(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/recept/vratiRecept/${id}`,{
      withCredentials:true,
    })
  }
  vratiRecepteZaUsera(id:number):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:3000/recept/vratiRecepteZaUsera/${id}`,{
      withCredentials:true,
    })
  }
}
