import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PaseadorService } from 'src/app/service/paseador.service';
import { Paseador } from 'src/app/model/paseador';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from 'src/app/service/shared-data.service';

@Component({
  selector: 'app-modificar-paseador',
  templateUrl: './modificar-paseador.component.html',
  styleUrls: ['./modificar-paseador.component.css']
})
export class ModificarPaseadorComponent implements OnInit{
  imagenRuta: string | null = null;
  form: FormGroup = new FormGroup({});
  paseador: Paseador = new Paseador();
  paseadorid: number = 4;
  mensaje: string = '';

  @ViewChild('imageInput')
  imageInput!: ElementRef<HTMLInputElement>;

  constructor(private router: Router, private route: ActivatedRoute, private paseadorService: PaseadorService, private http: HttpClient, private formBuilder: FormBuilder, private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombreapellido_pas: new FormControl('', [Validators.required]),
      telefono_pas: new FormControl('', [Validators.required]),
      correo_pas: new FormControl('', [Validators.required]),
      idPaseadorSeleccionado: this.form.value['idPaseadorSeleccionado']
    });
    this.sharedDataService.imagenSeleccionada$2.subscribe((imagen: File | undefined) => {
      if (imagen !== undefined) {
        const correoPaseador = 'correo@example.com'; // Reemplaza esto con el verdadero correo del paseador
        this.imagenRuta = URL.createObjectURL(imagen);
      }
    });
    
  }

  onImageClick(event: any) {
    // Al hacer clic en la imagen, activa el input de archivo
    this.imageInput.nativeElement.click();
  }

  handleImageChange(event: Event) {
    // Maneja el cambio de la imagen cuando el usuario selecciona un archivo
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const correoPaseador = 'correo@example.com'; // Reemplaza esto con el verdadero correo del paseador
      // Establece la imagen seleccionada usando el servicio compartido
      this.sharedDataService.setImagenSeleccionada1(correoPaseador, file);
    }
  }

  updatePaseador() {
    this.paseador.nombreapellido_pas = this.form.value['nombreapellido_pas'];
    this.paseador.telefono_pas = this.form.value['telefono_pas'];
    this.paseador.correo_pas = this.form.value['correo_pas'];

    const contraseña = this.form.value['contraseña_pas'];

    if (contraseña) {
      // La contraseña está presente, incluirla en los datos
      this.paseador.contraseña_pas = contraseña;
    }

    if (this.form.valid) {
      const paseadorData = {
        nombreapellido_pas: this.paseador.nombreapellido_pas,
        telefono_pas: this.paseador.telefono_pas,
        correo_pas: this.paseador.correo_pas,
        contraseña_pas: this.paseador.contraseña_pas,
        idPaseadorSeleccionado: this.form.value['idPaseadorSeleccionado']
      };

      // Realizar la solicitud POST para registrar la mascota junto con los IDs del administrador y el propietario
      this.http.put<any>(`http://18.216.74.240:8080/api/paseadorupdate/${this.form.value['idPaseadorSeleccionado']}`, paseadorData)
        .subscribe((data) => {
          // Manejar la respuesta del servidor después de la inserción
          this.router.navigate(['todos/getpaseador']);
        });
    } else {
      this.mensaje = 'Agregue campos omitidos';
    }
  }
}
