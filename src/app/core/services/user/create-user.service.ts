import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICreateUserData } from '@type/IUser';
import { environment } from 'src/env/prod.env';

@Injectable({
  providedIn: 'root',
})
export class CreateUserService {
  constructor(private http: HttpClient) {}

  url = environment.backendUrl;

  createUser(user: ICreateUserData): Observable<any> {
    const path = 'api/v1/users/create';

    return this.http.post(`${this.url}/${path}`, user).pipe(
      catchError((error) => {
        throw error;
      })
    )
  }
}
