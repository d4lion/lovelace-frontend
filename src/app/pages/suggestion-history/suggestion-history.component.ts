import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuggestionsService } from '@services/data/suggestions.service';
import { GemminiService } from '@services/ia-workers/gemmini.service';
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
  isIaSuggestionPopUpOpen = false;
  dataForIaSuggestionPopUp = ''

  constructor(
    private suggestionService: SuggestionsService,
    private router: Router,
    private gemminiService: GemminiService
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

  closePopUpIa() {
    this.isIaSuggestionPopUpOpen = false
  }

  testingMethos(
    city_1: string,
    contry_1: string,
    city_2: string,
    contry_2: string
  ) {
    this.isIaSuggestionPopUpOpen = true;
    this.gemminiService.generateContent(city_1, contry_1, city_2, contry_2).subscribe({
      next: (data) => {
        this.dataForIaSuggestionPopUp = data.candidates[0].content.parts[0].text
      }
    })
  }

}
