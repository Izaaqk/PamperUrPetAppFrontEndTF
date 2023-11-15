import { Component, OnInit } from '@angular/core';
import { MascotaService } from 'src/app/service/mascota.service';
import { Mascota } from 'src/app/model/mascota';

@Component({
  selector: 'app-get-mascota',
  templateUrl: './get-mascota.component.html',
  styleUrls: ['./get-mascota.component.css']
})
export class GetMascotaComponent implements OnInit {
  mascotas: Mascota[] = [];

  constructor(private mascotaService: MascotaService) { }

  ngOnInit(): void {
    this.mascotaService.getMascotas().subscribe((mascotas) => {
      this.mascotas = mascotas;
    });
  }
}
