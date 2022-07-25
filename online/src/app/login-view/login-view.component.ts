import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Credentials } from '../credentials';
import { AppState } from '../store/state/app.state';
import { Store } from '@ngrx/store';
import { login } from '../store/actions/auth.actions';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  credentials: Credentials | undefined;

  loginForm: FormGroup | undefined;
  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>) { }

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
    this.store.dispatch(login({ credentials }));
  }

}
