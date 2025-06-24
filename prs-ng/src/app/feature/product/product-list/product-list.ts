import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../service/product-service';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit, OnDestroy{
  title: string = 'Product-List';
  subscription!: Subscription;
  products: Product[] = [];

  constructor(private productSvc: ProductService) {}

  ngOnInit(): void {
    this.subscription = this.productSvc.list().subscribe({
      next: (resp) => this.products = resp,
      error: (err) => console.log('Error retrieving products.', err)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(id: number) {
    this.subscription = this.productSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.productSvc.list().subscribe((resp) => {
          this.products = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting product', err);
        alert('Error deleting product with id: ' + id);
      },
    });
  }
}
