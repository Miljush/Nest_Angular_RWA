

  export interface UserInt{
    username?: string;
    ime?: string;
    prezime?: string;
    email?: string;
    sifra?: string;
    slika?: string;
}
export class User implements UserInt {
    ime?: string;
    prezime?: string;
    username?: string;
    email?: string;
    password?: string;
    slika?: string;
  
    constructor(
      ime?: string,
      prezime?: string,
      username?: string,
      email?: string,
      password?: string,
      slika?: string
    ) {
      this.ime = ime;
      this.prezime = prezime;
      this.username = username;
      this.email = email;
      this.password = password;
      this.slika = slika;
    }
  }