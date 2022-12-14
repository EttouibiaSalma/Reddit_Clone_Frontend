import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayload } from './comment-payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>('http://localhost:8080/api/comment/post/' + postId);
  }

  getAllCommentsForUser(name: String) {
    return this.httpClient.get<CommentPayload[]>('http://localhost:8080/api/comment/user/' + name);
  }
}
