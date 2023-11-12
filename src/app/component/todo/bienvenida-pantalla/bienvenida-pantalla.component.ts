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

}
