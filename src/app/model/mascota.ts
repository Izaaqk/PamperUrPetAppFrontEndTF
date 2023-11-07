import { Admin } from "./admin";
import { Propietario } from "./propietario";

export class Mascota{
    id_mas: number = 0;
    nombre_mas: string = "";
    raza_mas: string = "";
    edad_mas: number = 0;
    admin!: Admin
    propietario!: Propietario
}