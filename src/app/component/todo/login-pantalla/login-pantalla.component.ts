import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Propietario } from 'src/app/model/propietario';
import { Admin } from 'src/app/model/admin';
import { PropietarioService } from 'src/app/service/propietario.service';
import { AuthenticatorService } from 'src/app/service/authenticator.service';
import { AdminService } from 'src/app/service/admin.service';
import { HttpClient } from '@angular/common/http'; // Añade esta importación

@Component({
  selector: 'app-login-pantalla',
  templateUrl: './login-pantalla.component.html',
  styleUrls: ['./login-pantalla.component.css']
})
export class LoginPantallaComponent implements OnInit {
  admin: Admin = new Admin();
  loginForm: FormGroup;
  mensaje: string = '';
  id_admin: number = 0;

  constructor(
    private adminService: AdminService,
    private authenticatorService: AuthenticatorService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient // Inyecta HttpClient
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
    }
  }

  aceptarAdmin() {
    // Lógica para insertar automáticamente un ID de administrador en la base de datos
    const adminId = this.generarIdUnico(); // Debes implementar tu propia lógica para generar un ID único

    // Crear un objeto que contenga los datos del administrador
    const adminData = {
      id_admin: adminId
    };

    // Realizar la solicitud POST al punto final del backend para registrar al administrador
    this.http.post<any>(`http://localhost:8080/api/admin`, adminData)
      .subscribe((data) => {
        // Manejar respuesta después de la inserción, si es necesario
        this.router.navigate(['todos/modificaradmin']); // Cambia 'otros/mockup' por la ruta de tu otro mockup
      });
  }

  // Método para generar un ID de administrador único (puedes personalizarlo según tus necesidades)
  generarIdUnico(): number {
    return Math.floor(Math.random() * 1000); // Ejemplo de generación de ID aleatorio
  }

  iniciarSesion() {
    if (this.loginForm.valid) {
      const correo = this.loginForm.value.correo_prop;
      const contraseña = this.loginForm.value.contraseña_prop;

      // Llamar al método de inicio de sesión del servicio AuthenticatorService
      this.authenticatorService.login({ correo_prop: correo, contraseña_prop: contraseña });

      // Suscribirse al Observable para obtener el usuario autenticado
      this.authenticatorService.getAuthenticatedUserObservable().subscribe((usuarioAutenticado) => {
        if (usuarioAutenticado) {
          // Iniciar sesión exitosa, puedes redirigir a la página de inicio.
          this.router.navigate(['todos/bienvenida']);
        } else {
          // Las credenciales son inválidas, muestra un mensaje de error.
          this.mensaje = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
        }
      });
    }
  }
}
