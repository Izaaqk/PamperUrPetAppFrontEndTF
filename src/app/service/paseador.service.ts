import { Injectable } from '@angular/core';
import { Paseador } from '../model/paseador';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaseadorService {
  private url = "http://localhost:8080/api/";
  private nombrePaseadorSource = new BehaviorSubject<string>('');
  nombrePaseador$ = this.nombrePaseadorSource.asObservable();
  private telefonoPaseadorSource = new BehaviorSubject<string>('');
  telefonoPaseador$ = this.telefonoPaseadorSource.asObservable();
  private correoPaseadorSource = new BehaviorSubject<string>('');
  correoPaseador$ = this.correoPaseadorSource.asObservable();
  private listaCambio = new Subject<Paseador[]>();

  constructor(private http: HttpClient) { }

  setNombrePaseador(nombre: string) {
    this.nombrePaseadorSource.next(nombre);
  }
  setTelefonoPaseador(telefono: string) {
    this.telefonoPaseadorSource.next(telefono);
  }
  setCorreoPaseador(correo: string) {
    this.correoPaseadorSource.next(correo);
  }

  insert(paseador: Paseador) {
    return this.http.post(this.url + 'paseador', paseador);
  }
  getPaseadores(): Observable<Paseador[]> {
    return this.http.get<Paseador[]>(this.url + "paseadores");
  }
  setList(listaNueva : Paseador[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }
}
