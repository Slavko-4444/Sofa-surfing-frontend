import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getToken } from 'src/app/models/LocalStorage/token';
import { adminLoginDTO } from 'src/app/models/administrator/admin-login';
import { UserInfo } from 'src/app/models/profile/user.info';
import { LoginUserDTO } from 'src/app/models/receive/loginInfo.dto';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private url = "http://localhost:3000/";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  public AdminLogin(data: adminLoginDTO): Observable<LoginUserDTO|any> {
    const options = { headers: this.headers };

    return this.http.post<LoginUserDTO|any>(this.url + 'auth/login/admin', data, options);
  }

  public GetAllUsers(): Observable<UserInfo[]> {
    this.headers = this.headers.set('Authorization', getToken('administrator'));
    const options = { headers: this.headers };
    
    return this.http.get<UserInfo[]>(this.url + 'api/user/all', options);
  }
  
  public deleteSpecUser(id: string): Observable<any>{
    this.headers = this.headers.set('Authorization', getToken('administrator'));
    const options = { headers: this.headers };
    
    return this.http.delete<any>(this.url + 'api/user/specUser/' + id, options);
  }

}
