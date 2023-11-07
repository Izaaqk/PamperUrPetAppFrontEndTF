import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-propietario',
  templateUrl: './modificar-propietario.component.html',
  styleUrls: ['./modificar-propietario.component.css']
})
export class ModificarPropietarioComponent implements OnInit{
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

}
