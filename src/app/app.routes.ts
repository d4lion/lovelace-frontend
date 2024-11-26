import { Routes } from '@angular/router';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { userSessionGuard } from '@guards/user-session.guard';
import { HomeComponent } from './pages/home/home.component';
import { SuggestionComponent } from './pages/suggestion/suggestion.component';
import { SuggestionHistoryComponent } from './pages/suggestion-history/suggestion-history.component';

export const routes: Routes = [
    {path: 'quiz', component: QuizComponent, canActivate: [userSessionGuard]},
    { path: 'profile', component: ProfileComponent },
    { path: '', component: HomeComponent },
    { path: 'suggestion', component: SuggestionComponent, canActivate: [userSessionGuard] },
    {path: 'suggestion/history', component: SuggestionHistoryComponent, canActivate: [userSessionGuard]},
];

