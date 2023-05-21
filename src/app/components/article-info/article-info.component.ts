import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostInfo } from 'src/app/models/articles-lists/postInfo';
import { UserInfo } from 'src/app/models/profile/user.info';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-article-info',
  templateUrl: './article-info.component.html',
  styleUrls: ['./article-info.component.css']
})
  
export class ArticleInfoComponent {
  private paramMapSub!: Subscription;
  public post!: PostInfo;
  public uInfo!: UserInfo;
  constructor(
    private route: ActivatedRoute,
    private sService: SearchService,
    private pService: ProfileService
  )
  {
    
    this.paramMapSub = this.route.paramMap.subscribe(params => {
      const pId: string = String(params.get('articleId'));
      this.sService.findArticle(pId).subscribe(
        res => {
          this.post = res;
          this.pService.getUInfo(this.post.user_id).subscribe(res => this.uInfo = res) 
        },
        err => console.log("Problem ucitavanja")
      );
      })
  }

  public dodajPocetnu(slika: string): string {
    return "http://localhost:3000/assets/photos/small/" + slika;
    }

}
