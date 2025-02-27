import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CreateUserService } from '@services/user/create-user.service';
import { ICreateUserData } from '@type/IUser';
import { environment } from 'src/env/prod.env';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    id: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.minLength(8),
      Validators.maxLength(12),
    ]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
    userAcceptCookies: new FormControl(false, [Validators.requiredTrue]),
  });

  constructor(
    private router: Router,
    private createUserService: CreateUserService
  ) {}

  images: Array<string> = environment.user_images

  selectedImage: string = this.images[0]; // Inicializamos con la primera imagen

  ngOnInit() {
    // Cargar la imagen seleccionada desde localStorage si está disponible
    const storedImage: string = localStorage.getItem('avatar')!;

    if (storedImage) {
      this.selectedImage = this.images[parseInt(storedImage)]; // Cargar la imagen guardada
    } else {
      localStorage.setItem(
        'avatar',
        `${this.images.indexOf(this.selectedImage)}`
      ); // Guardar la imagen por defecto
    }

    const storedId = sessionStorage.getItem('id');

    if (storedId) {
      this.router.navigate(['/quiz']);
    }
  }

  getCleanData(): ICreateUserData {
    const userFullName: string = this.userForm.value.nombre!;

    if (userFullName.split(' ').length > 1) {
      const [name, lastName] = userFullName.split(' ');
      return {
        id: this.userForm.value.id!,
        name,
        lastName,
        email: this.userForm.value.email!,
      };
    }

    return {
      id: this.userForm.value.id!,
      name: userFullName,
      lastName: null,
      email: this.userForm.value.email!,
    };
  }

  setSessionData(response: any) {
    sessionStorage.setItem('id', this.userForm.value.id!);
    sessionStorage.setItem('email', this.userForm.value.email!);
    sessionStorage.setItem('name', this.userForm.value.nombre!);

    if (response.error) {
      sessionStorage.setItem('isNewUser', 'false');
    } else {
      sessionStorage.setItem('isNewUser', 'true');
    }
  }

  onSubmit() {
    const cleanUserData: ICreateUserData = this.getCleanData();

    this.createUserService.createUser(cleanUserData).subscribe({
      next: (response) => {
        this.setSessionData(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.router.navigate(['/quiz']);
      },
    });

    //this.router.navigate(['/quiz'])
  }

  // Función para ir a la siguiente imagen
  nextImage() {
    const currentIndex = this.images.indexOf(this.selectedImage);
    const nextIndex = (currentIndex + 1) % this.images.length; // Cicla al inicio
    this.selectedImage = this.images[nextIndex];
    this.saveSelectedImage(this.selectedImage); // Guardar la imagen seleccionada
  }

  // Función para ir a la imagen anterior
  previousImage() {
    const currentIndex = this.images.indexOf(this.selectedImage);
    const prevIndex =
      (currentIndex - 1 + this.images.length) % this.images.length; // Cicla al final
    this.selectedImage = this.images[prevIndex];
    this.saveSelectedImage(this.selectedImage); // Guardar la imagen seleccionada
  }

  // Función para seleccionar una imagen en el carrusel y guardarla
  selectImage(image: string) {
    this.selectedImage = image;
    this.saveSelectedImage(image); // Guardar la imagen seleccionada
  }

  // Esta función simula el guardado de la URL seleccionada
  saveSelectedImage(image: string) {
    localStorage.setItem('avatar', `${this.images.indexOf(image)}`); // Almacena en localStorage
  }
}
