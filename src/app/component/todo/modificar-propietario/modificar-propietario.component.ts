import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PropietarioService } from 'src/app/service/propietario.service';
import { Propietario } from 'src/app/model/propietario';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from 'src/app/service/shared-data.service';

@Component({
  selector: 'app-modificar-propietario',
  templateUrl: './modificar-propietario.component.html',
  styleUrls: ['./modificar-propietario.component.css']
})
export class ModificarPropietarioComponent implements OnInit{
  imagenRuta: string | null = null;
  form: FormGroup = new FormGroup({});
  propietario: Propietario = new Propietario();
  propietarioid: number = 4;
  mensaje: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private propietarioService: PropietarioService, private http: HttpClient, private sharedDataService: SharedDataService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombreapellido_prop: new FormControl('', [Validators.required]),
      telefono_prop: new FormControl('', [Validators.required]),
      correo_prop: new FormControl('', [Validators.required]),
      idPropietarioSeleccionado: this.form.value['idPropietarioSeleccionado']
    });

    this.sharedDataService.imagenSeleccionada$.subscribe((imagen: File | undefined) => {
      if (imagen !== undefined) {
        const correoPropietario = 'correo@example.com'; // Reemplaza esto con el verdadero correo del propietario
        const imagenGuardada = this.sharedDataService.getImagenSeleccionada(correoPropietario);
        if (imagenGuardada !== undefined) {
          this.imagenRuta = URL.createObjectURL(imagenGuardada);
        }
      }
    });
  }

  onImageClick(event: any) {
    // Aquí puedes implementar la lógica para seleccionar una imagen y guardarla
    // Puedes abrir un cuadro de diálogo para que el usuario seleccione una imagen o implementar tu lógica
    // En este ejemplo, asumiré que el usuario selecciona un archivo de entrada de tipo 'file'
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
  
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const correoPropietario = 'correo@example.com'; // Reemplaza esto con el verdadero correo del propietario
        // Establece la imagen seleccionada usando el servicio compartido
        this.sharedDataService.setImagenSeleccionada(correoPropietario, file);
      }
    };
  
    input.click();
  }

  updatePropietario() {
    this.propietario.nombreapellido_prop = this.form.value['nombreapellido_prop'];
    this.propietario.telefono_prop = this.form.value['telefono_prop'];
    this.propietario.correo_prop = this.form.value['correo_prop'];

    const contraseña = this.form.value['contraseña_prop'];

    if (contraseña) {
      // La contraseña está presente, incluirla en los datos
      this.propietario.contraseña_prop = contraseña;
    }

    if (this.form.valid) {
      const propietarioData = {
        nombreapellido_prop: this.propietario.nombreapellido_prop,
        telefono_prop: this.propietario.telefono_prop,
        correo_prop: this.propietario.correo_prop,
        contraseña_prop: this.propietario.contraseña_prop,
        idPropietarioSeleccionado: this.form.value['idPropietarioSeleccionado']
      };

      // Realizar la solicitud POST para registrar la mascota junto con los IDs del administrador y el propietario
      this.http.put<any>(`http://localhost:8080/api/propietarioupdate/${this.form.value['idPropietarioSeleccionado']}`, propietarioData)
        .subscribe((data) => {
          // Manejar la respuesta del servidor después de la inserción
          this.router.navigate(['todos/getpropietario']);
        });
    } else {
      this.mensaje = 'Agregue campos omitidos';
    }
  }
}
