import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Reserva } from 'src/app/model/reserva';
import { ReservaService } from 'src/app/service/reserva.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-reserva',
  templateUrl: './register-reserva.component.html',
  styleUrls: ['./register-reserva.component.css']
})
export class RegisterReservaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  reserva: Reserva = new Reserva();
  mensaje: string = '';
  id_reser: number = 0;
  edicion: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private route : ActivatedRoute,
    private reservaService: ReservaService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>
    {
      this.id_reser = data['id_reser']; //capturando el id del listado
      this.edicion = data['id_reser'] != null;//true, false
      this.init();
     });

     this.form = this.formBuilder.group({
      fechainicio_reser: new FormControl('', [Validators.required]),
      fechafin_reser: new FormControl('', [Validators.required]),
      numeromascotas_mas: new FormControl(),
      id_pas: new FormControl(),
      idMascotaSeleccionado: this.form.value['idMascotaSeleccionado'],
      idPagoSeleccionado: this.form.value['idPagoSeleccionado'],
      idPaseadorSeleccionado: this.form.value['idPaseadorSeleccionado'],
      idPropietarioSeleccionado: this.form.value['idPropietarioSeleccionado']
    });
  }

  init() {
    if (this.edicion) {
    this.reservaService.listIdReserva(this.id_reser).subscribe((data) => {
     this.form = new FormGroup({
     id_reser: new FormControl(data.id_reser),
    fechainicio_reser: new FormControl(data.fechainicio_reser),
    fechafin_reser: new FormControl(data.fechafin_reser),
    numeromascotas_mas: new FormControl(data.numeromascotas_mas),
    id_pas: new FormControl(data.id_pas),
     });
     });
    } //del if
    } // del in

  aceptar() {
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
        idMascotaSeleccionado: this.form.value['idMascotaSeleccionado'],
        idPagoSeleccionado: this.form.value['idPagoSeleccionado'],
        idPaseadorSeleccionado: this.form.value['idPaseadorSeleccionado'],
        idPropietarioSeleccionado: this.form.value['idPropietarioSeleccionado']
      };

      // Realizar la solicitud POST para registrar la mascota junto con los IDs del administrador y el propietario
      this.http.post<any>(`http://3.22.172.205:8080/api/reserva/${this.form.value['idPagoSeleccionado']}/${this.form.value['idPaseadorSeleccionado']}/${this.form.value['idPropietarioSeleccionado']}/${this.form.value['idMascotaSeleccionado']}`, reservaData)
        .subscribe((data) => {
          // Manejar la respuesta del servidor después de la inserción
          this.router.navigate(['todos/getdeletereserva']);
        });
    } else {
      this.mensaje = 'Agregue campos omitidos';
    }
  }

}
