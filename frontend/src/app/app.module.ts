import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HeaderComponent } from './components/header/header.component';
import { environment } from './environments/environment';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { ProfileComponent } from './components/profile/profile.component';
import { SviReceptiComponent } from './components/svi-recepti/svi-recepti.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, userSingleReducers } from './store/reducers/user.reducers';
import { UserEffects } from './store/effects/user.effects';
import { ReceptDetaljnoComponent } from './components/recept-detaljno/recept-detaljno.component';
import { SwiperComponent } from './components/swiper/swiper.component';
import { receptReducers, receptSingleReducers, recptiZaUseraReducers } from './store/reducers/recept.reducers';
import { ReceptEffects } from './store/effects/recept.effects';
import { reviewReducers } from './store/reducers/review.reducers';
import { ReviewEffects } from './store/effects/review.effects';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ProfileComponent,
    SviReceptiComponent,
    ReceptDetaljnoComponent,
    SwiperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FlexLayoutModule,
    StoreModule.forRoot({user:reducers,recept:receptReducers,Singlerecept:receptSingleReducers,review:reviewReducers,receptZaUsera:recptiZaUseraReducers,usersingle:userSingleReducers}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([UserEffects,ReceptEffects,ReviewEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
