import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  idAdminSeleccionado: number = 1; // ID del administrador
  idPropietarioSeleccionado: number = 2; // ID del propietario

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre_mas: new FormControl('', [Validators.required]),
      raza_mas: new FormControl('', [Validators.required]),
      edad_mas: new FormControl(),
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
      };

      // Realizar la solicitud POST para registrar la mascota junto con los IDs del administrador y el propietario
      this.http.post<any>(`http://localhost:8080/api/mascota/${this.idAdminSeleccionado}/${this.idPropietarioSeleccionado}`, mascotaData)
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