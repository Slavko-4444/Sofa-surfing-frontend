import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { getToken } from 'src/app/models/LocalStorage/token';
import { SearchDTO } from 'src/app/models/articles-lists/search';
import { PostView } from 'src/app/models/profile/view.post';

@Injectable({
  providedIn: 'root'
})
  
export class SearchService {


  private url = "http://localhost:3000/";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }


  public findArticle(id: string): Observable<PostView> {
    
    this.headers = this.headers.set('Authorization', getToken('user'));
    const options = { headers: this.headers };

    return this.http.get<PostView>(this.url + 'api/article/findArticle/' + id, options);
  }

  public SearchPosts(data: SearchDTO): Observable<PostView[]> {

    
    this.headers = this.headers.set('Authorization', getToken('user'));
    const options = { headers: this.headers };

    return this.http.post<PostView[]>(this.url + "api/article/search", data, options);
  }

}
