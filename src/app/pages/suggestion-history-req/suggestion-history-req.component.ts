import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SuggestionsService } from '@services/data/suggestions.service';
import { Data } from '@type/ISuggestion';
import { AirportCodes } from 'src/app/constants/AirportCodes';

@Component({
  selector: 'app-suggestion-history-req',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suggestion-history-req.component.html',
  styleUrl: './suggestion-history-req.component.css',
})
export class SuggestionHistoryReqComponent implements OnInit {
  suggestion_id: string = '';
  data: Data[] = [];

  constructor(
    private route: ActivatedRoute,
    private suggestionsService: SuggestionsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.suggestion_id = params.get('id')!;
    });

    this.suggestionsService
      .getUserSuggestionById(this.suggestion_id)
      .subscribe({
        next: (data) => {
          this.data = [data.data];
          console.log(this.data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  searchFly(ciudad: string) {
    // Sugerencia de vuelo basado en es scrapping de la página de booking.com
    window.open(
      `https://flights.booking.com/flights/MDE.CITY-${
        AirportCodes[ciudad as keyof typeof AirportCodes]
      }.AIRPORT/?type=ROUNDTRIP&adults=1&cabinClass=ECONOMY&children=&from=MDE.CITY&to=${
        AirportCodes[ciudad as keyof typeof AirportCodes]
      }.AIRPORT&fromCountry=CO&fromLocationName=Medell%C3%ADn&depart=2024-12-28&return=2025-01-04`
    );
  }
}
