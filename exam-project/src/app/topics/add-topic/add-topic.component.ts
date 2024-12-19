import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TopicService } from '../../topic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-topic',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-topic.component.html',
  styleUrl: './add-topic.component.css'
})
export class AddTopicComponent {
  constructor(private topicService: TopicService, private router: Router) {}	
  submitTopic(form: NgForm){
    if (form.invalid) {
      return;
    }
    const {title, text} = form.value;
    this.topicService.createTopic(title, text).subscribe(() => {
      this.router.navigate(['/topics'])});
    }
  }
