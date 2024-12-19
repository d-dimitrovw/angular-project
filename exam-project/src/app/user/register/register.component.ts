import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router){}
  register(form: NgForm) {
    if (form.invalid) {
      console.log('Invalid form');
      
      return;
    }

    const {username, email, tel, password, rePassword} = form.value;

    this.userService
    .register(username, email, tel, password, rePassword)
    .subscribe(() => {
      this.router.navigate(['/home'])
    });

  }
}
