import { Injectable } from '@angular/core';
import { Membresia } from '../model/membresia';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
const base_url = enviroment.base
@Injectable({
  providedIn: 'root'
})
export class MembresiaService {
  private url = `${base_url}` 

  constructor(private http: HttpClient) { }

  insert(membresia: Membresia) {
    return this.http.post(this.url + 'membresia', membresia);
  }
  getImages(): Observable<Membresia[]> {
    return this.http.get<Membresia[]>(this.url + "membresias");
  }
}
