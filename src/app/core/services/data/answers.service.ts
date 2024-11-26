import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/prod.env';
import { IBackendData } from '@type/IQuiz';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  constructor(private http: HttpClient) { }

  getAnswers(): Observable<any> {
    return this.http.get(environment.s3);
  }

  sendAnswersToGetSuggestion(data: IBackendData): Observable<any> {
    console.log(data)
    return this.http.post(`${environment.backendUrl}/${environment.suggestionPath}`, data);
  }
}
