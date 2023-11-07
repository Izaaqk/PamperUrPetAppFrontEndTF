import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida-pantalla',
  templateUrl: './bienvenida-pantalla.component.html',
  styleUrls: ['./bienvenida-pantalla.component.css']
})
export class BienvenidaPantallaComponent implements OnInit{
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

}
