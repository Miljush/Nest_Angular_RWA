import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recept, ReceptAdd } from '../store/types/recept';

@Injectable({
  providedIn: 'root'
})
export class ReceptService {

  constructor(private http:HttpClient) { }

  vratiSveRecepte(): Observable<Recept[]>{
    return this.http.get<Recept[]>('http://localhost:3000/recept/vratiSveRecepte',{
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
  dodajRecept(recept:ReceptAdd):Observable<Recept>{
    console.log(recept.priprema);
    const receptData = {
      id: recept.id,
      ime: recept.ime,
      opis: recept.opis,
      priprema: recept.priprema,
      sastojci: recept.sastojci,
      slike:recept.slike
    }
    return this.http.post<Recept>('http://localhost:3000/recept/createRecept',receptData,{
      withCredentials: true, 
    })
  }
  izbrisiRecept(id:number):Observable<Recept>{
    return this.http.delete<Recept>(`http://localhost:3000/recept/izbrisiRecept/${id}`,{
      withCredentials:true
    })
  }
}
