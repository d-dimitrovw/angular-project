import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import { Router } from '@angular/router';
import { ProfileDetails } from '../../types/user';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  editMode: boolean = false;
  profileDetails: ProfileDetails = {
    username: '',
    email: '',
    tel: '',
  };

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    const { username, email, tel } = this.userService.user!;
    this.profileDetails = {username, email, tel: tel!};
    //this.form.setValue({username, email, tel: tel!})
    this.form.patchValue(this.profileDetails);

  }

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [
      Validators.required,
    ]),
    tel: new FormControl(''),
  });

  editProfile() {
    this.editMode = true;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.profileDetails = this.form.value as ProfileDetails;
    const {username, email, tel} = this.profileDetails;
    this.userService.updateProfile(username, email, tel).subscribe(() => {
      this.hideEditMode();

    })
  }
  hideEditMode() {
    this.editMode = !this.editMode;
  }

  cancelEdit() {
    this.editMode = false;
  }
}
