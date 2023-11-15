import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota.service';
import { Mascota } from 'src/app/model/mascota';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-modificar-mascota',
  templateUrl: './modificar-mascota.component.html',
  styleUrls: ['./modificar-mascota.component.css']
})
export class ModificarMascotaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  mascota: Mascota = new Mascota();
  id_mas: number = 4;
  mensaje: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private mascotaService: MascotaService, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre_mas: new FormControl('', [Validators.required]),
      raza_mas: new FormControl('', [Validators.required]),
      edad_mas: new FormControl(),
      idMascotaSeleccionado: this.form.value['idMascotaSeleccionado']
    });
    
  }

  updateMascota() {
    this.mascota.nombre_mas = this.form.value['nombre_mas'];
    this.mascota.raza_mas = this.form.value['raza_mas'];
    this.mascota.edad_mas = this.form.value['edad_mas'];

    if (this.form.valid) {
      const mascotaData = {
        nombre_mas: this.mascota.nombre_mas,
        raza_mas: this.mascota.raza_mas,
        edad_mas: this.mascota.edad_mas,
        idMascotaSeleccionado: this.form.value['idMascotaSeleccionado']
      };

      // Realizar la solicitud POST para registrar la mascota junto con los IDs del administrador y el propietario
      this.http.put<any>(`http://localhost:8080/api/mascotaupdate/${this.form.value['idMascotaSeleccionado']}`, mascotaData)
        .subscribe((data) => {
          // Manejar la respuesta del servidor después de la inserción
          this.router.navigate(['todos/getmascota']);
        });
    } else {
      this.mensaje = 'Agregue campos omitidos';
    }
  }
}
