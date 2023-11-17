import { Component, OnInit, ViewChild } from '@angular/core';
import { Propietario } from 'src/app/model/propietario';
import { Paseador} from 'src/app/model/paseador';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort';
import { PropietarioService } from 'src/app/service/propietario.service';
import { PaseadorService } from 'src/app/service/paseador.service';
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
  displayedColumns = ['propietarioid', 'nombreapellido_prop', 'telefono_prop', 'correo_prop'];
  displayedColumns1 = ['id_pas', 'nombreapellido_pas', 'telefono_pas', 'correo_pas'];
  dataSource = new MatTableDataSource<Propietario>();
  dataSource1 = new MatTableDataSource<Paseador>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator1!: MatPaginator;
  @ViewChild(MatSort) sort1!: MatSort;
  constructor(private propietarioService: PropietarioService, 
              private paseadorService: PaseadorService,
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
filtrar1(e:any){
 this.dataSource1.filter = e.target.value.trim();
}
}
