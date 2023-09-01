

export interface ReviewInt{
    id?: number;
    starRating?: number;
    komentar?: string;
    createdAt?: Date;
    user?: any;
}
export class Review implements ReviewInt {
    id?: number;
    starRating?: number;
    komentar?: string;
    createdAt?: Date;
    user?: any;
  
    constructor(
       id?: number,
        starRating?: number,
        komentar?: string,
        createdAt?: Date,
        user?: any
  
    ) {
      this.id = id;
      this.starRating = starRating;
      this.komentar = komentar;
      this.createdAt = createdAt;
      this.user = user;
    }
  }