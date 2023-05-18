import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { getIdentity, saveToken } from 'src/app/models/LocalStorage/token';
import { UserInfo } from 'src/app/models/profile/user.info';
import { LoginUserDTO } from 'src/app/models/receive/loginInfo.dto';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy, DoCheck {

  public profile!: UserInfo;
  private connections: Subscription[] = [];
  public isLoggined: boolean = false; 
  public ErrorMessage: string = '';
  public seePosts: boolean = false;
  public addPost: boolean = false;
  public isloading: boolean = true;
  
  constructor(private profileService: ProfileService) {
    if (getIdentity("user")) 
      this.isLoggined = true;
    
  }



  public seeProfilePosts() {
    this.seePosts = !this.seePosts;
  }
  public addProfilePost() {
    this.addPost = !this.addPost;
  }


  ngOnInit(): void {
    let id = getIdentity("user");
    if (id) {
      this.isLoggined = true;  
      this.isloading = true;
      let sub = this.profileService.getUInfo(id).subscribe(
        res => {
          this.isloading = false;
          this.profile = res;
          this.ErrorMessage = ''
        },
        error => this.ErrorMessage = error.message 
        );

      this.connections.push(sub);
    } 
    else
      this.isLoggined = false;

  }

  ngDoCheck(): void {
  }
  
  
   ngOnDestroy(): void {
    this.connections.forEach(sub => sub.unsubscribe());
   }
  
}
