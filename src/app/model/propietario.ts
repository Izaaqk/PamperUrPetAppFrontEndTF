import { Admin } from "./admin";
import { Membresia } from "./membresia";

export class Propietario{
    propietarioid: number = 0;
    nombreapellido_prop: string = "";
    telefono_prop: string = "";
    correo_prop: string = "";
    contraseña_prop: number = 0;
    admin!: Admin
    membresia!: Membresia
}