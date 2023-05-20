import { publishFacade } from '@angular/compiler';
import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getIdentity, getToken } from 'src/app/models/LocalStorage/token';
import { DropDown } from 'src/app/models/articles-lists/dropdown';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, DoCheck {

  public IsLogined: boolean = false;
  public searchText: string = '';
  public searchForm!: FormGroup;
  public dropDownItems!: DropDown[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.searchForm = this.formBuilder.group({
      keywords: ['', Validators.required],
    })
  }
  ngDoCheck(): void {
    let keyws: string = this.searchForm.get('keywords')?.value;
    if ( keyws != '') {
      if (getToken('user') != 'Bearer null') {
        this.dropDownItems = [];
        
        if ('about us'.toLocaleLowerCase().includes(keyws)) {
          this.dropDownItems = [{
            title: 'About us',
            searchField: 'searching'
          }];
        }
        
        if ('home'.toLocaleLowerCase().includes(keyws))
          this.dropDownItems.push({
            title: 'Home',
            searchField: 'Search other posts'
          });
        
        if ('profile'.toLocaleLowerCase().includes(keyws))
          this.dropDownItems.push({
            title: 'Profile',
            searchField: 'Search other posts'
          });
        
      } else if (getToken('user') == 'Bearer null') {
        if ('about us'.toLocaleLowerCase().includes(keyws))
            this.dropDownItems = [{
              title: 'About us',
              searchField: 'searching'
            }];
      }
    }
  }

  public sendInfo(Nav: string, index: number): void {
    
    console.log("uso klik", Nav);

    if (Nav === 'About us')
      this.router.navigate(['/aboutUs']);
    if (Nav === 'Home')
      this.router.navigate(['/articles']);
    if (Nav === 'Profile')
      this.router.navigate(['/']);

  }
  

  public get keywords() {
    return this.searchForm.get('keywords');
  }

  public submitSearchForm(data: any) {

  }
  
  
  public signOut() {

    localStorage.clear();
    window.alert('You sign out!');
    this.router.navigate(['/aboutUs']);
  }

  public checkAccount(): boolean {
    if (getIdentity('user')) {
      this.IsLogined = true;
      return this.IsLogined;
    }
    
    this.IsLogined = false;
    return this.IsLogined;
  }

  ngOnInit(): void {
  }

}
