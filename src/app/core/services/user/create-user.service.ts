import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICreateUserData } from '@type/IUser';

@Injectable({
  providedIn: 'root',
})
export class CreateUserService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8080';

  createUser(user: ICreateUserData): Observable<any> {
    const path = 'api/v1/users/create';

    return this.http.post(`${this.url}/${path}`, user).pipe(
      catchError((error) => {
        throw error;
      })
    )
  }
}
