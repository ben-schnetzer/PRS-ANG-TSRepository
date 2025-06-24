import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-detail',
  standalone: false,
  templateUrl: './request-detail.html',
  styleUrl: './request-detail.css'
})
export class RequestDetail implements OnInit, OnDestroy {
  title: string = 'Request-Detail';
  subscription!: Subscription;
  requestId!: number;
  request!: Request;

  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((params) => {
      this.requestId = params['id'];
      this.subscription = this.requestSvc.getById(this.requestId).subscribe({
        next: (resp) => (this.request = resp),
        error: (err) =>
          console.log('Error retrieving request with id: ' + this.requestId, err)
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete() {
    this.requestSvc.delete(this.requestId).subscribe({
      next: () => this.router.navigateByUrl('/request-list'),
      error: (err) => console.log(err)
    });
  }
}