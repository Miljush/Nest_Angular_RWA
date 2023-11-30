

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

  export interface KomentarInt{
    starRating?: number;
    komentar?: string;
    userId?: number;
    receptId?: number;
}
export class KomentarAdd implements KomentarInt {
    userId?: number;
    starRating?: number;
    komentar?: string;
    receptId?:number;
    constructor(
      userId?: number,
        starRating?: number,
        komentar?: string,
        receptId?:number
  
    ) {
      this.userId = userId;
      this.starRating = starRating;
      this.komentar = komentar;
      this.receptId = receptId;
    }
  }