import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SuggestionsService } from '@services/data/suggestions.service';
import { Suggestion } from '@type/IUser';

@Component({
  selector: 'app-suggestion-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suggestion-history.component.html',
  styleUrl: './suggestion-history.component.css'
})
export class SuggestionHistoryComponent {
  userSuggestions: Suggestion[] = [];

  constructor(private suggestionService: SuggestionsService) {}

  ngOnInit(): void {

    const userId = sessionStorage.getItem('id')!;

    this.suggestionService.getUserSuggestions(userId, (data) => {
      this.userSuggestions = data;
    })
  }
}
