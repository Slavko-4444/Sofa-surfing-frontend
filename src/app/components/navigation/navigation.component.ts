import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getIdentity } from 'src/app/models/LocalStorage/token';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public IsLogined: boolean = false;
  constructor(private router: Router) {
    
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
