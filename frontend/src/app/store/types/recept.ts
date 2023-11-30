export interface ReceptPostInt {
    id?: number;
    ime?: string;
    opis?: string;
    priprema?: string;
    sastojci?: string[];
    slike?: string[];
    createdAt?: Date;
  }
  
  export class CreateReceptInt {
    ime?: string;
    opis?: string;
    sastojci?: string[];
    priprema?:string;
    slike?:string[];
    id?: number; 
  }

  export class ReceptAdd implements ReceptPostInt {
    id?: number;
    ime?: string;
    opis?: string;
    sastojci?: string[];
    slike?: string[];
    priprema?:string;

    constructor(
      id?: number,
      ime?: string,
      opis?: string,
      priprema?: string,
      sastojci?: string[],
      slike?: string[],
    ) {
      this.id = id;
      this.ime = ime;
      this.opis = opis;
      this.priprema = priprema;
      this.sastojci = sastojci;
      this.slike = slike;
    }
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