import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../../service/request-service';
import { Request } from '../../../model/request';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SystemService } from '../../../service/system-service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.html',
  //standalone: false,
  styleUrl: './approve.css',
  imports: [CommonModule, FormsModule, RouterModule] 
})
export class Approve implements OnInit {
  request!: Request;
  reason: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestSvc: RequestService,
    public sysSvc: SystemService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.requestSvc.getById(id).subscribe({
      next: r => this.request = r,
      error: err => console.error('Error loading request', err)
    });
  }

  approve(): void {
    this.requestSvc.approve(this.request.id).subscribe(() => {
      this.router.navigateByUrl('/request-list');
    });
  }

  reject(): void {
    if (!this.reason.trim()) return;
    this.requestSvc.reject(this.request.id, this.reason).subscribe(() => {
      this.router.navigateByUrl('/request-list');
    });
  }
}
