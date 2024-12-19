import { Component } from '@angular/core';
import { Topic } from '../../types/topic';
import { TopicService } from '../../topic.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topics-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './topics-list.component.html',
  styleUrl: './topics-list.component.css'
})
export class TopicsListComponent {
  topics: Topic[] = [];

  isLoading = true;

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    this.topicService.getTopics().subscribe((topics) => {
      this.topics = topics;
        this.isLoading = false

    })
  }
}
