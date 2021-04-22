import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:User; // Login information
  public warning:string;

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
    this.user = new User();
  }

  validate(f: NgForm) {
    // Check for empty string
    if (f.value.userName != this.user.userName ||f.value.password != this.user.password) {
      this.warning = "Username or Password is incorrect";
      return false;
    }
    // Check for alphanumeric
    else if (!(/^[A-Za-z0-9]+$/.test(f.value.userNamef)) || !(/^[A-Za-z0-9]+$/.test(f.value.password))) {
      this.warning = "Username and Password must contain numbers and letters only";
      return false;
    }
    else
      return true;
  }

  onSubmit(f: NgForm): void {
    if (this.validate(f)) {
    this.auth.login(this.user).subscribe(
      (success) => {
        // store the returned token in local storage as 'access_token'
        localStorage.setItem('access_token',success.token);
        // redirect to the "contact us" route
        this.router.navigate(['contactus']);
      },
      (err) => {
        this.warning = err.error.message;
      }
    );
    }
  };
}