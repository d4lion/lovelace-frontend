import { Routes } from '@angular/router';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {path: 'quiz', component: QuizComponent},
    {path: 'profile', component: ProfileComponent}
];

