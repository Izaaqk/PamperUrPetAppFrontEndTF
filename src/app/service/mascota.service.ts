import { Injectable } from '@angular/core';
import { Mascota } from '../model/mascota';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private url = "http://localhost:8080/api/";

  constructor(private http: HttpClient) { }

  insert(mascota: Mascota) {
    return this.http.post(this.url + 'mascota', mascota);
  }
  getImages(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.url + "mascotas");
  }
}
