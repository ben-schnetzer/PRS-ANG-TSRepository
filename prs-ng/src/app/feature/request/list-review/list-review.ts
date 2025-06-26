import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../service/request-service';
import { Request } from '../../../model/request';
import { SystemService } from '../../../service/system-service'; // 👈 import this instead
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-review',
  templateUrl: './list-review.html',
  //standalone: false,
  styleUrl: './list-review.css',
  imports: [CommonModule, RouterModule] 
})
export class ListReview implements OnInit {
  requests: Request[] = [];

  constructor(
    private requestSvc: RequestService,
    private sysSvc: SystemService // 👈 use this now
  ) {}

  ngOnInit(): void {
    const currentUserId = this.sysSvc.loggedInUser.id; // 👈 easy swap
    this.requestSvc.getReviewList(currentUserId).subscribe({
      next: (res: Request[]) => this.requests = res,
      error: err => console.error('Error loading reviewable requests', err)
    });
  }
}
