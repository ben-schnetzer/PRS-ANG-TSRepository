import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-create',
  standalone: false,
  templateUrl: './vendor-create.html',
  styleUrl: './vendor-create.css'
})
export class VendorCreate implements OnInit, OnDestroy {
  title: string = 'Vendor-Create';
  subscription!: Subscription;
  newVendor: Vendor = new Vendor();

  constructor(private vendorSvc: VendorService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addvendor() {
    this.subscription = this.vendorSvc.add(this.newVendor).subscribe({
      next: () => this.router.navigateByUrl('/vendor-list'),
      error: (err) => console.log('Error creating vendor', err)
    });
  }
}