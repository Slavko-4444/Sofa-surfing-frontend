import { Injectable} from '@angular/core';
import { LoginUserDTO } from 'src/app/models/receive/loginInfo.dto';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getRefreshToken, getToken, saveRefreshToken, saveToken } from 'src/app/models/LocalStorage/token';
import { ApiResponse } from 'src/app/models/api.respones';
import { TokenRef } from 'src/app/models/receive/reciving.token';
import { UserInfo } from 'src/app/models/profile/user.info';
import { RecivingRefToken } from 'src/app/models/receive/refresh.token';
import { PostView } from 'src/app/models/profile/view.post';
import { EditArticle } from 'src/app/models/profile/edit.article';
import { AddArticle } from 'src/app/models/profile/add.article';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url = "http://localhost:3000/";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public InfoProfile!: Observable<UserInfo>;
  public userInfo!: Observable<LoginUserDTO>;


  constructor(private http: HttpClient) { }
  
  
  public addPhoto(file: File, Id: string): Observable<PostView> {

    //this.headers = this.headers.set( 'Content-Type', 'multipart/form-data;' );
    // this.headers = this.headers.set('Authorization', getToken('user'));
    
    let h = new HttpHeaders({ 'Authorization': getToken('user') });
    // h = h.set('Content-Type', 'multipart/form-data;');
    
    const options = { headers: h };
    const formData = new FormData();

    formData.append('photo', file);
    
    formData.forEach((value, key) => {
      console.log("Kljucevi" , key, value);
    });

    return this.http.post<PostView>(this.url + 'api/article/' + Id + '/uploadPhoto', formData, options);    
  }

  public addAnArticle(data: AddArticle): Observable<PostView> {
    this.headers = this.headers.set('Authorization', getToken('user'));
    const options = { headers: this.headers };
    
    return this.http.post<PostView>(this.url + "api/article/newArticle", data, options);
  }

  public changeAnArticle(data: EditArticle): Observable<PostView> {
    
    this.headers = this.headers.set('Authorization', getToken('user'));
    const options = { headers: this.headers };
    
    return this.http.patch<PostView>(this.url + "api/article/changeArticleStuff", data, options);
  }

  public SeePostByUserId(id: string): Observable<PostView[]>{

    this.headers = this.headers.set('Authorization', getToken('user'));
    const options = { headers: this.headers };
    return this.http.post<PostView[]>(this.url + "api/article/Articles/ByUserId/" + id, {}, options);
  }

  public getUInfo(id: string): Observable<UserInfo>{
    this.headers = this.headers.set('Authorization', getToken('user'));

    const options = { headers: this.headers };
    this.InfoProfile = this.http.post<UserInfo>(this.url + "api/user/findSpec", { id: id }, options);
    return this.InfoProfile;
  }

  
  public loginRequest(
    path: string,
    method: 'get' | 'post' | 'patch' | 'delete',
    body: any | undefined,
    role: 'user' | 'administrator' = 'user'
  ): Observable<LoginUserDTO> {
    const options = { headers: this.headers };

    this.userInfo = this.http.post<LoginUserDTO>(this.url + path, body, options);
    return this.userInfo;   
  }

  public RefreshToken(): Observable<RecivingRefToken> {

    const options = { headers: this.headers };
    let data = getRefreshToken("user");
    
    return this.http.post<RecivingRefToken>(this.url + '/auth/user/refresh', data, options);
  }
  

}

