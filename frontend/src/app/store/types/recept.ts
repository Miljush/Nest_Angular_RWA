export interface ReceptPostInt {
    id?: number;
    ime?: string;
    opis?: string;
    priprema?: string;
    sastojci?: string[];
    slike?: string[];
    createdAt?: Date;
  }
  
  export class Recept implements ReceptPostInt {
    id?: number;
    ime?: string;
    opis?: string;
    priprema?: string;
    sastojci?: string[];
    slike?: string[];
    createdAt?: Date;
  
    constructor(
      id?: number,
      ime?: string,
      opis?: string,
      priprema?: string,
      sastojci?: string[],
      slike?: string[],
      createdAt?: Date,
    ) {
      this.id = id;
      this.ime = ime;
      this.opis = opis;
      this.priprema = priprema;
      this.sastojci = sastojci;
      this.slike = slike;
      this.createdAt = createdAt;
    }
  }