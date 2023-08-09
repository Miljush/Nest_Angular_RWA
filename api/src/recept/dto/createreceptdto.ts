export class CreateReceptDto {
    ime: string;
    opis: string;
    sastojci: string[];
    slike:string[];
    id: number; // The userId associated with the recipe
  }