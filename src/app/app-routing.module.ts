import { LandingComponent } from './landing/landing.component';
import { LoggedInGuardGuard } from './logged-in-guard.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component'
import { TimerComponent } from './timer/timer.component'

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'timer', component: TimerComponent, canActivate: [LoggedInGuardGuard]},
  { path: '', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
