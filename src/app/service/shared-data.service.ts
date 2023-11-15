import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private imagenesSeleccionadas: Map<string, File | undefined> = new Map();

  private imagenSeleccionadaSource = new BehaviorSubject<File | undefined>(undefined);
  imagenSeleccionada$ = this.imagenSeleccionadaSource.asObservable();

  private imagenesSeleccionadas2: Map<string, File | undefined> = new Map();

  private imagenSeleccionadaSource2 = new BehaviorSubject<File | undefined>(undefined);
  imagenSeleccionada$2 = this.imagenSeleccionadaSource2.asObservable();

  constructor() {}

  setImagenSeleccionada(correoPropietario: string, imagen: File | undefined) {
    this.imagenesSeleccionadas.set(correoPropietario, imagen);
    this.imagenSeleccionadaSource.next(imagen);
  }

  getImagenSeleccionada(correoPropietario: string): File | undefined {
    return this.imagenesSeleccionadas.get(correoPropietario);
  }

  
  setImagenSeleccionada1(correoPaseador: string, imagen: File | undefined) {
    this.imagenesSeleccionadas2.set(correoPaseador, imagen);
    this.imagenSeleccionadaSource2.next(imagen);
  }

  getImagenSeleccionada1(correoPaseador: string): File | undefined {
    return this.imagenesSeleccionadas2.get(correoPaseador);
  }
}
