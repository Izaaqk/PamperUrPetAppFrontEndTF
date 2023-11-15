import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Membresia } from 'src/app/model/membresia';
import { MembresiaService } from 'src/app/service/membresia.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-pago-membresia',
  templateUrl: './pago-membresia.component.html',
  styleUrls: ['./pago-membresia.component.css']
})
export class PagoMembresiaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  membresia: Membresia = new Membresia();
  mensaje: string = '';

  constructor(
    private membresiaService: MembresiaService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      numerotarjeta_memb: new FormControl(),
      fechavencimiento_memb: new FormControl('', [Validators.required]),
      cvv_memb: new FormControl(),
      nombrecompleto_memb: new FormControl('', [Validators.required]),
      membresiaelegida_memb: new FormControl('', [Validators.required]),
      montopagar_memb: new FormControl(),
    });
  }

  aceptar() {
    this.membresia.numerotarjeta_memb = this.form.value['numerotarjeta_memb'];
    this.membresia.fechavencimiento_memb = this.form.value['fechavencimiento_memb'];
    this.membresia.cvv_memb = this.form.value['cvv_memb'];
    this.membresia.nombrecompleto_memb = this.form.value['nombrecompleto_memb'];
    this.membresia.membresiaelegida_memb = this.form.value['membresiaelegida_memb'];
    this.membresia.montopagar_memb = this.form.value['montopagar_memb'];

    if (this.form.valid) {
      this.membresiaService.insert(this.membresia).subscribe((data) => {
        // Manejar respuesta después de la inserción, si es necesario
        this.router.navigate(['todos/landingpage']);
      });
    } else {
      this.mensaje = "Agregue campos omitidos";
    }
  }
}
