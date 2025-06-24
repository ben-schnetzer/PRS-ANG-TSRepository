import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LineItemService } from '../../../service/lineitem-service';
import { LineItem } from '../../../model/line-item';

@Component({
  selector: 'app-lineitem-list',
  standalone: false,
  templateUrl: './line-item-list.html',
  styleUrl: './line-item-list.css'
})
export class LineItemList implements OnInit, OnDestroy{
  title: string = 'LineItem-List';
  subscription!: Subscription;
  lineitems: LineItem[] = [];

  constructor(private lineitemSvc: LineItemService) {}

  ngOnInit(): void {
    this.subscription = this.lineitemSvc.list().subscribe({
      next: (resp) => this.lineitems = resp,
      error: (err) => console.log('Error retrieving lineitems.', err)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(id: number) {
    this.subscription = this.lineitemSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.lineitemSvc.list().subscribe((resp) => {
          this.lineitems = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting lineitem', err);
        alert('Error deleting lineitem with id: ' + id);
      },
    });
  }
}
