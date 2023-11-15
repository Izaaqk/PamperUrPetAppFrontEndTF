import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './component/todo/todo.component';
import { RegisterPropietarioComponent } from './component/todo/register-propietario/register-propietario.component';
import { LandingPageComponent } from './component/todo/landing-page/landing-page.component';
import { BienvenidaPantallaComponent } from './component/todo/bienvenida-pantalla/bienvenida-pantalla.component';
import { LoginPantallaComponent } from './component/todo/login-pantalla/login-pantalla.component';
import { GetPropietarioComponent } from './component/todo/get-propietario/get-propietario.component';
import { ModificarPropietarioComponent } from './component/todo/modificar-propietario/modificar-propietario.component';
import { EliminarPropietarioComponent } from './component/todo/eliminar-propietario/eliminar-propietario.component';
import { GetMascotaComponent } from './component/todo/get-mascota/get-mascota.component';
import { RegisterMascotaComponent } from './component/todo/register-mascota/register-mascota.component';
import { ModificarMascotaComponent } from './component/todo/modificar-mascota/modificar-mascota.component';
import { EliminarMascotaComponent } from './component/todo/eliminar-mascota/eliminar-mascota.component';
import { GetdeleteReservaComponent } from './component/todo/getdelete-reserva/getdelete-reserva.component';
import { RegisterReservaComponent } from './component/todo/register-reserva/register-reserva.component';
import { ModificarReservaComponent } from './component/todo/modificar-reserva/modificar-reserva.component';
import { RealizarPagoreservaComponent } from './component/todo/realizar-pagoreserva/realizar-pagoreserva.component';
import { PagoMembresiaComponent } from './component/todo/pago-membresia/pago-membresia.component';
import { ModificarAdminComponent } from './component/todo/modificar-admin/modificar-admin.component';
import { GetPaseadorComponent } from './component/todo/get-paseador/get-paseador.component';
import { ModificarPaseadorComponent } from './component/todo/modificar-paseador/modificar-paseador.component';

const routes: Routes = [
  {
    path: 'todos', component: TodoComponent, children: [
      {
        path: 'registerpropietario', component: RegisterPropietarioComponent
      },
      {
        path: 'landingpage', component: LandingPageComponent
      },
      {
        path: 'bienvenida', component: BienvenidaPantallaComponent
      },
      {
        path: 'login', component: LoginPantallaComponent
      },
      {
        path: 'getpropietario', component: GetPropietarioComponent
      },
      {
        path: 'putpropietario', component: ModificarPropietarioComponent
      },
      {
        path: 'deletepropietario', component: EliminarPropietarioComponent
      },
      {
        path: 'getmascota', component: GetMascotaComponent
      },
      {
        path: 'registermascota', component: RegisterMascotaComponent
      },
      {
        path: 'putmascota', component: ModificarMascotaComponent
      },
      {
        path: 'deletemascota', component: EliminarMascotaComponent
      },
      {
        path: 'getdeletereserva', component: GetdeleteReservaComponent
      },
      {
        path: 'registerreserva', component: RegisterReservaComponent
      },
      {
        path: 'putreserva', component: ModificarReservaComponent
      },
      {
        path: 'realizarpagoreserva', component: RealizarPagoreservaComponent
      },
      {
        path: 'pagomembresia', component: PagoMembresiaComponent
      },
      {
        path: 'modificaradmin', component: ModificarAdminComponent
      },
      {
        path: 'getpaseador', component: GetPaseadorComponent
      },
      {
        path: 'modificarpaseador', component: ModificarPaseadorComponent
      },
      {
        path: 'edicion/:id_reser', component:RegisterReservaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
