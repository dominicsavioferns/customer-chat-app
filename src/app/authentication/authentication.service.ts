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
	 * List of allowed user credentials
	 */
	private allowedCredentials: Credentials[];

	/**
	 * key store store username in localstorage
	 */
	private readonly localStorageKey = 'ottonova-chat-username';

	constructor() {
		this.allowedCredentials = [
			{
				username: 'dominic',
				password: 'savio',
			},
			{
				username: 'john',
				password: 'doe'
			},
			{
				username: 'foo',
				password: 'bar'
			}
		];

		this.username = localStorage.getItem(this.localStorageKey) ? localStorage.getItem(this.localStorageKey) : null;
	}

	/**
	 * @description method for user login using credentials
	 * @param {Credentials} credentials
	 * @returns {Observable} - mock observable
	 */
	public login(credentials: Credentials): Observable<boolean> {
		let credential = this.allowedCredentials.find(
			credential => credential.username == credential.username && credential.password == credentials.password
		);

		if (!credential) {
			return of(false);
		}

		this.username = credential.username;
		localStorage.setItem(this.localStorageKey, this.username);

		return of(true);
	}

	/**
	 * @description logs out user and sets username to empty string
	 * @returns {Observable} - mock Observable
	 */
	public logout(): Observable<boolean> {
		this.username = null;
		localStorage.removeItem(this.localStorageKey);
		return of(true);
	}
}
