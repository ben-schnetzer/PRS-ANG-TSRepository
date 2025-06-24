import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LineItem } from '../../../model/line-item';
import { LineItemService } from '../../../service/lineitem-service';
import { Router } from '@angular/router';

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

  constructor(private lineItemSvc: LineItemService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addlineItem() {
    this.subscription = this.lineItemSvc.add(this.newLineItem).subscribe({
      next: () => this.router.navigateByUrl('/lineItem-list'),
      error: (err) => console.log('Error creating lineItem', err)
    });
  }
}