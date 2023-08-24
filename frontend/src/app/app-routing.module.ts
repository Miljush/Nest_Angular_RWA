import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SviReceptiComponent } from './components/svi-recepti/svi-recepti.component';
import { ReceptDetaljnoComponent } from './components/recept-detaljno/recept-detaljno.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'admin',
    loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path:'sviRecepti',
    component:SviReceptiComponent
  },
  {
    path:'profile',component:ProfileComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  { path: 'recept/:id', component: ReceptDetaljnoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
