import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ReservaService } from 'src/app/service/reserva.service';
import { Reserva } from 'src/app/model/reserva';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modificar-reserva',
  templateUrl: './modificar-reserva.component.html',
  styleUrls: ['./modificar-reserva.component.css']
})
export class ModificarReservaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  reserva: Reserva = new Reserva();
  id_reser: number = 4;
  mensaje: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reservaService: ReservaService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id_reser = data['id_reser'];
      this.init();
    });

    this.form = this.formBuilder.group({
      fechainicio_reser: new FormControl('', [Validators.required]),
      fechafin_reser: new FormControl('', [Validators.required]),
      numeromascotas_mas: new FormControl('', [Validators.required]),
      id_pas: new FormControl('', [Validators.required]),
      idReservaSeleccionado: this.form.value['idReservaSeleccionado']
    });
  }

  init() {
    if (this.id_reser) {
      this.reservaService.getReserva(this.id_reser).subscribe((data) => {
        this.reserva = data;
        this.form.patchValue(data); // Actualiza los valores del formulario con los datos de la reserva
      });
    }
  }

  updateReserva() {
    this.reserva.fechainicio_reser = this.form.value['fechainicio_reser'];
    this.reserva.fechafin_reser = this.form.value['fechafin_reser'];
    this.reserva.numeromascotas_mas = this.form.value['numeromascotas_mas'];
    this.reserva.id_pas = this.form.value['id_pas'];

    if (this.form.valid) {
      const reservaData = {
        fechainicio_reser: this.reserva.fechainicio_reser,
        fechafin_reser: this.reserva.fechafin_reser,
        numeromascotas_mas: this.reserva.numeromascotas_mas,
        id_pas: this.reserva.id_pas,
        idReservaSeleccionado: this.form.value['idReservaSeleccionado']
      };

      // Realizar la solicitud POST para registrar la mascota junto con los IDs del administrador y el propietario
      this.http.put<any>(`http://18.216.74.240:8080/api/reservaupdate/${this.form.value['idReservaSeleccionado']}`, reservaData)
        .subscribe((data) => {
          // Manejar la respuesta del servidor después de la inserción
          this.router.navigate(['todos/getdeletereserva']);
        });
    } else {
      this.mensaje = 'Agregue campos omitidos';
    }
  }
}
