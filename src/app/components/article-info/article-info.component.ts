import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostView } from 'src/app/models/profile/view.post';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-article-info',
  templateUrl: './article-info.component.html',
  styleUrls: ['./article-info.component.css']
})
  
export class ArticleInfoComponent {
  private paramMapSub!: Subscription;
  public post!: PostView;

  constructor(
    private route: ActivatedRoute,
    private sService: SearchService
  )
  {
    
    this.paramMapSub = this.route.paramMap.subscribe(params => {
      const pId: string = String(params.get('articleId'));
      this.sService.findArticle(pId).subscribe(
        res => this.post = res,
        err => console.log("Problem ucitavanja")
      );
      })
  }

  public dodajPocetnu(slika: string): string {
    return "http://localhost:3000/assets/photos/small/" + slika;
    }

}
