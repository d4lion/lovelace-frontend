import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '@components/nav-bar/nav-bar.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, CommonModule, NavBarComponent],
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
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    userAcceptCookies: new FormControl(false, [Validators.requiredTrue]),
  });

  constructor(private router: Router) {

  }

  
  images: string[] = [
    'https://lovelace-amadeus.s3.us-east-1.amazonaws.com/user_images/avatar_1.png',
    'https://lovelace-amadeus.s3.us-east-1.amazonaws.com/user_images/avatar_2.png',
    'https://lovelace-amadeus.s3.us-east-1.amazonaws.com/user_images/avatar_3.png',
    'https://lovelace-amadeus.s3.us-east-1.amazonaws.com/user_images/avatar_4.png',
  ];
  
  selectedImage: string = this.images[0]; // Inicializamos con la primera imagen
  
  ngOnInit() {
    // Cargar la imagen seleccionada desde localStorage si está disponible
    const storedImage = localStorage.getItem('avatar');
    
    if (storedImage) {
      this.selectedImage = storedImage;
    } else {
      localStorage.setItem('avatar', this.selectedImage); // Guardar la imagen por defecto
    }

    const storedId = sessionStorage.getItem('id');

    if (storedId) {
      this.router.navigate(['/quiz']);
    }
  }
  
  onSubmit() {
    sessionStorage.setItem('id', this.userForm.value.id!);
    sessionStorage.setItem('email', this.userForm.value.email!);
    sessionStorage.setItem('name', this.userForm.value.nombre!);
    this.router.navigate(['/quiz'])
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
    console.log('Imagen seleccionada: ', image); // Solo para demostración
    localStorage.setItem('avatar', image); // Almacena en localStorage
  }
}