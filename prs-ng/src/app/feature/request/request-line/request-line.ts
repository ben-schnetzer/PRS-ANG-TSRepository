import { Component } from '@angular/core';
import { RequestService } from '../../../service/request-service';
import { LineItemService } from '../../../service/lineitem-service';
import { ActivatedRoute } from '@angular/router';
import { LineItem } from '../../../model/line-item';
import { Request } from '../../../model/request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-line',
  standalone: false,
  templateUrl: './request-line.html',
  styleUrl: './request-line.css'
})
export class RequestLine {

constructor(
  private requestSvc: RequestService,
  private lineItemSvc: LineItemService,
  private route: ActivatedRoute,
  private router: Router
) {}

request!: Request;
lineItems: LineItem[] = [];

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = Number(params.get('id'));
    this.requestSvc.getById(id).subscribe(req => this.request = req);
    this.lineItemSvc.getLinesForRequest(id).subscribe(lines => this.lineItems = lines);
  });
  }
  
submitRequest(): void {
  if (!this.request || !this.request.id) return;

  this.requestSvc.submitForReview(this.request.id).subscribe({
    next: updated => {
      this.request = updated;

      // Optionally show a quick alert
      alert('Request submitted!');

      // Navigate to the same route to trigger a refresh
      // You can tweak this if you're doing routing differently
      this.router.navigateByUrl('/request-list');
    },
    error: err => {
      console.error('Error submitting request', err);
      alert('Unable to submit request. Please try again.');
    }
  });
}



  
  deleteLineItem(id: number): void {
  this.lineItemSvc.delete(id).subscribe(() => {
    const requestId = +this.route.snapshot.paramMap.get('id')!;
    this.ngOnInit(); // reload everything
  });
}


}
