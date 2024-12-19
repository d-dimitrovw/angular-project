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
  //user$: Observable<AuthUser | null>;

  constructor(public userService: UserService, private router: Router) {
    //this.user$ = this.userService.user$;
  }
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }


  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}