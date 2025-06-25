import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineItem } from '../../../model/line-item';
import { Subscription } from 'rxjs';
import { LineItemService } from '../../../service/lineitem-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../service/product-service';

@Component({
  selector: 'app-lineitem-edit',
  standalone: false,
  templateUrl: './line-item-edit.html',
  styleUrl: './line-item-edit.css'
})
export class LineItemEdit implements OnInit, OnDestroy {
  title: string = 'LineItem-Edit';
  subscription!: Subscription;
  lineitem!: LineItem;
  lineitemId!: number;

  products: any[] = [];

  constructor(
    private lineitemSvc: LineItemService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private productSvc: ProductService
  ) { }
ngOnDestroy(): void {
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
  }
  
save(): void {
  if (!this.lineitem || !this.lineitem.request) return;

  const requestId = this.lineitem.request.id;

  this.subscription = this.lineitemSvc.update(this.lineitem).subscribe({
    next: () => this.router.navigateByUrl(`/request-line/${requestId}`),
    error: (err) => {
      const raw = err?.error ? JSON.stringify(err.error) : '';
      console.error('Error saving lineitem:', raw);

      if (err.status === 500 || raw.toLowerCase().includes('duplicate entry')) {
        alert("Can't change to a duplicate product. Please edit the quantity on the original instead.");
      } else {
        console.error('Unexpected error saving lineitem:', err);
      }
    }
  });
}



  ngOnInit(): void {
    this.actRoute.params.subscribe((params) => {
      this.lineitemId = params['id'];
      this.subscription = this.lineitemSvc.getById(this.lineitemId).subscribe({
        next: (resp) => this.lineitem = resp,
        error: (err) => console.log('Error retrieving lineitem', err)
      });
    });

    this.productSvc.list().subscribe({
      next: res => this.products = res,
      error: err => console.error('Error loading products', err)
    });
  }
}