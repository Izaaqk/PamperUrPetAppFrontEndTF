import { Injectable } from '@angular/core';
import { Admin } from '../model/admin';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = "http://localhost:8080/api/";

  constructor(private http: HttpClient) { }

  insert(admin: Admin) {
    return this.http.post(this.url + 'admin', admin);
  }
}
