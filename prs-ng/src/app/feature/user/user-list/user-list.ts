import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user-service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements OnInit, OnDestroy{
  title: string = 'User-List';
  subscription!: Subscription;
  users: User[] = [];

  constructor(private userSvc: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userSvc.list().subscribe({
      next: (resp) => this.users = resp,
      error: (err) => console.log('Error retrieving users.', err)
    });
    console.log('Users loaded:', this.users);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(id: number) {
    this.subscription = this.userSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.userSvc.list().subscribe((resp) => {
          this.users = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting user', err);
        alert('Error deleting user with id: ' + id);
      },
    });
  }
}
