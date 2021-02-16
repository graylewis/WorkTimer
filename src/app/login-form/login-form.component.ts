import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  formGroup: FormGroup;
  loggedIn: boolean = false;

  constructor(private authService:AuthServiceService, private router:Router,) { }

  ngOnInit(): void {
    this.initForm()
    this.loggedIn = this.authService.isLoggedIn();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    })
  }
  loginProcess() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(result => {
        console.log(`RESULT: ${result}`)
        if(result) {
          localStorage.setItem('token', result)
          this.router.navigate(['timer'])
        } else {
          console.log(result);
        }
      })
    }
  }
}
