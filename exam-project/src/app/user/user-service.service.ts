import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { AuthUser } from '../types/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService{
  private user$$ = new BehaviorSubject<AuthUser | null>(null)
  public user$ = this.user$$.asObservable();

  API_URL = 'http://localhost:3000/api'

  USER_KEY = '[user]';
  user: AuthUser | null = this.getUserFromLocalStorage();
  // userSubscription: Subscription | null = null
  
  constructor(private http: HttpClient) {}

  get isLogged(): boolean {
    return !!this.user;
  }


  // login(email: string, password: string) {

  //   return this.http
  //   .post<AuthUser>(`${this.API_URL}/login`, { email, password }, { withCredentials: true })
  //   .pipe(tap((user) => this.user$$.next(user)));

  // }

  // register(username: string, email: string, tel: string, password: string, rePassword: string) {

  //   return this.http
  //   .post<AuthUser>(`${this.API_URL}/register`, { username, email, tel, password, rePassword}, { withCredentials: true })
  //   .pipe(tap((user) => this.user$$.next(user)));

  // }

  // logout() {
  //   return this.http.post(`${this.API_URL}/logout`, { withCredentials: true })
  //   .pipe(tap((user) => this.user$$.next(null)));

  // }
  login(email: string, password: string): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${this.API_URL}/login`, { email, password });
  }

  register(username: string, email: string, tel: string, password: string, rePassword: string): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${this.API_URL}/register`, { username, email, tel, password, rePassword });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/logout`, {});
  }
  setUser(user: AuthUser): void {
    this.user$$.next(user);
    this.saveUserToLocalStorage(user);
  }

  clearUser(): void {
    this.user$$.next(null);
    this.clearUserFromLocalStorage();
  }

  private saveUserToLocalStorage(user: AuthUser | null): void {
    if (user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.USER_KEY);
    }
  }

  private getUserFromLocalStorage(): AuthUser | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  private clearUserFromLocalStorage(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  getProfile() {
    return this.http
    .get<AuthUser>(`${this.API_URL}/users/profile`)
    .pipe(tap((user) => this.user$$.next(user)));

  }

  updateProfile(username: string, email: string, tel: string) {
    return this.http
    .put<AuthUser>(`${this.API_URL}/users/profile`, {username, email, tel})
    .pipe(tap((user) => this.user$$.next(user)));

  }

  // ngOnDestroy(): void {
  //   this.userSubscription?.unsubscribe();
  // }
}
