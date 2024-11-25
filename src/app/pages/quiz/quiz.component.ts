import { Component } from '@angular/core';
import { Question, Option, IBackendData } from '@type/IQuiz';

import { CommonModule} from '@angular/common';
import { StepComponent } from '@components/step/step.component';
import { CardComponent } from '@components/card/card.component';
import { AnswersService } from '@services/data/answers.service';
import { Router } from '@angular/router';


interface IAnswers {
  [key: string]: string | undefined;
}


@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, StepComponent, CardComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent {
  questions: Question[] = [];

  isDialogOpen = false;
  userAnswers: IAnswers[] = [];
  currentQuestionIndex = 0;
  userId = sessionStorage.getItem('id');

  constructor(private answerService: AnswersService, private router: Router) {}

  ngOnInit(): void {
    this.answerService.getAnswers().subscribe({
      next: (data) => {
        this.questions = data;
      },
    });
  }

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

  answersMapperToJsonTypeForFrontend(): IAnswers {
    const keys = this.questions.map((question) => question.key);
    const answers = this.questions.map(
      (question) => question.selectedOption?.description
    );

    // En este apartado se hace un mapeo de las respuestas para enviarlas al backend
    const combined: IAnswers = keys.reduce((acc: IAnswers, key, index) => {
      acc[key] = answers[index];
      return acc;
    }, {} as IAnswers);

    return combined;
  }

  answersMapperToJsonTypeForBackend(entryData: IAnswers): IBackendData {
    return JSON.parse(
      JSON.stringify({
        user_id: this.userId!,
        climate: entryData['climate']!,
        activity: entryData['activity']!,
        housing: entryData['housing']!,
        duration: entryData['duration']!,
        age: entryData['age']!,
      })
    );
  }

  submitQuiz(sendData: boolean = true) {
    const combined = this.answersMapperToJsonTypeForFrontend();

    this.userAnswers.push(combined);

    // Aqui es donde podemos enviar todos los datos al backend
    if (sendData) {
      // Esto es un parseo muy heavy pero me dio pereza ver si se puede hacer de otra forma igual funciona
      const data: IBackendData = this.answersMapperToJsonTypeForBackend(combined)

      // TODO: Aquí se pueden usar los servicios y redireccionadores para enviar los datos al backend y redirigir al usuario a la siguiente página
      this.answerService.sendAnswersToGetSuggestion(data).subscribe({
        next: (data) => {
          console.log(data);
        },
        complete: () => {
          this.router.navigate(['/suggestion']);
        },
      });
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
