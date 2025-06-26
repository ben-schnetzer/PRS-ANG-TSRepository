import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginDTO } from '../../model/user-login-dto';
import { User } from '../../model/user';
import { UserService } from '../../service/user-service';
import { Subscription } from 'rxjs';
import { SystemService } from '../../service/system-service';

@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.html',
  styleUrl: './user-login.css',
})
export class UserLogin implements OnInit, OnDestroy {
  title: string = 'User-Login';
  userLoginDTO: UserLoginDTO = new UserLoginDTO();
  subscription!: Subscription;
  user!: User;
  message: string = '';

  constructor(
    private userSvc: UserService,
    private router: Router,
    private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.userLoginDTO.username = 'jimbob24';
    this.userLoginDTO.password = 'jimbobpass';
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  login() {
    // call the user userService.login(this.userLogin)
    // expected results????
    // - invalid stuff: invalid login - message displayed
    // - correct stuff: success login - forward to movie list component
    console.log("User login", this.userLoginDTO);
    this.subscription = this.userSvc.login(this.userLoginDTO).subscribe({
      next: (resp) => {
        // successful login
        this.sysSvc.loggedInUser = resp;
        // nav to movie-list
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        // unsuccessful login
        this.message = 'Invalid login - bad username/pwd combo';
      },
    });
  }
}