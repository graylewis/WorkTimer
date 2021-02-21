import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './../auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
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
      confirm: new FormControl('',[Validators.required]),
      first: new FormControl('',[Validators.required]),
      last: new FormControl('',[Validators.required]),
    })
  }
  registerProcess() {
    if (this.formGroup.valid) {
      this.authService.register(this.formGroup.value).subscribe(result => {
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
