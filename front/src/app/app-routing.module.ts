import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppointmentFormComponent} from './appointment/appointment-form/appointment-form.component';
import {AppointmentComponent} from './appointment/appointment.component';


const routes: Routes = [
  {
    path: 'appointment-form',
    component: AppointmentFormComponent,
  },
  {
    path: 'appointments',
    component: AppointmentComponent,
  },
  {
    path: '',
    redirectTo: '/appointment-form',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
