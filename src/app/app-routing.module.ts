import { ViewEntriesComponent } from './view-entries/view-entries.component';
import { TimerPageComponent } from './timer-page/timer-page.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LandingComponent } from './landing/landing.component';
import { LoggedInGuardGuard } from './logged-in-guard.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component'

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'timer', component: TimerPageComponent, canActivate: [LoggedInGuardGuard]},
  { path: 'workbook', component: ViewEntriesComponent, canActivate: [LoggedInGuardGuard] },
  { path: '', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
