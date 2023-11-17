import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './component/todo/landing-page/landing-page.component';
import { TodoComponent } from './component/todo/todo.component';
import { RegisterPropietarioComponent } from './component/todo/register-propietario/register-propietario.component';
import { BienvenidaPantallaComponent } from './component/todo/bienvenida-pantalla/bienvenida-pantalla.component';
import { LoginPantallaComponent } from './component/todo/login-pantalla/login-pantalla.component';
import { GetPropietarioComponent } from './component/todo/get-propietario/get-propietario.component';
import { ModificarPropietarioComponent } from './component/todo/modificar-propietario/modificar-propietario.component';
import { EliminarPropietarioComponent } from './component/todo/eliminar-propietario/eliminar-propietario.component';
import { GetMascotaComponent } from './component/todo/get-mascota/get-mascota.component';
import { ModificarMascotaComponent } from './component/todo/modificar-mascota/modificar-mascota.component';
import { RegisterMascotaComponent } from './component/todo/register-mascota/register-mascota.component';
import { EliminarMascotaComponent } from './component/todo/eliminar-mascota/eliminar-mascota.component';
import { GetdeleteReservaComponent } from './component/todo/getdelete-reserva/getdelete-reserva.component';
import { RegisterReservaComponent } from './component/todo/register-reserva/register-reserva.component';
import { ModificarReservaComponent } from './component/todo/modificar-reserva/modificar-reserva.component';
import { RealizarPagoreservaComponent } from './component/todo/realizar-pagoreserva/realizar-pagoreserva.component';
import { PagoMembresiaComponent } from './component/todo/pago-membresia/pago-membresia.component';
import { ModificarAdminComponent } from './component/todo/modificar-admin/modificar-admin.component';
import { GetPaseadorComponent } from './component/todo/get-paseador/get-paseador.component';
import { ModificarPaseadorComponent } from './component/todo/modificar-paseador/modificar-paseador.component';
import { ReportePropietarioComponent } from './component/todo/reporte-propietario/reporte-propietario.component';
import { DialogoComponent } from './component/todo/reporte-propietario/dialogo/dialogo.component';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule} from '@angular/material/core';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker'
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    TodoComponent,
    RegisterPropietarioComponent,
    BienvenidaPantallaComponent,
    LoginPantallaComponent,
    GetPropietarioComponent,
    ModificarPropietarioComponent,
    EliminarPropietarioComponent,
    GetMascotaComponent,
    ModificarMascotaComponent,
    RegisterMascotaComponent,
    EliminarMascotaComponent,
    GetdeleteReservaComponent,
    RegisterReservaComponent,
    ModificarReservaComponent,
    RealizarPagoreservaComponent,
    PagoMembresiaComponent,
    ModificarAdminComponent,
    GetPaseadorComponent,
    ModificarPaseadorComponent,
    ReportePropietarioComponent,
    DialogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    MatMomentDateModule,
    MatSelectModule,
    MatGridListModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule, //falto adicionar
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
