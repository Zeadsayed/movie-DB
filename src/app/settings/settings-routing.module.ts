import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  {path:'',component:ProfileComponent},
  {path:'profile',component:ProfileComponent},
  {path:'roles',component:RolesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
