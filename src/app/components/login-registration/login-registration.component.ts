import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendLoginModel } from 'src/app/models/send/login.dto';
import { SendRegistrationModel } from 'src/app/models/send/registration.dto';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { saveIdentity, saveRefreshToken, saveToken } from 'src/app/models/LocalStorage/token';
import { Subscription } from 'rxjs';
import { LoginUserDTO } from 'src/app/models/receive/loginInfo.dto';
import { adminLoginDTO } from 'src/app/models/administrator/admin-login';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css']
})
  
  

export class LoginRegistrationComponent implements OnDestroy{
  
  public IsLogin: boolean = true;
  public loginForm!: FormGroup;
  public registrationForm!: FormGroup;
  private connections: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminServiceService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      surname: ['', [Validators.required,]],
      forename: ['', [Validators.required,]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    })
  }


  ngOnDestroy(): void {
    this.connections.forEach(sub => sub.unsubscribe());
  }

  public submitForm(data:SendLoginModel) {
    let sub = this.profileService.loginRequest('auth/login/user', 'post', data).subscribe(
      (res) => {
        if (res.error) {
          window.alert(res.error);

        } else {
          saveToken(res.token, "user");
          saveRefreshToken(res.refreshToken, "user");
          saveIdentity(res.identity, 'user');
          Swal.fire('Welcome!', 'Successfully signed in!', 'success');
          this.router.navigate(['/']);            
        }
      }
    );

    this.connections.push(sub);
  }
  
  public get email() {
    return this.loginForm.get('email');
  }
  public get password() {
    return this.loginForm.get('password');
  }

  private pozovi(data: SendRegistrationModel) {
    let s = this.profileService.registration(data).subscribe(
      res => {
        Swal.fire('Greate!', 'Successfully signed in!', 'success');
        this.router.navigate(['']);
      }
    )
    this.connections.push(s);
    
  }

  public submitRegForm(data: SendRegistrationModel) {
     Swal.fire({
      title: 'Creating account',
      text: 'Are you sure, you want to join with new account ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Dismiss'
     }).then((result) => {
      if (result.isConfirmed) 
        this.pozovi(data);
    });


  }
  
  public get Email() {
    return this.registrationForm.get('email');
  }
  public get Surname() {
    return this.registrationForm.get('surname');
  }
  public get Forename() {
    return this.registrationForm.get('forename');
  }
  public get Password() {
    return this.registrationForm.get('password');
  }
  public get Phone() {
    return this.registrationForm.get('phone');
  }

  public AdminLogin() {
    let adminLogin: adminLoginDTO = {
      username: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.adminService.AdminLogin(adminLogin).subscribe(
      res => {
        if (res.error) {
          window.alert(res.error);
        } else {
          saveToken(res.token, "administrator");
          saveIdentity(res.identity, 'administrator');
          Swal.fire('Welcome!', 'Successfully loggined!', 'success');
          this.router.navigate(['/administrator']);
          
        }
          
      }
    )
  }


  showRegistration() {
    this.IsLogin = false;
  }
  showLogin() {
    this.IsLogin = true;
  }

}
