import { Component } from '@angular/core';
import { Topic } from '../../types/topic';
import { ActivatedRoute } from '@angular/router';
import { TopicService } from '../../topic.service';
import { UserService } from '../../user/user-service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-topic-details',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './topic-details.component.html',
  styleUrl: './topic-details.component.css'
})
export class TopicDetailsComponent {
  topic = {} as Topic;
  constructor(private route: ActivatedRoute, private topicService: TopicService, private userService: UserService) {}

  get isLoggedIn():boolean {
    return this.userService.isLogged;
  }

  submit(form: NgForm) {
    if (form.invalid) {
      return;
    } 
    const id = this.route.snapshot.params['themeId'];

    this.topicService.addTopicComment(id, form.value.comment).subscribe(() => {
      form.reset();
      this.topicService.getSingleTopic(id).subscribe((topic) => {
        this.topic = topic;
      });
    });
  }

  // get username():string {
  //   return this.userService.user?.username || '';
  // }
  ngOnInit(): void {

    const id = this.route.snapshot.params['themeId'];
    

    this.topicService.getSingleTopic(id).subscribe((topic) => {
      this.topic = topic;
      
    });
  }
}
