import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-paseador',
  templateUrl: './modificar-paseador.component.html',
  styleUrls: ['./modificar-paseador.component.css']
})
export class ModificarPaseadorComponent implements OnInit{
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }
}
