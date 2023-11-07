import { Injectable } from '@angular/core';
import { Propietario } from '../model/propietario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {
  private url = "http://localhost:8080/api/";

  constructor(private http: HttpClient) { }

  insert(propietario: Propietario) {
    return this.http.post(this.url + 'propietario', propietario);
  }
  getPropietarios(): Observable<Propietario[]> {
    return this.http.get<Propietario[]>(this.url + "propietarios");
  }
}
