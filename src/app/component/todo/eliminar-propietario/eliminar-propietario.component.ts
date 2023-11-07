import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eliminar-propietario',
  templateUrl: './eliminar-propietario.component.html',
  styleUrls: ['./eliminar-propietario.component.css']
})
export class EliminarPropietarioComponent implements OnInit{

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }
}
