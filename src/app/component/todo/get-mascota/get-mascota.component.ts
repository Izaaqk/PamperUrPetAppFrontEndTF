import { Component, OnInit } from '@angular/core';
import { MascotaService } from 'src/app/service/mascota.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from 'src/app/model/mascota';

@Component({
  selector: 'app-get-mascota',
  templateUrl: './get-mascota.component.html',
  styleUrls: ['./get-mascota.component.css']
})
export class GetMascotaComponent implements OnInit {
  mascotas: Mascota[] = [];
  form: FormGroup = new FormGroup({});

  constructor(private mascotaService: MascotaService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.mascotaService.getMascotas().subscribe((mascotas) => {
      this.mascotas = mascotas;
    });

    this.form = this.formBuilder.group({
      idMascotaSeleccionado: ['', [Validators.required, Validators.min(1)]]
    });
  }

  filtrarMascotas() {
    const idMascota = this.form.get('idMascotaSeleccionado')?.value;
    if (idMascota) {
      // Filtrar las mascotas que coincidan con el ID proporcionado
      this.mascotaService.getMascota(idMascota).subscribe(
        (mascota) => {
          this.mascotas = [mascota];
        },
        (error) => {
          console.error('Error al filtrar mascotas', error);
        }
      );
    } else {
      // Si el campo está vacío, muestra todas las reservas
      this.mascotaService.getMascotas().subscribe(
        (mascotas) => {
          this.mascotas = mascotas;
        },
        (error) => {
          console.error('Error al obtener mascotas', error);
        }
      );
    }
  }
}
