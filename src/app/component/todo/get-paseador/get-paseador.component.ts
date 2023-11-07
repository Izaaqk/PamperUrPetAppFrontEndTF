import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-paseador',
  templateUrl: './get-paseador.component.html',
  styleUrls: ['./get-paseador.component.css']
})
export class GetPaseadorComponent implements OnInit{
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }
}
