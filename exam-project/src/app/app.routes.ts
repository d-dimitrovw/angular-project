import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { TopicsListComponent } from './topics/topics-list/topics-list.component';
import { TopicDetailsComponent } from './topics/topic-details/topic-details.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
//   { path: 'topics', component: TopicsListComponent},
//   { path: 'topics/:id', component: TopicDetailsComponent, canActivate: [AuthGuard] }
{
    path: 'topics',
    children: [
      { path: '', component: TopicsListComponent },
      {
        path: ':themeId',
        component: TopicDetailsComponent
      },
    ],
  }

];
