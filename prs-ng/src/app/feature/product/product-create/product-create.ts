import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product-service';
import { Router } from '@angular/router';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor-service';

@Component({
  selector: 'app-product-create',
  standalone: false,
  templateUrl: './product-create.html',
  styleUrl: './product-create.css'
})
export class ProductCreate implements OnInit, OnDestroy {
  title: string = 'Product-Create';
  subscription!: Subscription;
  newProduct: Product = new Product();
  vendors: Vendor[] = [];

  constructor(private productSvc: ProductService, private vendorSvc: VendorService, private router: Router) {}

    ngOnInit(): void {
    this.subscription = this.vendorSvc.list().subscribe({
      next: (vendors) => this.vendors = vendors,
      error: (err) => console.log('Error loading vendors', err)
    });
  }

ngOnDestroy(): void {
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
}


  addproduct() {
    this.subscription = this.productSvc.add(this.newProduct).subscribe({
      next: () => this.router.navigateByUrl('/product-list'),
      error: (err) => console.log('Error creating product', err)
    });
  }
}