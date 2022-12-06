import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { RolesComponent } from './roles/roles.component';


@NgModule({
  declarations: [
    ProfileComponent,
    RolesComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
