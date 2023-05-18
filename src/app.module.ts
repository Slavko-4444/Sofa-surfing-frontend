import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavigationComponent } from './app/components/navigation/navigation.component';
import { FooterComponent } from './app/components/footer/footer.component';
import { ListOfArticlesComponent } from './app/components/list-of-articles/list-of-articles.component';
import { ArticleInfoComponent } from './app/components/article-info/article-info.component';
import { LoginRegistrationComponent } from './app/components/login-registration/login-registration.component';
import { ProfileComponent } from './app/components/profile/profile.component';
import { AboutUsComponent } from './app/components/about-us/about-us.component';
import { HttpClientModule } from '@angular/common/http';
import { UserPostsComponent } from './app/components/user-posts/user-posts.component';
import { UserAddPostComponent } from './app/components/user-add-post/user-add-post.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    ListOfArticlesComponent,
    ArticleInfoComponent,
    LoginRegistrationComponent,
    ProfileComponent,
    AboutUsComponent,
    UserPostsComponent,
    UserAddPostComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
