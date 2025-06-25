import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LineItem } from '../model/line-item';
import { Observable } from 'rxjs';
import { LineItemDTO } from '../model/line-item-dto';

const URL = "http://localhost:8080/api/LineItems";

@Injectable({
  providedIn: 'root'
})
export class LineItemService {
getLinesForRequest(requestId: number): Observable<LineItem[]> {
  return this.http.get<LineItem[]>(`${URL}/lines-for-req/${requestId}`);
}

  constructor(private http: HttpClient) { }

  list(): Observable<LineItem[]> {
    return this.http.get(URL + '/') as Observable<LineItem[]>;
  }

  add(lineitem: LineItem): Observable<LineItem> {
    return this.http.post(URL, lineitem) as Observable<LineItem>;
  }

  update(lineitem: LineItem): Observable<LineItem> {
    return this.http.put(URL + '/' + lineitem.id, lineitem) as Observable<LineItem>;
  }

  getById(id: number): Observable<LineItem> {
    return this.http.get(URL + '/' + id) as Observable<LineItem>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + '/' + id) as Observable<LineItem>;
  }
}
