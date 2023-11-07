import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-mascota',
  templateUrl: './get-mascota.component.html',
  styleUrls: ['./get-mascota.component.css']
})
export class GetMascotaComponent implements OnInit{
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

}
