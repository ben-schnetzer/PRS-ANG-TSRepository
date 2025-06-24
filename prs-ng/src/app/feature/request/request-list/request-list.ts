import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from '../../../service/request-service';
import { Request } from '../../../model/request';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.html',
  styleUrl: './request-list.css'
})
export class RequestList implements OnInit, OnDestroy{
  title: string = 'Request-List';
  subscription!: Subscription;
  requests: Request[] = [];

  constructor(private requestSvc: RequestService) {}

  ngOnInit(): void {
    this.subscription = this.requestSvc.list().subscribe({
      next: (resp) => this.requests = resp,
      error: (err) => console.log('Error retrieving requests.', err)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(id: number) {
    this.subscription = this.requestSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.requestSvc.list().subscribe((resp) => {
          this.requests = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting request', err);
        alert('Error deleting request with id: ' + id);
      },
    });
  }
}
