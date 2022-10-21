import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayload } from '../comment/comment-payload';
import { CreatePostPayload } from '../post/create-post/create-post.payload';
import { PostModel } from './post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/posts/');
  }
  createPost(postPayload:CreatePostPayload): Observable<any> {
    return this.http.post("http://localhost:8080/api/posts/", postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>("http://localhost:8080/api/posts/" + id);
  }

  postComment(comment: CommentPayload): Observable<any> {
    return this.http.post("http://localhost:8080/api/comment/", comment);
  }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.http.get<CommentPayload[]>("http://localhost:8080/api/comment/post/" + postId);
  }
}
