import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form:FormGroup;
  file:File | null=null;
  uploadPercent: number = 0;
  downloadURL: string = '';

  constructor(private storage: AngularFireStorage,private userService:UserService,private router: Router) {
    
    this.form = new FormGroup({
      ime: new FormControl('', Validators.required),
      prezime: new FormControl('', Validators.required),
      username:new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      sifra: new FormControl('', Validators.required),
      slika:new FormControl(null,Validators.required)
    });
  }
  
  register() {
    if (this.form.valid) {
      const{slika,...bezslike}=this.form.value;
      const filePath = `profile_pictures/${Date.now()}_${this.file?.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.file);

      uploadTask.percentageChanges().subscribe(percent => {
        this.uploadPercent = percent || 0;
      });

      uploadTask.snapshotChanges().pipe(
        finalize(async () => {
          this.downloadURL = await fileRef.getDownloadURL().toPromise();
          const payloadRegister={
            ...bezslike,
            slika:this.downloadURL
          }
          const proveraa:boolean=await this.userService.kreirajUsera(payloadRegister);
          if(proveraa){
            this.router.navigate(['/login']);
          }else{
            alert("Doslo je do greske sa registrovanjem");
          }
          
        })
      ).subscribe();
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.file=file;
  }

}
