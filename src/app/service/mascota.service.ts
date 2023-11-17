import { Injectable } from '@angular/core';
import { Mascota } from '../model/mascota';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
const base_url = enviroment.base
@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private url = `${base_url}` 
  private listaCambio = new Subject<Mascota[]>();

  constructor(private http: HttpClient) { }

  insert(mascota: Mascota) {
    return this.http.post(this.url + 'mascota', mascota);
  }
  getMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.url + "mascotas");
  }
  getMascota(id_mas: number): Observable<Mascota> {
    const apiUrl = `${this.url}mascotas/${id_mas}`;
    return this.http.get<Mascota>(apiUrl);
  }
  updateMascota(mas: Mascota, id_mas: number) {
    return this.http.put(`${this.url}mascotaupdate/${id_mas}`, mas);
  }
  deleteMascota(id_mas: number) {
    id_mas = 1
    return this.http.delete(`${this.url}mascotadelete/${id_mas}`);
  }
  setList(listaNueva : Mascota[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }
}
