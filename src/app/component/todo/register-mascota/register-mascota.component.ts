import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/model/mascota';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-mascota',
  templateUrl: './register-mascota.component.html',
  styleUrls: ['./register-mascota.component.css']
})
export class RegisterMascotaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  mascota: Mascota = new Mascota();
  mensaje: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre_mas: new FormControl('', [Validators.required]),
      raza_mas: new FormControl('', [Validators.required]),
      edad_mas: new FormControl(),
      idAdminSeleccionado: this.form.value['idAdminSeleccionado'],
      idPropietarioSeleccionado: this.form.value['idPropietarioSeleccionado'],
      idPaseadorSeleccionado: this.form.value['idPaseadorSeleccionado']
    });
  }

  aceptar() {
    this.mascota.nombre_mas = this.form.value['nombre_mas'];
    this.mascota.raza_mas = this.form.value['raza_mas'];
    this.mascota.edad_mas = this.form.value['edad_mas'];

    if (this.form.valid) {
      const mascotaData = {
        nombre_mas: this.mascota.nombre_mas,
        raza_mas: this.mascota.raza_mas,
        edad_mas: this.mascota.edad_mas,
        idAdminSeleccionado: this.form.value['idAdminSeleccionado'],
        idPropietarioSeleccionado: this.form.value['idPropietarioSeleccionado'],
        idPaseadorSeleccionado: this.form.value['idPaseadorSeleccionado']
      };

      // Realizar la solicitud POST para registrar la mascota junto con los IDs del administrador y el propietario
      this.http.post<any>(`http://18.216.74.240:8080/api/mascota/${this.form.value['idAdminSeleccionado']}/${this.form.value['idPropietarioSeleccionado']}/${this.form.value['idPaseadorSeleccionado']}`, mascotaData)
        .subscribe((data) => {
          // Manejar la respuesta del servidor después de la inserción
          this.router.navigate(['todos/getmascota']);
        });
    } else {
      this.mensaje = 'Agregue campos omitidos';
    }
  }
}

//