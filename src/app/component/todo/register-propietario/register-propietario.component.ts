import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Propietario } from 'src/app/model/propietario';
import { PropietarioService } from 'src/app/service/propietario.service';
import { AuthenticatorService } from 'src/app/service/authenticator.service';
import { HttpClient } from '@angular/common/http'; // Añade esta importación

@Component({
  selector: 'app-register-propietario',
  templateUrl: './register-propietario.component.html',
  styleUrls: ['./register-propietario.component.css']
})
export class RegisterPropietarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  propietario: Propietario = new Propietario();
  mensaje: string = '';
  idAdminSeleccionado: number = 2; // Asigna el valor que necesites

  constructor(
    private propietarioService: PropietarioService,
    private router: Router,
    private authenticatorService: AuthenticatorService,
    private http: HttpClient // Inyecta HttpClient
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      nombreapellido_prop: new FormControl('', [Validators.required]),
      telefono_prop: new FormControl('', [Validators.required]),
      correo_prop: new FormControl('', [Validators.required]),
      contraseña_prop: new FormControl(),
    });
  }

  aceptar() {
    this.propietario.nombreapellido_prop = this.form.value['nombreapellido_prop'];
    this.propietario.telefono_prop = this.form.value['telefono_prop'];
    this.propietario.correo_prop = this.form.value['correo_prop'];
    this.propietario.contraseña_prop = this.form.value['contraseña_prop'];

    if (this.form.valid) {
      // Crear un objeto que contenga los datos del propietario
      const propietarioData = {
        nombreapellido_prop: this.propietario.nombreapellido_prop,
        telefono_prop: this.propietario.telefono_prop,
        correo_prop: this.propietario.correo_prop,
        contraseña_prop: this.propietario.contraseña_prop
      };

      // Realizar la solicitud POST al punto final del backend
      this.http.post<any>(`http://localhost:8080/api/propietario/${this.idAdminSeleccionado}`, propietarioData)
        .subscribe((data) => {
          // Manejar la respuesta del servidor después de la inserción
          this.authenticatorService.login(this.propietario);
          this.router.navigate(['todos/bienvenida']);
        });
    } else {
      this.mensaje = 'Agregue campos omitidos';
    }
  }
}
