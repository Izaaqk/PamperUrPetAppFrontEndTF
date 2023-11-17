import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pago } from 'src/app/model/pago';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-realizar-pagoreserva',
  templateUrl: './realizar-pagoreserva.component.html',
  styleUrls: ['./realizar-pagoreserva.component.css']
})
export class RealizarPagoreservaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  pago: Pago = new Pago();
  mensaje: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombreapellido_pago: new FormControl('', [Validators.required]),
      correo_pago: new FormControl('', [Validators.required]),
      direccion_pago: new FormControl('', [Validators.required]),
      distrito_pago: new FormControl('', [Validators.required]),
      telefono_pago: new FormControl(),
      raza_pago: new FormControl('', [Validators.required]),
      tarjeta_pago: new FormControl('', [Validators.required]),
      propietario_pago: new FormControl('', [Validators.required]),
      numTarjeta_pago: new FormControl(),
      mesexpiracion_pago: new FormControl('', [Validators.required]),
      añoexpiracion_pago: new FormControl(),
      cvv_pago: new FormControl(),
      idMembresiaSeleccionado: this.form.value['idMembresiaSeleccionado']
    });
  }

  aceptar() {
    this.pago.nombreapellido_pago = this.form.value['nombreapellido_pago'];
    this.pago.correo_pago = this.form.value['correo_pago'];
    this.pago.direccion_pago = this.form.value['direccion_pago'];
    this.pago.distrito_pago = this.form.value['distrito_pago'];
    this.pago.telefono_pago = this.form.value['telefono_pago'];
    this.pago.raza_pago = this.form.value['raza_pago'];
    this.pago.tarjeta_pago = this.form.value['tarjeta_pago'];
    this.pago.propietario_pago = this.form.value['propietario_pago'];
    this.pago.numTarjeta_pago = this.form.value['numTarjeta_pago'];
    this.pago.mesexpiracion_pago = this.form.value['mesexpiracion_pago'];
    this.pago.añoexpiracion_pago = this.form.value['añoexpiracion_pago'];
    this.pago.cvv_pago = this.form.value['cvv_pago'];

    if (this.form.valid) {
      const pagoData = {
        nombreapellido_pago: this.pago.nombreapellido_pago,
        correo_pago: this.pago.correo_pago,
        direccion_pago: this.pago.direccion_pago,
        distrito_pago: this.pago.distrito_pago,
        telefono_pago: this.pago.telefono_pago,
        raza_pago: this.pago.raza_pago,
        tarjeta_pago: this.pago.tarjeta_pago,
        propietario_pago: this.pago.propietario_pago,
        numTarjeta_pago: this.pago.numTarjeta_pago,
        mesexpiracion_pago: this.pago.mesexpiracion_pago,
        añoexpiracion_pago: this.pago.añoexpiracion_pago,
        cvv_pago: this.pago.cvv_pago,
        idMembresiaSeleccionado: this.form.value['idMembresiaSeleccionado']
      };

      // Realizar la solicitud POST para registrar la mascota junto con los IDs del administrador y el propietario
      this.http.post<any>(`http://13.59.192.42:8080/api/pago/${this.form.value['idMembresiaSeleccionado']}`, pagoData)
        .subscribe((data) => {
          // Manejar la respuesta del servidor después de la inserción
          this.router.navigate(['todos/registerreserva']);
        });
    } else {
      this.mensaje = 'Agregue campos omitidos';
    }
  }
}
