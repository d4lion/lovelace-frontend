import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/prod.env';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  constructor(private http: HttpClient) { }

  getAnswers(): Observable<any> {
    return this.http.get(environment.s3);
  }
}
