import { Injectable } from '@angular/core';
import { Propietario } from '../model/propietario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {
  private url = "http://localhost:8080/api/";
  private nombrePropietarioSource = new BehaviorSubject<string>('');
  nombrePropietario$ = this.nombrePropietarioSource.asObservable();
  private telefonoPropietarioSource = new BehaviorSubject<string>('');
  telefonoPropietario$ = this.telefonoPropietarioSource.asObservable();
  private correoPropietarioSource = new BehaviorSubject<string>('');
  correoPropietario$ = this.correoPropietarioSource.asObservable();

  constructor(private http: HttpClient) { }

  setNombrePropietario(nombre: string) {
    this.nombrePropietarioSource.next(nombre);
  }
  setTelefonoPropietario(telefono: string) {
    this.telefonoPropietarioSource.next(telefono);
  }
  setCorreoPropietario(correo: string) {
    this.correoPropietarioSource.next(correo);
  }
  deletePropietario(propietarioid: number) {
    propietarioid = 8
    return this.http.delete(`${this.url}propietariodelete/${propietarioid}`);
  }
  insert(propietario: Propietario) {
    return this.http.post(this.url + 'propietario', propietario);
  }
  getPropietarios(): Observable<Propietario[]> {
    return this.http.get<Propietario[]>(this.url + "propietarios");
  }
}
