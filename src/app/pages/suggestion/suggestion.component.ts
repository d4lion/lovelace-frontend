import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuggestionsService } from '@services/data/suggestions.service';
import { Suggestion } from '@type/IUser';

@Component({
  selector: 'app-suggestion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suggestion.component.html',
  styleUrl: './suggestion.component.css'
})
export class SuggestionComponent {
  constructor(private router: Router, private suggestionService: SuggestionsService) { }

  suggestions: Suggestion[] = []
  

  ngOnInit(): void {
    this.suggestionService.getLastSuggestion(1018234129, {
      callBackComplete: () => {
        console.log('complete')
      },
      callBackError: (error) => {
        console.log('error', error)
      },
      callBackSuccess: (data) => {
        this.suggestions = [data];
      }
    })
  }

}
