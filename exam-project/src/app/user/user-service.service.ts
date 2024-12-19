import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { AuthUser } from '../types/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy{
  private user$$ = new BehaviorSubject<AuthUser | null>(null)
  private user$ = this.user$$.asObservable();

  API_URL = 'http://localhost:3000/api'

  USER_KEY = '[user]';
  user: AuthUser | null = null;
  userSubscription: Subscription | null = null

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user
    })
  }

  login(email: string, password: string) {

    return this.http
    .post<AuthUser>(`${this.API_URL}/login`, { email, password }, { withCredentials: true })
    .pipe(tap((user) => this.user$$.next(user)));

  }

  register(username: string, email: string, tel: string, password: string, rePassword: string) {

    return this.http
    .post<AuthUser>(`${this.API_URL}/register`, { username, email, tel, password, rePassword}, { withCredentials: true })
    .pipe(tap((user) => this.user$$.next(user)));

  }

  logout() {
    return this.http.post(`${this.API_URL}/logout`, {}, { withCredentials: true })
    .pipe(tap((user) => this.user$$.next(null)));

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

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
