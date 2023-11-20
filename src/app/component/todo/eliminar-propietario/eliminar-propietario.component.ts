import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropietarioService } from 'src/app/service/propietario.service';
import { Propietario } from 'src/app/model/propietario';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-eliminar-propietario',
  templateUrl: './eliminar-propietario.component.html',
  styleUrls: ['./eliminar-propietario.component.css']
})
export class EliminarPropietarioComponent implements OnInit{
  nombrePropietario: string = '';
  telefonoPropietario: string = '';
  correoPropietario: string = '';
  propietarios: Propietario[] = [];
  propietario: Propietario = new Propietario();
  form: FormGroup = new FormGroup({});
  mensaje: string = '';

  constructor(private router: Router, private propietarioService: PropietarioService, private route: ActivatedRoute,private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.propietarioService.nombrePropietario$.subscribe((nombre) => {
      this.nombrePropietario = nombre;
    });
    this.propietarioService.telefonoPropietario$.subscribe((telefono) => {
      this.telefonoPropietario = telefono;
    });
    this.propietarioService.correoPropietario$.subscribe((correo) => {
      this.correoPropietario = correo;
    });

    this.propietarioService.getPropietarios().subscribe((propietarios) => {
      this.propietarios = propietarios;
    });

    this.form = new FormGroup({
      nombreapellido_prop: new FormControl('', [Validators.required]),
      telefono_prop: new FormControl('', [Validators.required]),
      correo_prop: new FormControl('', [Validators.required]),
      contraseña_prop: new FormControl(),
    });

    this.form = this.formBuilder.group({
      idPropietarioSeleccionado: ['', [Validators.required, Validators.min(1)]]
    });
    
  }

  deletePropietario() {
    if (this.form.valid) {
      const idPropietario = this.form.value['idPropietarioSeleccionado'];

      this.http.delete<any>(`http://18.216.74.240:8080/api/propietariodelete/${idPropietario}`)
        .subscribe(
          () => {
            // Éxito: Puedes realizar acciones adicionales después de eliminar la reserva
            console.log('Propietario eliminado correctamente');
            this.router.navigate(['todos/getpropietario']);
          },
          (error) => {
            // Manejar errores aquí
            console.error('Error al eliminar al propietario', error);
          }
        );
    }
  }
}
