import { Mascota } from "./mascota";
import { Pago } from "./pago";
import { Paseador } from "./paseador";
import { Propietario } from "./propietario";

export class Reserva{
    id_reser: number = 0;
    fechainicio_reser: string = "";
    fechafin_reser: string = "";
    numeromascotas_mas: number = 0;
    id_pas: number = 0;
    mascota!: Mascota
    pago!: Pago
    paseador!: Paseador
    propietario!: Propietario
}