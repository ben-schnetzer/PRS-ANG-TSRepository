import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product-service';
import { Router } from '@angular/router';

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

  constructor(private productSvc: ProductService, private router: Router) {}

  ngOnInit(): void {}

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