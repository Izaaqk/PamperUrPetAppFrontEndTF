import { Admin } from "./admin";
import { Propietario } from "./propietario";
import { Paseador } from "./paseador";

export class Mascota{
    id_mas: number = 0;
    nombre_mas: string = "";
    raza_mas: string = "";
    edad_mas: number = 0;
    admin!: Admin
    propietario!: Propietario
    paseador!: Paseador
}