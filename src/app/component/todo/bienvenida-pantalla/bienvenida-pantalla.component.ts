import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paseador } from 'src/app/model/paseador';
import { PropietarioService } from 'src/app/service/propietario.service';
import { PaseadorService } from 'src/app/service/paseador.service';
import { SharedDataService } from 'src/app/service/shared-data.service';


@Component({
  selector: 'app-bienvenida-pantalla',
  templateUrl: './bienvenida-pantalla.component.html',
  styleUrls: ['./bienvenida-pantalla.component.css']
})
export class BienvenidaPantallaComponent implements OnInit{
  imagenRuta: string | null = null;
  paseador1: string = '';
paseador2: string = '';
paseador3: string = '';
  nombrePropietario: string = '';
  constructor(private propietarioService: PropietarioService, private sharedDataService: SharedDataService, private paseadorService: PaseadorService) {}

  ngOnInit(): void {
    this.propietarioService.nombrePropietario$.subscribe((nombre) => {
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
    
      // Obtener la lista de paseadores desde el servicio
  this.paseadorService.getPaseadores().subscribe((paseadores) => {
    // Seleccionar aleatoriamente tres paseadores
    const paseadoresAleatorios = this.selectRandomPaseadores(paseadores, 3);

    // Asignar los nombres a las propiedades del componente
    this.paseador1 = paseadoresAleatorios[0]?.nombreapellido_pas || '';
    this.paseador2 = paseadoresAleatorios[1]?.nombreapellido_pas || '';
    this.paseador3 = paseadoresAleatorios[2]?.nombreapellido_pas || '';
  });
  }

  selectRandomPaseadores(paseadores: Paseador[], count: number): Paseador[] {
    const shuffled = paseadores.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
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
