import { AbstractControl, ValidationErrors } from "@angular/forms";

export class ValidacionesPropias{
    static fecha(control: AbstractControl) : ValidationErrors| null {
        if(control.value){
            let fechaUsuario : string = control.value;
            let campos: string [] = fechaUsuario.split("/");
            const fechaHoy = new Date();
            const fecha = new Date(Number(campos[2]), Number(campos[1])-1, Number(campos[0]));
            if(!isNaN(fecha.getTime()) && Number(campos[0]) == fecha.getDate() && Number(campos[1]) == fecha.getMonth() + 1 && Number(campos[2]) == fecha.getFullYear() && fecha.getTime() > fechaHoy.getTime()) {
                return null;
            } else {
                return {fecha: true}
            }
        } else {
            return null;
        }
    }

    static dni(control: AbstractControl) : ValidationErrors| null {   
        if(control.value.length != 0){
            let dni: string = control.value;
            const letraDNI = dni.substring(8, 9);
            const numDNI = parseInt(dni.substring(0, 8));
            let letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
            let letraCorrecta = letras[numDNI % 23];
             
            if(letraDNI.toUpperCase() != letraCorrecta){
            return {dni: true}
                }
            else{
                return null;
            }
        } else {
            return null;
        }
    }
}