import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PaseadorService } from 'src/app/service/paseador.service';
import { Paseador } from 'src/app/model/paseador';
import { SharedDataService } from 'src/app/service/shared-data.service';

@Component({
  selector: 'app-get-paseador',
  templateUrl: './get-paseador.component.html',
  styleUrls: ['./get-paseador.component.css']
})
export class GetPaseadorComponent implements OnInit{
  imagenRuta: string | null = null;
  nombrePaseador: string = '';
  telefonoPaseador: string = '';
  correoPaseador: string = '';
  paseador: Paseador = new Paseador();

  @ViewChild('imageInput')
  imageInput!: ElementRef<HTMLInputElement>;
  
  constructor(private router: Router, private paseadorService: PaseadorService, private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.paseadorService.nombrePaseador$.subscribe((nombre) => {
      this.nombrePaseador = nombre;
    });
    this.paseadorService.telefonoPaseador$.subscribe((telefono) => {
      this.telefonoPaseador = telefono;
    });
    this.paseadorService.correoPaseador$.subscribe((correo) => {
      this.correoPaseador = correo;
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
}
