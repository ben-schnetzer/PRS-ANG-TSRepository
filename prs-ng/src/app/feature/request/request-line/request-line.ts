import { Component } from '@angular/core';
import { RequestService } from '../../../service/request-service';
import { LineItemService } from '../../../service/lineitem-service';
import { ActivatedRoute } from '@angular/router';
import { LineItem } from '../../../model/line-item';

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
  const requestId = +this.route.snapshot.paramMap.get('id')!;
  //this.requestSvc.get(requestId).subscribe(res => this.request = res);
  //this.lineItemSvc.getLinesForRequest(requestId).subscribe(res => this.lineItems = res);
}


}
