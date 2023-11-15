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
  getMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.url + "mascotas");
  }
  updateMascota(mas: Mascota, id_mas: number) {
    return this.http.put(`${this.url}mascotaupdate/${id_mas}`, mas);
  }
  deleteMascota(id_mas: number) {
    id_mas = 1
    return this.http.delete(`${this.url}mascotadelete/${id_mas}`);
  }
}
