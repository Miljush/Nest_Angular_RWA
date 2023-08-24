export class CreateReceptDto {
    ime: string;
    opis: string;
    sastojci: string[];
    priprema:string[];
    slike:string[];
    id: number; // The userId associated with the recipe
  }