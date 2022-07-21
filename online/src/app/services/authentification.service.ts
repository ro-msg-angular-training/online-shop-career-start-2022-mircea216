import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Credentials } from '../credentials';
import { Role, User } from '../user';
import { url } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  loggedUser: User | undefined;
  redirectUrl: string | undefined;

  constructor(private http: HttpClient) { }

  login(credentials: Credentials): Observable<User> {
    return this.http.post<User>(`${url}/login`, credentials).pipe(tap((user) => {
      this.loggedUser = user;
      localStorage.setItem("username", user.username);
      localStorage.setItem("logged", this.loggedIn().toString());
    }));
  }

  loggedIn(): boolean {
    return this.loggedUser !== undefined;
  }

  hasRoleType(role: string) {
    if (this.loggedUser?.roles.includes(<Role>role))
      return true;
    return false;
  }
}
