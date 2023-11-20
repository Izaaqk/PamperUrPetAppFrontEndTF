import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from 'src/app/service/reserva.service';
import { Reserva } from 'src/app/model/reserva';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-getdelete-reserva',
  templateUrl: './getdelete-reserva.component.html',
  styleUrls: ['./getdelete-reserva.component.css']
})
export class GetdeleteReservaComponent implements OnInit {
  reservas: Reserva[] = [];
  form: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private reservaService: ReservaService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.reservaService.getReservas().subscribe((reservas) => {
      this.reservas = reservas;
    });

    this.form = this.formBuilder.group({
      idReservaSeleccionado: ['', [Validators.required, Validators.min(1)]]
    });
  }

  filtrarReservas() {
    const idReserva = this.form.get('idReservaSeleccionado')?.value;
    if (idReserva) {
      // Filtrar las reservas que coincidan con el ID proporcionado
      this.reservaService.getReserva(idReserva).subscribe(
        (reserva) => {
          this.reservas = [reserva];
        },
        (error) => {
          console.error('Error al filtrar reservas', error);
        }
      );
    } else {
      // Si el campo está vacío, muestra todas las reservas
      this.reservaService.getReservas().subscribe(
        (reservas) => {
          this.reservas = reservas;
        },
        (error) => {
          console.error('Error al obtener reservas', error);
        }
      );
    }
  }
  
  
  

  deleteReserva() {
    if (this.form.valid) {
      const idReserva = this.form.value['idReservaSeleccionado'];

      this.http.delete<any>(`http://18.216.74.240:8080/api/reservadelete/${idReserva}`)
        .subscribe(
          () => {
            // Éxito: Puedes realizar acciones adicionales después de eliminar la reserva
            console.log('Reserva eliminada correctamente');
            this.router.navigate(['todos/getdeletereserva']);
          },
          (error) => {
            // Manejar errores aquí
            console.error('Error al eliminar la reserva', error);
          }
        );
    }
  }
}
