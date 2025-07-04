import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendor } from '../model/vendor';
import { Observable } from 'rxjs';

const URL = "http://localhost:8080/api/Vendors";

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) { }

  list(): Observable<Vendor[]> {
    return this.http.get(URL + '/') as Observable<Vendor[]>;
  }

  add(vendor: Vendor): Observable<Vendor> {
    return this.http.post(URL, vendor) as Observable<Vendor>;
  }

  update(vendor: Vendor): Observable<Vendor> {
    return this.http.put(URL + '/' + vendor.id, vendor) as Observable<Vendor>;
  }

  getById(id: number): Observable<Vendor> {
    return this.http.get(URL + '/' + id) as Observable<Vendor>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + '/' + id) as Observable<Vendor>;
  }
}
