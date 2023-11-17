// modificar-admin.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PropietarioService } from 'src/app/service/propietario.service';
import { PaseadorService } from 'src/app/service/paseador.service';
import { MascotaService } from 'src/app/service/mascota.service';
import { Propietario } from 'src/app/model/propietario';
import { Paseador } from 'src/app/model/paseador';
import { Mascota } from 'src/app/model/mascota';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modificar-admin',
  templateUrl: './modificar-admin.component.html',
  styleUrls: ['./modificar-admin.component.css']
})
export class ModificarAdminComponent implements OnInit {
  propietarioForm: FormGroup = new FormGroup({});
  paseadorForm: FormGroup = new FormGroup({});
  mascotaForm: FormGroup = new FormGroup({});
  propietario: Propietario = new Propietario();
  paseador: Paseador = new Paseador();
  mascota: Mascota = new Mascota();
  mensaje: string = '';
  form: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propietarioService: PropietarioService,
    private paseadorService: PaseadorService,
    private mascotaService: MascotaService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombreapellido_prop: new FormControl('', [Validators.required]),
      telefono_prop: new FormControl('', [Validators.required]),
      correo_prop: new FormControl('', [Validators.required]),
      idPropietarioSeleccionado: this.form.value['idPropietarioSeleccionado']
    });

    this.form = this.formBuilder.group({
      nombreapellido_pas: new FormControl('', [Validators.required]),
      telefono_pas: new FormControl('', [Validators.required]),
      correo_pas: new FormControl('', [Validators.required]),
      idPaseadorSeleccionado: this.form.value['idPaseadorSeleccionado']
    });

    this.form = this.formBuilder.group({
      nombre_mas: new FormControl('', [Validators.required]),
      raza_mas: new FormControl('', [Validators.required]),
      edad_mas: new FormControl(),
      idMascotaSeleccionado: this.form.value['idMascotaSeleccionado']
    });
  }

  updatePropietario() {
    this.propietario.nombreapellido_prop = this.propietarioForm.value['nombreapellido_prop'];
    this.propietario.telefono_prop = this.propietarioForm.value['telefono_prop'];
    this.propietario.correo_prop = this.propietarioForm.value['correo_prop'];

    const contraseña = this.propietarioForm.value['contraseña_prop'];

    if (contraseña) {
      // La contraseña está presente, incluirla en los datos
      this.propietario.contraseña_prop = contraseña;
    }

    if (this.propietarioForm.valid) {
      const propietarioData = {
        nombreapellido_prop: this.propietario.nombreapellido_prop,
        telefono_prop: this.propietario.telefono_prop,
        correo_prop: this.propietario.correo_prop,
        contraseña_prop: this.propietario.contraseña_prop,
        idPropietarioSeleccionado: this.form.value['idPropietarioSeleccionado']
      };

      // Realizar la solicitud POST para registrar la mascota junto con los IDs del administrador y el propietario
      this.http.put<any>(`http://13.59.192.42:8080/api/propietarioupdate/${this.form.value['idPropietarioSeleccionado']}`, propietarioData)
        .subscribe((data) => {
          // Manejar la respuesta del servidor después de la inserción
          this.router.navigate(['todos/modificaradmin']);
        });
    } else {
      this.mensaje = 'Agregue campos omitidos';
    }
  }


  updatePaseador() {
    this.paseador.nombreapellido_pas = this.paseadorForm.value['nombreapellido_pas'];
    this.paseador.telefono_pas = this.paseadorForm.value['telefono_pas'];
    this.paseador.correo_pas = this.paseadorForm.value['correo_pas'];

    const contraseña = this.paseadorForm.value['contraseña_pas'];

    if (contraseña) {
      // La contraseña está presente, incluirla en los datos
      this.paseador.contraseña_pas = contraseña;
    }

    if (this.paseadorForm.valid) {
      const paseadorData = {
        nombreapellido_pas: this.paseador.nombreapellido_pas,
        telefono_pas: this.paseador.telefono_pas,
        correo_pas: this.paseador.correo_pas,
        contraseña_pas: this.paseador.contraseña_pas,
        idPaseadorSeleccionado: this.form.value['idPaseadorSeleccionado']
      };

      // Realizar la solicitud POST para registrar la mascota junto con los IDs del administrador y el propietario
      this.http.put<any>(`http://13.59.192.42:8080/api/paseadorupdate/${this.form.value['idPaseadorSeleccionado']}`, paseadorData)
        .subscribe((data) => {
          // Manejar la respuesta del servidor después de la inserción
          this.router.navigate(['todos/modificaradmin']);
        });
    } else {
      this.mensaje = 'Agregue campos omitidos';
    }
  }

  updateMascota() {
    this.mascota.nombre_mas = this.mascotaForm.value['nombre_mas'];
    this.mascota.raza_mas = this.mascotaForm.value['raza_mas'];
    this.mascota.edad_mas = this.mascotaForm.value['edad_mas'];

    if (this.mascotaForm.valid) {
      const mascotaData = {
        nombre_mas: this.mascota.nombre_mas,
        raza_mas: this.mascota.raza_mas,
        edad_mas: this.mascota.edad_mas,
        idMascotaSeleccionado: this.form.value['idMascotaSeleccionado']
      };

      // Realizar la solicitud POST para registrar la mascota junto con los IDs del administrador y el propietario
      this.http.put<any>(`http://13.59.192.42:8080/api/mascotaupdate/${this.form.value['idMascotaSeleccionado']}`, mascotaData)
        .subscribe((data) => {
          // Manejar la respuesta del servidor después de la inserción
          this.router.navigate(['todos/modificaradmin']);
        });
    } else {
      this.mensaje = 'Agregue campos omitidos';
    }
  }
}
