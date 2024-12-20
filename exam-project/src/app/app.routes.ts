import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { TopicsListComponent } from './topics/topics-list/topics-list.component';
import { TopicDetailsComponent } from './topics/topic-details/topic-details.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddTopicComponent } from './topics/add-topic/add-topic.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AboutComponent } from './about/about.component';
import { ReverseAuthGuard } from './guards/reverse-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'topics',
    children: [
      { path: '', component: TopicsListComponent },
      {
        path: ':themeId',
        component: TopicDetailsComponent,
      },
    ],
  },
  { path: 'add-topic', component: AddTopicComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },

  { path: '**', component: ErrorPageComponent },
];
