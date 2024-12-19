import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user-service.service';

@Component({
  selector: 'app-check-auth',
  standalone: true,
  imports: [],
  templateUrl: './check-auth.component.html',
  styleUrl: './check-auth.component.css'
})
export class CheckAuthComponent implements OnInit{
  isAuthenticating = true;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: ()=>{
        this.isAuthenticating = false
      },
      error: () => {
        this.isAuthenticating = false
      },
      complete: () => {
        this.isAuthenticating = false
      },
    })
  }
}
