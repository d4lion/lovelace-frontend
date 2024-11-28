import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuggestionResponse } from '@type/ISuggestion';
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

  getUserSuggestions(userId: string | number, callBackSuccess: (data: Suggestion[]) => void) {
    this.getUserData(userId).subscribe({
      next: (data) => {
        callBackSuccess(data.suggestions);
      },
    })
  }

  getUserSuggestionById(suggestion_id: string | number): Observable<SuggestionResponse> { 
    return this.http.get<SuggestionResponse>(`${environment.backendUrl}/${environment.suggestionHistoryPath}/${suggestion_id}`);
  }

  deleteSuggestionById(suggestion_id: string | number): Observable<any>{ 
    return this.http.delete(`${environment.backendUrl}/${environment.deleteSuggestionPath}`, {
      body: {
        id: suggestion_id.toString()
      }
    });
  }


}
