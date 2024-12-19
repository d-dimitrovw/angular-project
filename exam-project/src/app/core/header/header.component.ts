import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../user/user-service.service';
import { AuthUser } from '../../types/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterLink, CommonModule]
})
export class HeaderComponent {
  user$: Observable<AuthUser | null>;

  get isLoggedIn() {
    return this.userService.isLogged;
  }
  constructor(public userService: UserService, private router: Router) {
    this.user$ = this.userService.user$;
  }


  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}