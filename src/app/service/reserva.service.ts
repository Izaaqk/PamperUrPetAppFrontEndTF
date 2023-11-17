import { Injectable } from '@angular/core';
import { Reserva } from '../model/reserva';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private url = "http://localhost:8080/api/";

  constructor(private http: HttpClient) { }

  insert(reserva: Reserva) {
    return this.http.post(this.url + 'reserva', reserva);
  }
  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.url + "reservas");
  }
  getReserva(id_reser: number): Observable<Reserva> {
    const apiUrl = `${this.url}reservas/${id_reser}`;
    return this.http.get<Reserva>(apiUrl);
  }
  
  updateReserva(reser: Reserva, id_reser: number) {
    return this.http.put(`${this.url}reservaupdate/${id_reser}`, reser);
  }
  deleteReserva(id_reser: number) {
    id_reser = 5
    return this.http.delete(`${this.url}reservadelete/${id_reser}`);
  }
  listIdReserva(id_reser:number){
    return this.http.get<Reserva>(this.url+"reservas/"+id_reser);
  }
}