import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { getIdentity } from 'src/app/models/LocalStorage/token';
import { UserInfo } from 'src/app/models/profile/user.info';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit, OnDestroy{

  public isLoggined: boolean = false;
  public users: UserInfo[] = []; 
  public connections: Subscription[]=[];
  constructor(private adminService: AdminServiceService) { }





  ngOnDestroy(): void {
    this.connections.forEach(sub => sub.unsubscribe());
  }
  
  ngOnInit(): void {
    if (getIdentity('administrator')) {
      
      this.adminService.GetAllUsers().subscribe(
        res => this.users = res,
        error => console.log(error)
        
      )
      this.isLoggined = true;
    }
    else 
      this.isLoggined = false;
  }

  public DeleteCurrUser(_id: string, username: string) {
    
    Swal.fire({
      title: 'Deleting account',
      text: 'Confirm you want remove user ' + username + ' !',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Dismiss'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteSpecUser(_id).subscribe(
          res => {
            console.log("stiglo", res); 
            if (!res.statusCode) {
              Swal.fire('Deleted!', 'Successfully deleted!', 'success');
              this.ngOnInit();
            }
            
            else
              Swal.fire('Bad request', 'Error action!', 'error');
          }
        )
      } 
    });

  }




}
