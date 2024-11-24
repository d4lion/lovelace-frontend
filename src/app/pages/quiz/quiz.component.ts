import { Component } from '@angular/core';
import { Question, Option } from '@type/IQuiz';

interface IAnswers {
  [key: string]: string | undefined;
}
import { CommonModule} from '@angular/common';

import { StepComponent } from '@components/step/step.component';
import { CardComponent } from '@components/card/card.component';
import { DialogComponent } from '@components/dialog/dialog.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, StepComponent, CardComponent, DialogComponent],
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
          image: '',
          description: 'Montaña',
        },
        {
          image: '',
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
          image: '',
          description: 'Deportes y aventura',
        },
        {
          image: '',
          description: 'Cultura y museos',
        },
        {
          image: '',
          description: 'Relax y bienestar',
        },
      ],
    },
    {
      questionText:
        '¿Qué tipo de actividades prefieres hacer durante tus vacaciones?',
      key: 'housing',
      options: [
        {
          image: '',
          description: 'Deportes y aventura',
        },
        {
          image: '',
          description: 'Cultura y museos',
        },
        {
          image: '',
          description: 'Relax y bienestar',
        },
      ],
    },
    {
      questionText:
        '¿Qué tipo de actividades prefieres hacer durante tus vacaciones?',
      key: 'duration',
      options: [
        {
          image: '',
          description: 'Deportes y aventura',
        },
        {
          image: '',
          description: 'Cultura y museos',
        },
        {
          image: '',
          description: 'Relax y bienestar',
        },
      ],
    },
    {
      questionText:
        '¿Qué tipo de actividades prefieres hacer durante tus vacaciones?',
      key: 'age',
      options: [
        {
          image: '',
          description: 'Deportes y aventura',
        },
        {
          image: '',
          description: 'Cultura y museos',
        },
        {
          image: '',
          description: 'Relax y bienestar',
        },
      ],
    },
  ];

  isDialogOpen = false;
  userAnswers: IAnswers[] = [];
  currentQuestionIndex = 0;

  dialogHandler() {
    console.log(this.isDialogOpen);
    this.isDialogOpen = !this.isDialogOpen;
    this.preSubmitQuiz();
  }

  handleCancelButtonDialog() {
    this.dialogHandler();
    this.userAnswers = [];
  }

  handleSuccessButtonDialog() {
    this.dialogHandler();
    this.submitQuiz();
  }

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

  preSubmitQuiz() {
    this.submitQuiz(false);
  }

  submitQuiz(sendData: boolean = true) {
    // Aquí envías las respuestas al backend

    const keys = this.questions.map((question) => question.key);
    const answers = this.questions.map(
      (question) => question.selectedOption?.description
    );

    // En este apartado se hace un mapeo de las respuestas para enviarlas al backend
    const combined: IAnswers = keys.reduce((acc: IAnswers, key, index) => {
      acc[key] = answers[index];
      return acc;
    }, {} as IAnswers);

    this.userAnswers.push(combined);

    // Aqui es donde podemos enviar todos los datos al backend
    if (sendData) {
      console.log(this.userAnswers);
    }
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
