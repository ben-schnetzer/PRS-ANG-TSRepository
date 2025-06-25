import { Component } from '@angular/core';
import { RequestService } from '../../../service/request-service';
import { LineItemService } from '../../../service/lineitem-service';
import { ActivatedRoute } from '@angular/router';
import { LineItem } from '../../../model/line-item';
import { Request } from '../../../model/request';

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
  private route: ActivatedRoute
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


  
  deleteLineItem(id: number): void {
  this.lineItemSvc.delete(id).subscribe(() => {
    const requestId = +this.route.snapshot.paramMap.get('id')!;
    this.ngOnInit(); // reload everything
  });
}


}
