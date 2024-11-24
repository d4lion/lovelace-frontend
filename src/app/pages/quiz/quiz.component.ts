import { Component } from '@angular/core';
import type { Question, Option } from '../../../types/IQuiz';
import { NgFor, NgIf } from '@angular/common';
import { StepComponent } from '@components/step/step.component';
import { CardComponent } from '@components/card/card.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [NgFor, NgIf, StepComponent, CardComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent {
  questions: Question[] = [
    {
      questionText: '¿Que tipo de entorno prefieres para tus vacaciones?',
      key: 'climate',
      options: [
        {
          image:
            'https://lovelace-amadeus.s3.us-east-1.amazonaws.com/country_img/BoraBora.jpg',
          description: 'Playa',
        },
        {
          image: 'https://via.placeholder.com/150',
          description: 'Montaña',
        },
        {
          image: 'https://via.placeholder.com/150',
          description: 'Ciudad',
        },
      ],
    },
    {
      questionText:
        '¿Qué tipo de actividades prefieres hacer durante tus vacaciones?',
      key: 'activity',
      options: [
        {
          image: 'https://via.placeholder.com/150',
          description: 'Deportes y aventura',
        },
        {
          image: 'https://via.placeholder.com/150',
          description: 'Cultura y museos',
        },
        {
          image: 'https://via.placeholder.com/150',
          description: 'Relax y bienestar',
        },
      ],
    },
    {
      questionText:
        '¿Qué tipo de actividades prefieres hacer durante tus vacaciones?',
      key: 'newActivity2',
      options: [
        {
          image: 'https://via.placeholder.com/150',
          description: 'Deportes y aventura',
        },
        {
          image: 'https://via.placeholder.com/150',
          description: 'Cultura y museos',
        },
        {
          image: 'https://via.placeholder.com/150',
          description: 'Relax y bienestar',
        },
      ],
    },

  ];

  currentQuestionIndex = 0;

  selectOption(question: Question, option: Option) {
    question.selectedOption = option;
  }

  nextQuestion() {
    if (this.questions[this.currentQuestionIndex].selectedOption) {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      }
    } else {
      // Lógica para manejar el caso cuando no se ha seleccionado una respuesta
      alert('Por favor selecciona una respuesta antes de continuar.');
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  submitQuiz() {
    // Aquí envías las respuestas al backend

    const keys = this.questions.map((question) => question.key);
    const answers = this.questions.map(
      (question) => question.selectedOption?.description
    );

    // En este apartado se hace un mapeo de las respuestas para enviarlas al backend
    const combined = keys.reduce(
      (acc: { [key: string]: string | undefined }, key, index) => {
        acc[key] = answers[index];
        return acc;
      },
      {}
    );

    console.log('Respuestas:', combined);
  }

  /**
   * Determines if the given step index corresponds to the current question index.
   *
   * @param index - The index of the step to check.
   * @returns A boolean indicating whether the step is active (true) or not (false).
   */
  isStepActive(index: number): boolean {
    return index === this.currentQuestionIndex;
  }

  /**
   * Determina si un paso (pregunta) dado en el quiz está completado.
   *
   * @param index - El índice del paso (pregunta) a verificar.
   * @returns `true` si el paso está completado (es decir, su índice es menor que el índice de la pregunta actual), de lo contrario `false`.
   */
  isStepCompleted(index: number): boolean {
    return index < this.currentQuestionIndex;
  }
}
