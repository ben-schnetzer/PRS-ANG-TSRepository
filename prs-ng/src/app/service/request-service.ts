import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from '../model/request';
import { Observable } from 'rxjs';

const URL = "http://localhost:8080/api/Requests";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  list(): Observable<Request[]> {
    return this.http.get(URL + '/') as Observable<Request[]>;
  }

  add(request: Request): Observable<Request> {
    return this.http.post(URL, request) as Observable<Request>;
  }

  update(request: Request): Observable<Request> {
    return this.http.put(URL + '/' + request.id, request) as Observable<Request>;
  }

  submitForReview(id: number): Observable<Request> {
  return this.http.put<Request>(`${URL}/submit-review/${id}`, null);
}

  getReviewList(userId: number): Observable<Request[]> {
  return this.http.get<Request[]>(`${URL}/list-review/${userId}`);
  }
  
  approve(id: number): Observable<Request> {
  return this.http.put<Request>(`${URL}/approve/${id}`, null);
}

reject(id: number, reason: string): Observable<void> {
  return this.http.put<void>(`${URL}/reject/${id}`, { reasonForRejection: reason });
}


  getById(id: number): Observable<Request> {
    return this.http.get(URL + '/' + id) as Observable<Request>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + '/' + id) as Observable<Request>;
  }
}
