import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, timeout } from 'rxjs';
import { getIdentity } from 'src/app/models/LocalStorage/token';
import { SearchDTO } from 'src/app/models/articles-lists/search';
import { EditArticle } from 'src/app/models/profile/edit.article';
import { PostView } from 'src/app/models/profile/view.post';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
  
  
export class UserPostsComponent implements OnInit, OnDestroy{
  
  public posts: PostView[] = [];
  public empty: boolean = true; 
  private connections: Subscription[] = [];
  public isloading: boolean = true;
  public postForm!: FormGroup;
  private f!: File;
  
  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
  ) {

    this.postForm = this.formBuilder.group({
      avatar: [null, Validators.required]
    })
  }
  
  public onFileChange(event: Event) {
    let fileList = (event.target as HTMLInputElement).files;
    if (fileList) {
      let file = fileList[0];
      this.f = file;
      // console.log("file ", file);
      this.postForm.patchValue({
        avatar: file
      });
    }
    this.postForm.get('avatar')?.updateValueAndValidity();
  }


  public submitPostForm(data: any, _id: string) {

    this.profileService.addPhoto(this.f, _id).subscribe(
      res => {
        window.alert('Successfully uploaded!');
        setTimeout(() => { 
          this.ngOnInit();
        }, 2500);
        
      },
      err => console.log("greska", err)
    )
  }

  public get file() {
    return this.postForm.get('file');
  }

   ngOnDestroy(): void {
    this.connections.forEach(sub => sub.unsubscribe());
   }
  
  ngOnInit() {
    let id = getIdentity('user');
    this.isloading = true;
    if (id) {
      let sub = this.profileService.SeePostByUserId(id).subscribe(res => {
        this.posts = res;
        this.isloading = false;

        if (this.posts.length)
          this.empty = false;
        else
          this.empty = true;
      });
      this.connections.push(sub);
    }
    
    
  }
  
  public ChangeVisibility(_id: string) {

    this.posts.filter((naslov: PostView, index) => {
      if (naslov._id === _id) {
        naslov.status = naslov.status === 'visible' ? 'hidden' : 'visible';
        console.log("doso", naslov)
        let data: EditArticle = {
          article_id : naslov._id,
          description : naslov.description,
          excerpt : naslov.excerpt,
          title : naslov.title,
          status : naslov.status,
        }

        let sub = this.profileService.changeAnArticle(data).subscribe(res=>{}, err=> console.log("Doslo je problema u promjeni vidljivosti"));
        this.connections.push(sub);
      }
    });
  }

  public dodajPocetnu(slika: string): string {
    return "http://localhost:3000/assets/photos/thumb/" + slika;
  }
  
}
