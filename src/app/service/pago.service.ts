import { Injectable } from '@angular/core';
import { Pago } from '../model/pago';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private url = "http://localhost:8080/api/";

  constructor(private http: HttpClient) { }

  insert(pago: Pago) {
    return this.http.post(this.url + 'pago', pago);
  }
}
