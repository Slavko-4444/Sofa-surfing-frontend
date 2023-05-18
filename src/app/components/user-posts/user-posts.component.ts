import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { getIdentity } from 'src/app/models/LocalStorage/token';
import { EditArticle } from 'src/app/models/profile/edit.article';
import { PostView } from 'src/app/models/profile/view.post';
import { ProfileService } from 'src/app/services/profile/profile.service';

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

  constructor(private profileService: ProfileService) {

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
