import { Injectable } from '@angular/core';
import { Propietario } from '../model/propietario';
import { Paseador } from '../model/paseador';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
const base_url = enviroment.base

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {
  private authenticatedUser: BehaviorSubject<Propietario | null> = new BehaviorSubject<Propietario | null>(null);

  constructor(private http: HttpClient) {}

  login(credentials: { correo_prop: string; contraseña_prop: number }) {
    const apiUrl = `${base_url}`  // Asegúrate de que la ruta sea la correcta

    // Realiza la lógica de autenticación aquí, verifica las credenciales en el servidor.
    this.http.post<Propietario>(apiUrl, credentials).subscribe(
      (propietario) => {
        if (propietario) {
          // Las credenciales son válidas, autenticar al usuario.
          this.authenticatedUser.next(propietario);
        } else {
          // Las credenciales son inválidas, muestra un mensaje de error.
          this.authenticatedUser.next(null);
        }
      },
      () => {
        // Ocurrió un error durante la autenticación, muestra un mensaje de error.
        this.authenticatedUser.next(null);
      }
    );
  }

  
  

  logout() {
    // Implementa la lógica para cerrar la sesión aquí.
    this.authenticatedUser.next(null);
  }

  getAuthenticatedUserObservable() {
    return this.authenticatedUser.asObservable();
  }

  getAuthenticatedUser() {
    return this.authenticatedUser.getValue();
  }
}
