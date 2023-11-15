// register-propietario.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Propietario } from 'src/app/model/propietario';
import { PropietarioService } from 'src/app/service/propietario.service';
import { Paseador } from 'src/app/model/paseador';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { PaseadorService } from 'src/app/service/paseador.service';
import { AuthenticatorService } from 'src/app/service/authenticator.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-propietario',
  templateUrl: './register-propietario.component.html',
  styleUrls: ['./register-propietario.component.css']
})
export class RegisterPropietarioComponent implements OnInit {
  imagenSeleccionada: File | undefined;
  form: FormGroup = new FormGroup({});
  propietario: Propietario = new Propietario();
  mensaje: string = '';

  constructor(
    private propietarioService: PropietarioService,
    private paseadorService: PaseadorService,
    private router: Router,
    private authenticatorService: AuthenticatorService,
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombreapellido_prop: new FormControl('', [Validators.required]),
      telefono_prop: new FormControl('', [Validators.required]),
      correo_prop: new FormControl('', [Validators.required]),
      contraseña_prop: new FormControl(),
      rol: new FormControl('propietario'), // Valor predeterminado a "propietario"
      idAdminSeleccionado: this.form.value['idAdminSeleccionado'],
      idMembresiaSeleccionado: this.form.value['idMembresiaSeleccionado']
      
    });

    this.sharedDataService.imagenSeleccionada$.subscribe((imagen) => {
      this.imagenSeleccionada = imagen !== null ? imagen : undefined;
    });
  }

  aceptar() {
    const rol = this.form.get('rol')?.value;

    if (rol === 'propietario') {
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
          contraseña_prop: this.propietario.contraseña_prop,
          rol: 'propietario', // Establece el rol como "propietario"
          idAdminSeleccionado: this.form.value['idAdminSeleccionado'],
          idMembresiaSeleccionado: this.form.value['idMembresiaSeleccionado']
        };

        // Realizar la solicitud POST al punto final del backend para registrar al propietario
        this.http.post<any>(`http://localhost:8080/api/propietario/${this.form.value['idAdminSeleccionado']}/${this.form.value['idMembresiaSeleccionado']}`, propietarioData)
          .subscribe((data) => {
            // Manejar la respuesta del servidor después de la inserción
            const nombrePropietario = data.nombreapellido_prop;
            const telefonoPropietario = data.telefono_prop;
            const correoPropietario = data.correo_prop;
            this.sharedDataService.setImagenSeleccionada(correoPropietario, this.imagenSeleccionada);


            // Guardar las credenciales del propietario en variables locales
            localStorage.setItem('correoGuardado', this.propietario.correo_prop);
            localStorage.setItem('contrasenaGuardada', this.propietario.contraseña_prop.toString());
            this.propietarioService.setNombrePropietario(nombrePropietario);
            this.propietarioService.setTelefonoPropietario(telefonoPropietario);
            this.propietarioService.setCorreoPropietario(correoPropietario);

            this.authenticatorService.login(this.propietario);
            this.router.navigate(['todos/bienvenida']);
          });
      } else {
        this.mensaje = 'Agregue campos omitidos';
      }
    } else if (rol === 'paseador') {
      // Registro del paseador usando los campos del formulario actual
      this.propietario.nombreapellido_prop = this.form.value['nombreapellido_prop'];
      this.propietario.telefono_prop = this.form.value['telefono_prop'];
      this.propietario.correo_prop = this.form.value['correo_prop'];
      this.propietario.contraseña_prop = this.form.value['contraseña_prop'];

      if (this.form.valid) {
        // Crear un objeto que contenga los datos del paseador
        const paseadorData = {
          nombreapellido_pas: this.propietario.nombreapellido_prop, // Usar los campos del propietario
          telefono_pas: this.propietario.telefono_prop,
          correo_pas: this.propietario.correo_prop,
          contraseña_pas: this.propietario.contraseña_prop,
          rol: 'paseador' // Establece el rol como "paseador"
        };

        // Realizar la solicitud POST al punto final del backend para registrar al paseador
        this.http.post<any>(`http://localhost:8080/api/paseador/${this.form.value['idAdminSeleccionado']}`, paseadorData)
          .subscribe((data) => {
            // Manejar la respuesta del servidor después de la inserción del paseador
            const nombrePaseador = data.nombreapellido_pas;
            const telefonoPaseador= data.telefono_pas;
            const correoPaseador = data.correo_pas;
            this.sharedDataService.setImagenSeleccionada1(correoPaseador, this.imagenSeleccionada);

            // Redirige a la página de bienvenida después del registro del paseador
            this.paseadorService.setNombrePaseador(nombrePaseador);
            this.paseadorService.setTelefonoPaseador(telefonoPaseador);
            this.paseadorService.setCorreoPaseador(correoPaseador);
            this.router.navigate(['todos/getpaseador']);
          });
      } else {
        this.mensaje = 'Agregue campos omitidos';
      }
    } else {
      this.mensaje = 'Selecciona un rol válido';
    }
  }
}
