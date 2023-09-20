import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable, finalize } from 'rxjs';
import { ReceptService } from 'src/app/services/recept.service';
import { vratiRecepteZaUsera,kreirajRecept, izbrisiRecept } from 'src/app/store/actions/recept.actions';
import { updateUser, vratiUsera } from 'src/app/store/actions/user.actions';
import { selectorReceptiZaUsera } from 'src/app/store/selectors/recept.selectors';
import { selectorErrorSingleUser, selectorLoadingSingleUser, selectorUser } from 'src/app/store/selectors/user.selectors';
import { Recept, ReceptAdd } from 'src/app/store/types/recept';
import { ReceptStateInterface, ReceptiUserStateInterface } from 'src/app/store/types/recept.interface';
import { User } from 'src/app/store/types/user';
import { UserSingleInterface } from 'src/app/store/types/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  id:number=0;
  user$: Observable<User|null>;
  isLoading$: Observable<boolean>;
  error$:Observable<string | null>;
  isOpen:boolean=false;
  isOpen2:boolean=false;
  imeRecept:string='';
  opisRecept:string='';
  recepti$:Observable<Recept[]>
  downloadURLs:string[]=[];
  downloadURL:string='';
  file:File | null=null;
  form:FormGroup;
  token:string|null='';
  files:File[]=[];
  dodajForm = this.fb.group({
    imeRecept: new FormControl('', Validators.required),
    opis: new FormControl('', Validators.required),
    companyName: new FormControl('', [Validators.required]),
    sastojci: this.fb.array([]),
    priprema: ['', Validators.required],
    slike: this.fb.array([]),
  })
  sastojciForm = this.fb.group({
    imesastojka: new FormControl('', [Validators.required]),
  });
  slikeForm = this.fb.group({
    inputslika:new FormControl(null,Validators.required)
  });
  constructor(private storage: AngularFireStorage,private receptService:ReceptService,private store: Store<ReceptiUserStateInterface>,private store2: Store<UserSingleInterface>,private fb: FormBuilder,private cookieService: CookieService){
    this.recepti$=this.store.select(selectorReceptiZaUsera)
    this.user$=this.store2.select(selectorUser)
    this.isLoading$=this.store2.select(selectorLoadingSingleUser);
    this.error$=this.store2.select(selectorErrorSingleUser);
   
    this.form = new FormGroup({
      ime: new FormControl('', Validators.required),
      prezime: new FormControl('', Validators.required),
      username:new FormControl('', Validators.required),
      slika:new FormControl(null,Validators.required)
    });
  }
  ngOnInit(): void {
    
    const userLocal = localStorage.getItem('loggedUser');
    
    if (userLocal) {
      const userdata = JSON.parse(userLocal);
      this.id=userdata.id;
      this.store.dispatch(vratiUsera({id:this.id}));
      this.store.dispatch(vratiRecepteZaUsera({id:userdata.id}))
    }
    
    
  }

  toggleForm() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.dodajForm.reset();
    }
  }
  toggleForm2() {
    this.isOpen2 = !this.isOpen2;
    if (!this.isOpen2) {
      this.form.reset();
    }
  }
  async dodaj() {
  const uploadPromises: any[] = [];
  let completedUploads = 0;

  this.files.forEach((file) => {
    const filePath = `profile_pictures/${Date.now()}_${file?.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    const uploadPromise = uploadTask.snapshotChanges()
      .pipe(
        finalize(async () => {
          this.downloadURLs.push(await fileRef.getDownloadURL().toPromise());
          completedUploads++;

          if (completedUploads === this.files.length) {
             const sastojciControls = this.sastojci.controls;
            const sastojciValues = sastojciControls.map(control => control.value);
            let nizSastojaka: string[]=[]
            sastojciValues.forEach(sastojak => {
              nizSastojaka.push(sastojak.imesastojka)
            });
            const recept=new ReceptAdd(this.id,this.dodajForm.value.imeRecept!!,this.dodajForm.value.opis!!,this.dodajForm.value.priprema!!,nizSastojaka,this.downloadURLs);
            this.store.dispatch(kreirajRecept({recept}));
            this.toggleForm();
          }
        })
      )
      .toPromise();

    uploadPromises.push(uploadPromise);
  });

  try {
    await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error uploading files:", error);
  }
}


  log() {
    console.log(this.dodajForm.value.imeRecept);
  }
  get sastojci() {
    return this.dodajForm.controls["sastojci"] as FormArray;
  }

  addSastojci() {
    const ad = this.fb.group({
      imesastojka: new FormControl('', [Validators.required]),
      });
      this.sastojci.push(ad);
  }
  removeSastojci(index: number) {
    const sastojciArray = this.dodajForm.get('sastojci') as FormArray;
    sastojciArray.removeAt(index);
  }

  get slike() {
    return this.dodajForm.controls["slike"] as FormArray;
  }

  addSlike() {
    const ad = this.fb.group({
      inputslika: new FormControl(null, [Validators.required]),
      });
      this.slike.push(ad);
  }
  removeSlike(index: number) {
    const slikeArray = this.dodajForm.get('slike') as FormArray;
    slikeArray.removeAt(index);
    this.files.splice(index,1);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.files?.push(file);
  }
  izbrisi(id:number|undefined){
    if(id!=undefined){
      this.store.dispatch(izbrisiRecept({id}));
    }
  }
  updateProfile(){
    if (this.form.valid) {
      const{slika,...bezslike}=this.form.value;
      const filePath = `profile_pictures/${Date.now()}_${this.file?.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.file);

      uploadTask.snapshotChanges().pipe(
        finalize(async () => {
          this.downloadURL = await fileRef.getDownloadURL().toPromise();
          const payloadUpdate={
            id:this.id,
            ...bezslike,
            slika:this.downloadURL
          }
          this.store2.dispatch(updateUser({user:payloadUpdate}))
          this.toggleForm2(); 
        })
      ).subscribe();
    }
  }
  onFileChange2(event: any) {
    const file = event.target.files[0];
    this.file=file;
  }
//   const sastojciControls = this.sastojci.controls;
//     const sastojciValues = sastojciControls.map(control => control.value);
//     console.log(sastojciValues);
// 
}
