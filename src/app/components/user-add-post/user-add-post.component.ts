import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getIdentity } from 'src/app/models/LocalStorage/token';
import { AddArticle } from 'src/app/models/profile/add.article';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-user-add-post',
  templateUrl: './user-add-post.component.html',
  styleUrls: ['./user-add-post.component.css']
})
export class UserAddPostComponent {

  public postForm!: FormGroup;
  public isAdded:boolean = false;
  @Input('Email')
  public emailUser!: string;
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
    let newPost: AddArticle = {
      description: data.description,
      excerpt: data.excerpt,
      title: data.title,
      status: data.status,
      user_id: String(getIdentity("user")),
      userEmail: this.emailUser
    };

    this.isAdded = true;
    this.profileService.addAnArticle(newPost).subscribe(res=> console.log('res', res));

    setTimeout(() => {
      this.postForm.patchValue({
        description: '',
        title: '',
        status: '',
        excerpt: '',
      })

      this.isAdded = false;
    }, 3000)
  }
}
