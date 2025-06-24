import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LineItem } from '../../../model/line-item';
import { LineItemService } from '../../../service/lineitem-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-line-item-detail',
  standalone: false,
  templateUrl: './line-item-detail.html',
  styleUrl: './line-item-detail.css'
})
export class LineItemDetail implements OnInit, OnDestroy {
  title: string = 'LineItem-Detail';
  subscription!: Subscription;
  lineitemId!: number;
  lineitem!: LineItem;

  constructor(
    private lineitemSvc: LineItemService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((params) => {
      this.lineitemId = params['id'];
      this.subscription = this.lineitemSvc.getById(this.lineitemId).subscribe({
        next: (resp) => (this.lineitem = resp),
        error: (err) =>
          console.log('Error retrieving lineitem with id: ' + this.lineitemId, err)
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete() {
    this.lineitemSvc.delete(this.lineitemId).subscribe({
      next: () => this.router.navigateByUrl('/line-item-list'),
      error: (err) => console.log(err)
    });
  }
}