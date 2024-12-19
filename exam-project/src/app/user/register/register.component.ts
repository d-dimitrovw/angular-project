import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user-service.service';
import { matchPasswordsValidator } from '../match-passwords.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required]),
    tel: new FormControl(''),
    passGroup: new FormGroup(
      {
        password: new FormControl('', [Validators.required, Validators.minLength(5)]),
        rePassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')]
      }
    ),

  })
  constructor(private userService: UserService, private router: Router, private fb: FormBuilder){}
  

  register() {
    if (this.form.invalid) {
      console.log('Invalid form');
      
      return;
    }

    const {username, email, tel, passGroup: {password, rePassword} = {}} = this.form.value;

    this.userService
    .register(username!, email!, tel!, password!, rePassword!)
    .subscribe(() => {
      this.router.navigate(['/home'])
    });

  }
}
