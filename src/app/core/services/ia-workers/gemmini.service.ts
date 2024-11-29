import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IASuggestion } from '@type/IASuggestion';
import { environment } from 'src/env/prod.env';

@Injectable({
  providedIn: 'root',
})
export class GemminiService {
  private apiUrl =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
  private apiKey = environment.gemminiApiKey;

  constructor(private http: HttpClient) { }
  

  generateContent(
    city_1: string,
    contry_1: string,
    city_2: string,
    contry_2: string
  ): Observable<IASuggestion> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      contents: [
        {
          parts: [
            {
              text: `digas aquí tienes tu respuesta, ni nada por el estilo. Simplemente, dame una opinion de estos dos paises con su respectiva ciudad: ${city_1},${contry_1} y ${city_2}, ${contry_2}. maximo de 30 palabras, no mas de 30 palabras. Damelo como una recomendacio e invitación a ir al pais, y hacerlo haciendo uso de los servicios de Amadeus, intenta como si estuvieras persuadiendo a un cliente, claramente hablando del clima de cada uno de los paises y de por que deberian ir Gracias. :

              Puedes usar como referencia este
              Disfruta el cálido sol y playas de Ciudad, Pais. Explora la vibrante vida y arquitectura histórica de Ciudad, Pais. Reserva con Amadeus para una experiencia inolvidable en ambos destinos.

              Recuerda, que es importante que sea cierto si es calido o si es frio el lugar, encargate de determinarlo e innovar aun mas usando el mensaje de arriba como referencia.
`,
            },
          ],
        },
      ],
    };

    const url = `${this.apiUrl}?key=${this.apiKey}`;

    return this.http.post<IASuggestion>(url, body, { headers });
  }
  }


