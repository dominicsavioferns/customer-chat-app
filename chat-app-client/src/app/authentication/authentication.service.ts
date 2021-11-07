import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Credentials } from './interfaces/credentials.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  /**
   * contains user name of the user that is currently signed in
   * the value is set on login
   */
  public username!: string | null;

  /**
   * @description method for user login using credentials
   * @param {Credentials} credentials
   * @returns {Observable} - mock observable
   */
  public login(credentials: Credentials): Observable<boolean> {
    this.username = credentials.username;
    return of(true);
  }

  /**
   * @description logs out user and sets username to empty string
   * @returns {Observable} - mock Observable
   */
  public logout(): Observable<boolean> {
    this.username = null;
    return of(true);
  }
}
