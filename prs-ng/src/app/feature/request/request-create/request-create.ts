import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request-service';
import { Router } from '@angular/router';
import { SystemService } from '../../../service/system-service';

@Component({
  selector: 'app-request-create',
  standalone: false,
  templateUrl: './request-create.html',
  styleUrl: './request-create.css'
})
export class RequestCreate implements OnInit, OnDestroy {
  title: string = 'Request-Create';
  subscription!: Subscription;
  newRequest: Request = new Request();

  constructor(private requestSvc: RequestService,
    private router: Router,
    private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.newRequest.user = this.sysSvc.loggedInUser;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addrequest() {
    this.subscription = this.requestSvc.add(this.newRequest).subscribe({
      next: () => this.router.navigateByUrl('/request-list'),
      error: (err) => console.log('Error creating request', err)
    });
  }
}