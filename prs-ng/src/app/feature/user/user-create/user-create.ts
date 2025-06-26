import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  standalone: false,
  templateUrl: './user-create.html',
  styleUrl: './user-create.css'
})
export class UserCreate implements OnInit, OnDestroy {
  title: string = 'User-Create';
  subscription!: Subscription;
  newUser: User = new User();

  constructor(private userSvc: UserService, private router: Router) {}

  ngOnInit(): void {}

ngOnDestroy(): void {
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
}


  adduser() {
    this.subscription = this.userSvc.add(this.newUser).subscribe({
      next: () => this.router.navigateByUrl('/user-list'),
      error: (err) => console.log('Error creating user', err)
    });
  }
}