import { Component, ElementRef, NgIterable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArrayArticle } from 'src/app/models/articles-lists/article.array';
import { ArticleRange } from 'src/app/models/articles-lists/artilce.range';
import { PostView } from 'src/app/models/profile/view.post';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-list-of-articles',
  templateUrl: './list-of-articles.component.html',
  styleUrls: ['./list-of-articles.component.css']
})

export class ListOfArticlesComponent implements OnInit, OnDestroy{

  public isloading: boolean = true;
  public posts: PostView[] = [];
  private connections: Subscription[] = [];
  public duzina!: number[];
  public position: number = 1;

  constructor(private profileService: ProfileService, private router: Router, private elementRef: ElementRef, private activatedRoute: ActivatedRoute)
  { }


  
  public pozovi(element: number): boolean {
    if (this.position === element)
      return true;
    return false;
  }
  navigacijaNaTrenutni(): void {
    // Dohvati trenutni fragment iz URL-a
    const trenutniFragment = this.router.parseUrl(this.router.url).fragment;

    if (trenutniFragment) {
      // Pronađi element na osnovu ID-a fragmenta
      const element = this.elementRef.nativeElement.querySelector(`#${trenutniFragment}`);

      if (element) {
        // Pomeri se na željeni deo stranice
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  public positionPrevious() {
    this.position = this.position - 1;
    if (this.position < 1 )
      this.position = 1;
    
    let data: ArticleRange = {
      skip: (this.position - 1) * 8,
      limit: 8
    }
    let sub = this.profileService.SeeVisiblePosts(data).subscribe(res => {
      this.posts = res;
      this.navigacijaNaTrenutniDeo('top');

    });  
    this.connections.push(sub);

    return this.position;
  }

  public currentPosition(e: number) {
    if (e != this.position) {
      this.position = e;
      let data: ArticleRange = {
        skip: (this.position - 1) * 8,
        limit: 8
      }
      let sub = this.profileService.SeeVisiblePosts(data).subscribe(res => {
        this.posts = res;
        this.navigacijaNaTrenutniDeo('top');
        
      });  
      this.connections.push(sub);  
    }
    
    return this.position;
  }

  public positionNext() {
    this.position = this.position + 1;
    if (this.position > this.duzina.length)
      this.position = this.duzina.length;
    
    let data: ArticleRange = {
      skip: (this.position - 1) * 8,
      limit: 8
    }
    let sub = this.profileService.SeeVisiblePosts(data).subscribe(res => {
      this.posts = res;
      this.navigacijaNaTrenutniDeo('top');
    });
    this.connections.push(sub);
    return this.position;
  }

  ngOnInit(): void {
    

    let sub1 = this.profileService.takeLengthOfArticles().subscribe(
      (res: number) => {
        this.duzina = Array.from({ length: Math.ceil(res/8)}, (element, index) => index + 1);
      },
      err => console.error(err)
    );
    
    
    let s = this.router.events.subscribe(() => {
      this.navigacijaNaTrenutni();
    });
    
    this.connections.push(s);

    let data: ArticleRange = {
      limit: 10,
      skip: 0
    }

    let sub = this.profileService.SeeVisiblePosts(data).subscribe(
      res => {
        this.posts = res
        this.isloading = false;
      },
      err => console.log("Error loading posts from DATABASE")
    );

    this.connections.push(sub);
  }

  ngOnDestroy(): void {
    this.connections.forEach(sub => sub.unsubscribe());
   } 

    public dodajPocetnu(slika: string): string {
    return "http://localhost:3000/assets/photos/thumb/" + slika;
    }
  
  navigacijaNaTrenutniDeo(fragment: string): void {
    this.router.navigate([], {
      fragment: fragment,
      queryParamsHandling: 'preserve', // Opciono, zadržava postojeće query parametre
      relativeTo: this.activatedRoute
    })
  }
}
