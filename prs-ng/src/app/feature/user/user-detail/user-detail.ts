import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css'
})
export class UserDetail implements OnInit, OnDestroy {
  title: string = 'User-Detail';
  subscription!: Subscription;
  userId!: number;
  user!: User;

  constructor(
    private userSvc: UserService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((params) => {
      this.userId = params['id'];
      this.subscription = this.userSvc.getById(this.userId).subscribe({
        next: (resp) => (this.user = resp),
        error: (err) =>
          console.log('Error retrieving user with id: ' + this.userId, err)
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete() {
    this.userSvc.delete(this.userId).subscribe({
      next: () => this.router.navigateByUrl('/user-list'),
      error: (err) => console.log(err)
    });
  }
}