import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { AuthUser } from '../types/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService{
  private user$$ = new BehaviorSubject<AuthUser | null>(null)
  private user$ = this.user$$.asObservable();

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
    .post<AuthUser>('/api/login', { email, password })
    .pipe(tap((user) => this.user$$.next(user)));

  }

  register(username: string, email: string, tel: string, password: string, rePassword: string) {

    return this.http
    .post<AuthUser>('/api/register', { username, email, tel, password, rePassword})
    .pipe(tap((user) => this.user$$.next(user)));

  }

  logout() {
    return this.http.post('/api/logout', {})
    .pipe(tap((user) => this.user$$.next(null)));

  }

  getProfile() {
    return this.http
    .get<AuthUser>('/api/users/profile')
    .pipe(tap((user) => this.user$$.next(user)));

  }

  updateProfile(username: string, email: string, tel: string) {
    return this.http
    .put<AuthUser>(`/api/users/profile`, {username, email, tel})
    .pipe(tap((user) => this.user$$.next(user)));

  }

  // ngOnDestroy(): void {
  //   this.userSubscription?.unsubscribe();
  // }
}
