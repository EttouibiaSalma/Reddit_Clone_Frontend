import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentPayload } from 'src/app/comment/comment-payload';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  comment: CommentPayload;
  comments: CommentPayload[];

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute) {
    this.postId = this.activatedRoute.snapshot.params['id'];
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError('Error occured while retrieving post info');
    });
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.comment = {
      postId: this.postId,
      text:''
    }
   }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }

  getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError('error occured while getting post info');
    })
  }

  postComment() {
    this.comment.text = this.commentForm.get('text')?.value;
    this.postService.postComment(this.comment).subscribe(data => {
      this.commentForm.get('text')?.setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError('error occured while posting comment');
    })
  }
  getCommentsForPost() {
    this.postService.getAllCommentsForPost(this.comment.postId);
  }

}
