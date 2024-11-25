import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, Suggestion } from '@type/IUser';
import { Observable } from 'rxjs';
import { environment } from 'src/env/prod.env';

@Injectable({
  providedIn: 'root',
})
export class SuggestionsService {
  constructor(private http: HttpClient) {}

  private getUserData(userId: string | number): Observable<IUser> {
    return this.http.get<IUser>(
      `${environment.backendUrl}/${environment.userPath}/${userId}`
    );
  }

  getLastSuggestion(userId: string | number, {callBackComplete, callBackError, callBackSuccess}: {callBackComplete: () => void, callBackError: (error: any) => void, callBackSuccess: (data: Suggestion) => void}) {
    this.getUserData(userId).subscribe({
      next: (data) => {
        const suggestion = data.suggestions[data.suggestions.length - 1]; 
        callBackSuccess(suggestion);
      },
      complete: () => {
        callBackComplete();
      }
      ,
      error: (error) => {
        callBackError(error);
      }
    })
  }
}
