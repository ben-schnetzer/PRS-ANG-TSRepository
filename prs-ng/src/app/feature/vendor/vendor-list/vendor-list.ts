import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VendorService } from '../../../service/vendor-service';
import { Vendor } from '../../../model/vendor';

@Component({
  selector: 'app-vendor-list',
  standalone: false,
  templateUrl: './vendor-list.html',
  styleUrl: './vendor-list.css'
})
export class VendorList implements OnInit, OnDestroy{
  title: string = 'Vendor-List';
  subscription!: Subscription;
  vendors: Vendor[] = [];

  constructor(private vendorSvc: VendorService) {}

  ngOnInit(): void {
    this.subscription = this.vendorSvc.list().subscribe({
      next: (data) => { this.vendors = data; console.log(this.vendors.length + " vendors loaded"); },
      //next: (resp) => this.vendors = resp,
      error: (err) => console.log('Error retrieving vendors.', err)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(id: number) {
    this.subscription = this.vendorSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.vendorSvc.list().subscribe((resp) => {
          this.vendors = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting vendor', err);
        alert('Error deleting vendor with id: ' + id);
      },
    });
  }
}
