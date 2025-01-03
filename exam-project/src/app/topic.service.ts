import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from './types/comment';
import { Topic } from './types/topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService { constructor(private http: HttpClient) { }
getComments() {
  let url = `/api/posts`;
  return this.http.get<Comment[]>(url); 
  
}

getTopics() {
  return this.http.get<Topic[]>(`/api/themes`);
}

getSingleTopic(id: string) {
  return this.http.get<Topic>(`/api/themes/${id}`)
}

createTopic(themeName: string, postText: string) {
  const payload = {themeName, postText}
  return this.http.post<Topic>(`/api/themes`, payload);
}

addTopicComment(id: string, postText: string) {
  const payload = {postText}
  return this.http.post<Comment>(`/api/themes/${id}`, payload);
}

deleteComment(topicId: string, commentId: string) {
  return this.http.delete(`/api/themes/${topicId}/posts/${commentId}`);
}
}