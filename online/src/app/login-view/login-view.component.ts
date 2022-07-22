import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { Credentials } from '../credentials';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  credentials: Credentials | undefined;

  loginForm: FormGroup | undefined;
  constructor(private formBuilder: FormBuilder, private authentificationService: AuthentificationService,
    private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  login() {
    const credentials = {
      username: this.loginForm?.value.username,
      password: this.loginForm?.value.password
    };
    this.authentificationService.login(credentials).subscribe(
      () => {
        this.route.navigateByUrl(`/products`);
      },
      () => {
        alert('The credentials you introduced do not exist');
      }
    );
  }

}
