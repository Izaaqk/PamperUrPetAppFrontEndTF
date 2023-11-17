import { Component, OnInit, ViewChild } from '@angular/core';
import { Propietario } from 'src/app/model/propietario';
import { Paseador} from 'src/app/model/paseador';
import { Reserva} from 'src/app/model/reserva';
import { Mascota} from 'src/app/model/mascota';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort';
import { PropietarioService } from 'src/app/service/propietario.service';
import { PaseadorService } from 'src/app/service/paseador.service';
import { ReservaService } from 'src/app/service/reserva.service';
import { MascotaService } from 'src/app/service/mascota.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogoComponent } from './dialogo/dialogo.component';

@Component({
  selector: 'app-reporte-propietario',
  templateUrl: './reporte-propietario.component.html',
  styleUrls: ['./reporte-propietario.component.css']
})
export class ReportePropietarioComponent implements OnInit{
  lista:Propietario[] = [];
  lista1:Paseador[] = [];
  lista2:Reserva[] = [];
  lista3:Mascota[] = [];
  displayedColumns = ['propietarioid', 'nombreapellido_prop', 'telefono_prop', 'correo_prop'];
  displayedColumns1 = ['id_pas', 'nombreapellido_pas', 'telefono_pas', 'correo_pas'];
  displayedColumns2 = ['id_reser', 'fechainicio_reser', 'fechafin_reser', 'numeromascotas_mas', 'id_pas'];
  displayedColumns3 = ['id_mas', 'nombre_mas', 'raza_mas', 'edad_mas'];
  dataSource = new MatTableDataSource<Propietario>();
  dataSource1 = new MatTableDataSource<Paseador>();
  dataSource2 = new MatTableDataSource<Reserva>();
  dataSource3 = new MatTableDataSource<Mascota>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator1!: MatPaginator;
  @ViewChild(MatSort) sort1!: MatSort;
  constructor(private propietarioService: PropietarioService, 
              private paseadorService: PaseadorService,
              private reservaService: ReservaService,
              private mascotaService: MascotaService,
              private router: Router,
              private dialog:MatDialog){
    console.log("Load Constructor");
  }
 ngOnInit(): void {
   this.propietarioService.getPropietarios().subscribe(data => this.dataSource.data = data);
   //me suscribo
   this.propietarioService.getList().subscribe(data => {
     this.dataSource.data = data;
   });

   this.paseadorService.getPaseadores().subscribe(data => this.dataSource1.data = data);
   //me suscribo
   this.paseadorService.getList().subscribe(data => {
     this.dataSource1.data = data;
   });

   this.reservaService.getReservas().subscribe(data => this.dataSource2.data = data);
   //me suscribo
   this.reservaService.getList().subscribe(data => {
     this.dataSource2.data = data;
   });

   this.mascotaService.getMascotas().subscribe(data => this.dataSource3.data = data);
   //me suscribo
   this.mascotaService.getList().subscribe(data => {
     this.dataSource3.data = data;
   });
 }
 openDialog(propietarioid:number){
   const dialogRef = this.dialog.open(DialogoComponent);
   dialogRef.afterClosed().subscribe(result =>{
     if(result){
       this.delete(propietarioid);
     }else{
       console.log("FALSE");
     }
   });
 }

 openDialog1(id_pas:number){
  const dialogRef = this.dialog.open(DialogoComponent);
  dialogRef.afterClosed().subscribe(result =>{
    if(result){
      this.delete(id_pas);
    }else{
      console.log("FALSE");
    }
  });
}
openDialog2(id_reser:number){
  const dialogRef = this.dialog.open(DialogoComponent);
  dialogRef.afterClosed().subscribe(result =>{
    if(result){
      this.delete(id_reser);
    }else{
      console.log("FALSE");
    }
  });
}
openDialog3(id_mas:number){
  const dialogRef = this.dialog.open(DialogoComponent);
  dialogRef.afterClosed().subscribe(result =>{
    if(result){
      this.delete(id_mas);
    }else{
      console.log("FALSE");
    }
  });
}
 delete(propietarioid:number){
   this.propietarioService.deletePropietario(propietarioid).subscribe(()=>{
     this.propietarioService.getPropietarios().subscribe(data=>{
       this.propietarioService.setList(data);
     })
   });
 }
 ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
 }
 filtrar(e:any){
   this.dataSource.filter = e.target.value.trim();
 }
 ngAfterViewInit1() {
  this.dataSource1.sort = this.sort1;
  this.dataSource1.paginator = this.paginator1;
}
ngAfterViewInit2() {
  this.dataSource2.sort = this.sort;
  this.dataSource2.paginator = this.paginator;
}
ngAfterViewInit3() {
  this.dataSource3.sort = this.sort;
  this.dataSource3.paginator = this.paginator;
}
filtrar1(e:any){
 this.dataSource1.filter = e.target.value.trim();
}
filtrar2(e:any){
  this.dataSource2.filter = e.target.value.trim();
 }
 filtrar3(e:any){
  this.dataSource3.filter = e.target.value.trim();
 }
}
