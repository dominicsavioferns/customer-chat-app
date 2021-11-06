import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Credentials } from './interfaces/credentials.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public username!: string;

  constructor() {}

  public login(credentials: Credentials): Observable<boolean> {
    this.username = credentials.username;
    return of(true);
  }
}
