import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-propietario',
  templateUrl: './get-propietario.component.html',
  styleUrls: ['./get-propietario.component.css']
})
export class GetPropietarioComponent implements OnInit{
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

}
