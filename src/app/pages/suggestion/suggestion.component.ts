import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuggestionsService } from '@services/data/suggestions.service';
import { Suggestion } from '@type/IUser';
  
enum AirportCodes {
  "Playa del Carmen" = "PCM",
  "Rio de Janeiro" = "GIG",
  "Bariloche" = "BRC",
  "Cusco" = "CUZ",
  "Banff" = "YYC",
  "Nueva York" = "JFK",
  "Miami" = "MIA",
  "Toronto" = "YYZ",
  "Tulum" = "CUN",
  "Ushuaia" = "USH",
  "Punta Cana" = "PUJ",
  "San Juan" = "SJU",
  "Chicago" = "ORD",
  "Los Ángeles" = "LAX",
  "Honolulu" = "HNL",
  "Aspen" = "ASE",
  "Ciudad de México" = "MEX",
  "Santorini" = "Santorini",
  "Lisboa" = "LIS",
  "Interlaken" = "ZRH",
  "Granada" = "GRX",
  "Zermatt" = "ZRH",
  "París" = "CDG",
  "Viena" = "VIE",
  "Berlín" = "TXL",
  "Ibiza" = "IBZ",
  "Reykjavik" = "KEF",
  "Algarve" = "FAO",
  "Londres" = "LHR",
  "Niza" = "NCE",
  "Chamonix" = "CMX",
  "Roma" = "FCO",
  "Malta" = "MLA",
  "Cartagena" = "CTG",
  "Barcelona" = "BCN"
}



@Component({
  selector: 'app-suggestion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suggestion.component.html',
  styleUrl: './suggestion.component.css'
})
export class SuggestionComponent {
  constructor(
    private suggestionService: SuggestionsService
  ) {}

  suggestions: Suggestion[] = [];

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

  ngOnInit(): void {

    const userId = sessionStorage.getItem('id')!;

    this.suggestionService.getLastSuggestion(userId, {
      callBackComplete: () => {
        console.log('complete');
      },
      callBackError: (error) => {
        console.log('error', error);
      },
      callBackSuccess: (data) => {
        this.suggestions = [data];
      },
    });
  }
}
