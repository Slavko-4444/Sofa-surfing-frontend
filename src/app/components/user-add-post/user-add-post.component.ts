import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-user-add-post',
  templateUrl: './user-add-post.component.html',
  styleUrls: ['./user-add-post.component.css']
})
export class UserAddPostComponent {

  public postForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) { 
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      excerpt: ['', Validators.required],
      description: ['', Validators.required],
      status: ['visible', Validators.required],
      })
  }


  public get title() {
    return this.postForm.get('title');
  }
  public get excerpt() {
    return this.postForm.get('excerpt');
  }
  public get description() {
    return this.postForm.get('description');
  }
  public get status() {
    return this.postForm.get('status');
  }

  public submitPostForm(data: any) {
    console.log("sakupljeno",data);
  }
}
