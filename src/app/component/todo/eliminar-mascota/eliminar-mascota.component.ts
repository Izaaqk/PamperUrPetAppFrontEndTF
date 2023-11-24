import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota.service';
import { Mascota } from 'src/app/model/mascota';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eliminar-mascota',
  templateUrl: './eliminar-mascota.component.html',
  styleUrls: ['./eliminar-mascota.component.css']
})
export class EliminarMascotaComponent implements OnInit{
  mascotas: Mascota[] = [];
  mascota: Mascota = new Mascota();
  form: FormGroup = new FormGroup({});
  mensaje: string = '';
  constructor(private router: Router, private mascotaService: MascotaService,private route: ActivatedRoute,private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.mascotaService.getMascotas().subscribe((mascotas) => {
      this.mascotas = mascotas;
    });

    this.form = new FormGroup({
      nombre_mas: new FormControl('', [Validators.required]),
      raza_mas: new FormControl('', [Validators.required]),
      edad_mas: new FormControl(),
    });

    this.form = this.formBuilder.group({
      idMascotaSeleccionado: ['', [Validators.required, Validators.min(1)]]
    });
    
  }

  deleteMascota() {
    if (this.form.valid) {
      const idMascota = this.form.value['idMascotaSeleccionado'];

      this.http.delete<any>(`http://3.22.172.205:8080/api/mascotadelete/${idMascota}`)
        .subscribe(
          () => {
            // Éxito: Puedes realizar acciones adicionales después de eliminar la reserva
            console.log(' Mascota eliminada correctamente');
            this.router.navigate(['todos/getmascota']);
          },
          (error) => {
            // Manejar errores aquí
            console.error('Error al eliminar a la mascota', error);
          }
        );
    }
  }
}
