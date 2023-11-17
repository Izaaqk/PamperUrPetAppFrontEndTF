import { Injectable } from '@angular/core';
import { Pago } from '../model/pago';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
const base_url = enviroment.base
@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private url = `${base_url}` 

  constructor(private http: HttpClient) { }

  insert(pago: Pago) {
    return this.http.post(this.url + 'pago', pago);
  }
}
