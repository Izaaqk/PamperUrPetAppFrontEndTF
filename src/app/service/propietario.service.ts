import { Injectable } from '@angular/core';
import { Propietario } from '../model/propietario';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
const base_url = enviroment.base
@Injectable({
  providedIn: 'root'
})
export class PropietarioService {
  private url = `${base_url}` 
  private nombrePropietarioSource = new BehaviorSubject<string>('');
  nombrePropietario$ = this.nombrePropietarioSource.asObservable();
  private telefonoPropietarioSource = new BehaviorSubject<string>('');
  telefonoPropietario$ = this.telefonoPropietarioSource.asObservable();
  private correoPropietarioSource = new BehaviorSubject<string>('');
  correoPropietario$ = this.correoPropietarioSource.asObservable();
  private listaCambio = new Subject<Propietario[]>();

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
  setList(listaNueva : Propietario[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }
}
