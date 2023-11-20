import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Propietario } from 'src/app/model/propietario';
import { PropietarioService } from 'src/app/service/propietario.service';
import { Admin } from 'src/app/model/admin';
import { AuthenticatorService } from 'src/app/service/authenticator.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-pantalla',
  templateUrl: './login-pantalla.component.html',
  styleUrls: ['./login-pantalla.component.css']
})
export class LoginPantallaComponent implements OnInit {
  loginForm: FormGroup;
  mensaje: string = '';
  admin: Admin = new Admin();

  constructor(
    private propietarioService: PropietarioService,
    private authenticatorService: AuthenticatorService,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = new FormGroup({
      correo_prop: new FormControl('', [Validators.required]),
      contraseña_prop: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    const usuarioAutenticado = this.authenticatorService.getAuthenticatedUser();
    if (usuarioAutenticado) {
      this.router.navigate(['todos/bienvenida']);
    } else {
      // Verifica si hay credenciales guardadas
      const correoGuardado = localStorage.getItem('correoGuardado');
      const contrasenaGuardada = localStorage.getItem('contrasenaGuardada');
         
      if (correoGuardado && contrasenaGuardada) {
        // Rellena el formulario con las credenciales guardadas
        this.loginForm.setValue({
          correo_prop: correoGuardado,
          contraseña_prop: contrasenaGuardada,
        });
      }
    }
  }

  iniciarSesion() {
    if (this.loginForm.valid) {
      const correo = this.loginForm.value.correo_prop;
      const contrasena = this.loginForm.value.contraseña_prop;

      // Lógica para verificar las credenciales en el servidor (cambia esto por tu propia lógica)
      const apiUrl = 'http://18.216.74.240:8080/api/login';
      const credentials = { correo_prop: correo, contraseña_prop: contrasena };

      this.http.post<Propietario>(apiUrl, credentials).subscribe(
        (propietario) => {
          if (propietario) {
            const nombrePropietario = propietario.nombreapellido_prop;
            const telefonoPropietario = propietario.telefono_prop;
            const correoPropietario = propietario.correo_prop;
            // Las credenciales son válidas, autenticar al usuario
            this.propietarioService.setNombrePropietario(nombrePropietario);
            this.propietarioService.setTelefonoPropietario(telefonoPropietario);
            this.propietarioService.setCorreoPropietario(correoPropietario);
            this.authenticatorService.login(propietario);
            this.router.navigate(['todos/bienvenida']);
          } else {
            // Las credenciales son inválidas, muestra un mensaje de error
            this.mensaje = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
          }
        },
        () => {
          // Ocurrió un error durante la autenticación, muestra un mensaje de error
          this.mensaje = 'Se produjo un error durante la autenticación. Por favor, inténtalo de nuevo.';
        }
      );
    }
  }

  ingresarComoAdmin() {
    // Realizar la solicitud POST para registrar un nuevo administrador
    this.http.post<any>(`http://18.216.74.240:8080/api/admin`, {})
      .subscribe((data) => {
        // Manejar la respuesta del servidor después de la inserción
        this.router.navigate(['todos/modificaradmin']);
      });
  }
}
