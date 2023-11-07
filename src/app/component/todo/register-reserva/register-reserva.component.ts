import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-reserva',
  templateUrl: './register-reserva.component.html',
  styleUrls: ['./register-reserva.component.css']
})
export class RegisterReservaComponent implements OnInit{
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

}
