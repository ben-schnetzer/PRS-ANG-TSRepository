import { Component, OnDestroy, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { Subscription } from 'rxjs';
import { RequestService } from '../../../service/request-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-edit',
  standalone: false,
  templateUrl: './request-edit.html',
  styleUrl: './request-edit.css'
})
export class RequestEdit implements OnInit, OnDestroy {
  title: string = 'Request-Edit';
  subscription!: Subscription;
  request!: Request;
  requestId!: number;

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
        error: (err) => console.log('Error retrieving request', err)
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save() {
    this.subscription = this.requestSvc.update(this.request).subscribe({
      next: (resp) => {
        this.request = resp;
        this.router.navigateByUrl('/request-list');
      },
      error: (err) => console.log('Error saving request', err)
    });
  }
}