import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineItem } from '../../../model/line-item';
import { Subscription } from 'rxjs';
import { LineItemService } from '../../../service/lineitem-service';
import { ActivatedRoute, Router } from '@angular/router';

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
        error: (err) => console.log('Error retrieving lineitem', err)
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save() {
    this.subscription = this.lineitemSvc.update(this.lineitem).subscribe({
      next: (resp) => {
        this.lineitem = resp;
        this.router.navigateByUrl('/line-item-list');
      },
      error: (err) => console.log('Error saving lineitem', err)
    });
  }
}