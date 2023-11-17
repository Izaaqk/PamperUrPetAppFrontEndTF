import { Injectable } from '@angular/core';
import { Admin } from '../model/admin';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
const base_url = enviroment.base
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = `${base_url}` 

  constructor(private http: HttpClient) { }

  insert(admin: Admin) {
    return this.http.post(this.url + 'admin', admin);
  }
}
