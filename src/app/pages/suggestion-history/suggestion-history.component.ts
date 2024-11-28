import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuggestionsService } from '@services/data/suggestions.service';
import { Suggestion } from '@type/IUser';
import { environment } from 'src/env/prod.env';

@Component({
  selector: 'app-suggestion-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suggestion-history.component.html',
  styleUrl: './suggestion-history.component.css',
})
export class SuggestionHistoryComponent {
  userSuggestions: Suggestion[] = [];
  userName = sessionStorage.getItem('name');
  isPopUpCopiedOpen = false;

  constructor(
    private suggestionService: SuggestionsService,
    private router: Router
  ) {}

  onSuggestionClick(suggestion_id: string | number) {
    this.router.navigate([`suggestion/history/${suggestion_id}`]);
  }

  copyToClipboard(text: string): void {
    this.isPopUpCopiedOpen = true;

    setTimeout(() => {
      this.isPopUpCopiedOpen = false;
    }, 3000);

    const textarea = document.createElement('textarea');
    textarea.value = 'localhost:4200/suggestion/history/' + text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  onStartAdventure() {
    this.router.navigate(['/quiz']);
  }

  deleteSuggestion(suggestion_id: string) {
    this.suggestionService.deleteSuggestionById(suggestion_id).subscribe({
      next: () => {
        this.getUserSuggestions();
      }
    })
  }

  getUserSuggestions(userId: string | number = sessionStorage.getItem('id')!) {
        this.suggestionService.getUserSuggestions(userId, (data) => {
          this.userSuggestions = data;
        });
  }

  ngOnInit(): void {
    this.getUserSuggestions();
  }
}
