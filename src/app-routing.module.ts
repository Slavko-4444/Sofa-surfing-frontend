import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegistrationComponent } from './app/components/login-registration/login-registration.component';
import { ListOfArticlesComponent } from './app/components/list-of-articles/list-of-articles.component';
import { ArticleInfoComponent } from './app/components/article-info/article-info.component';
import { ProfileComponent } from './app/components/profile/profile.component';
import { AboutUsComponent } from './app/components/about-us/about-us.component';

const routes: Routes = [
  { path: 'article/:articleId', component: ArticleInfoComponent },
  { path: 'articles', component: ListOfArticlesComponent },
  { path: 'login', component: LoginRegistrationComponent },
  { path: '', component: ProfileComponent },
  { path: 'aboutUs', component: AboutUsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
