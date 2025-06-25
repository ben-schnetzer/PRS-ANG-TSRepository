import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LineItem } from '../../../model/line-item';
import { LineItemService } from '../../../service/lineitem-service';
import { Router } from '@angular/router';
import { RequestService } from '../../../service/request-service';
import { ProductService } from '../../../service/product-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lineItem-create',
  standalone: false,
  templateUrl: './line-item-create.html',
  styleUrl: './line-item-create.css'
})
export class LineItemCreate implements OnInit, OnDestroy {
  title: string = 'LineItem-Create';
  subscription!: Subscription;
  newLineItem: LineItem = new LineItem();

  requests: any[] = [];
  products: any[] = [];

  constructor(
    private lineItemSvc: LineItemService,
    private requestSvc: RequestService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addLineItem(): void {
    const fullLineItem: LineItem = new LineItem();
    fullLineItem.product = { id: this.newLineItem.product.id } as any;
    fullLineItem.request = { id: this.newLineItem.request.id } as any;
    fullLineItem.quantity = this.newLineItem.quantity;

    console.log('Sending LineItem:', fullLineItem);

    this.subscription = this.lineItemSvc.add(fullLineItem).subscribe({
      next: () => {
        const reqId = this.newLineItem.request.id;
        this.router.navigateByUrl(`/request-line/${reqId}`, { skipLocationChange: false });


      },
error: err => {
  console.error('Full backend error:', err);

  if (err.status === 500) {
    alert("Can't enter duplicates of the same product. Please change quantity instead.");
  } else {
    console.error('Error creating line item', err);
  }
}
    });
  }

  ngOnInit(): void {
    const reqId = Number(this.route.snapshot.paramMap.get('id'));
    this.requestSvc.getById(reqId).subscribe({
      next: res => this.newLineItem.request = res,
      error: err => console.error('Error loading request', err)
    });

    this.productSvc.list().subscribe({
      next: res => this.products = res,
      error: err => console.error('Error loading products', err)
    });
  }
}
