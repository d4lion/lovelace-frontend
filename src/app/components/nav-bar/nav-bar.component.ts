import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLinkActive, RouterLink } from '@angular/router';
import { environment } from 'src/env/prod.env';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  isDropdownUserMenuOpen = false;
  isUserLoggedIn = false;

  userName = '';
  userId = '';
  userEmail = '';
  userAvatar = '';

  constructor(private router: Router) {}

  startGame() {
    this.router.navigate(['/profile']);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkIfUserWasLoggedIn();
      }
    });
  }

  setAllUserData() {
    this.userName = sessionStorage.getItem('name')!;
    this.userId = sessionStorage.getItem('id')!;
    this.userEmail = sessionStorage.getItem('email')!;
    this.userAvatar =
      environment.user_images[parseInt(localStorage.getItem('avatar')!)];
  }

  checkIfUserWasLoggedIn() {
    const userId = sessionStorage.getItem('id');

    if (userId) {
      this.isUserLoggedIn = true;
      this.setAllUserData();
    }
  }

  sigOutUser() {
    sessionStorage.clear();
    this.isUserLoggedIn = false;
    this.router.navigate(['/']);
  }

  handleDropdownUserMenu() {
    this.isDropdownUserMenuOpen = !this.isDropdownUserMenuOpen;
  }
}
