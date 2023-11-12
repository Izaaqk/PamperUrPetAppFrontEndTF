import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida-pantalla',
  templateUrl: './bienvenida-pantalla.component.html',
  styleUrls: ['./bienvenida-pantalla.component.css']
})
export class BienvenidaPantallaComponent implements OnInit{
  ImagenRuta: string | null = null;
  nombrePropietario: String = '';
  constructor(private router: Router) { }

  ngOnInit(): void {this.propietarioService.nombrePropietario$.subscribe((nombre) => {
    this.nombrePropietario = nombre;
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

}
