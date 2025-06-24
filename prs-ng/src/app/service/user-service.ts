import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { UserLoginDTO } from '../model/user-login-dto';

const URL = "http://localhost:8080/api/Users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(userLoginDTO: UserLoginDTO): Observable<User> {
    return this.http.post(URL+'/login', userLoginDTO) as Observable<User>
  }

  list(): Observable<User[]> {
    return this.http.get(URL + '/') as Observable<User[]>;
  }

  add(user: User): Observable<User> {
    return this.http.post(URL, user) as Observable<User>;
  }

  update(user: User): Observable<User> {
    return this.http.put(URL + '/' + user.id, user) as Observable<User>;
  }

  getById(id: number): Observable<User> {
    return this.http.get(URL + '/' + id) as Observable<User>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + '/' + id) as Observable<User>;
  }
}
