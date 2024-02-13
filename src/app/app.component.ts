import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidacionesPropias } from './validaciones';
import { FacturaService } from './factura.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Injectamos el servicio por el constructor
  constructor(//private facturaService: FacturaService
  ){}

  provincias : string [] = ['',
  "Álava", "Albacete", "Alicante", "Almería", "Ávila", "Badajoz", "Baleares",
  "Barcelona", "Burgos", "Cáceres", "Cádiz", "Castellón", "Ciudad Real", "Córdoba",
  "La Coruña", "Cuenca", "Gerona", "Granada", "Guadalajara", "Guipúzcoa", "Huelva",
  "Huesca", "Jaén", "León", "Lérida", "La Rioja", "Lugo", "Madrid", "Málaga", "Murcia",
  "Navarra", "Orense", "Asturias", "Palencia", "Las Palmas", "Pontevedra", 
  "Salamanca", "Santa Cruz de Tenerife", "Cantabria", "Segovia", "Sevilla", "Soria",
  "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora", 
  "Zaragoza", "Ceuta", "Melilla"
]  
numeroFactura = 1;
baseImponible21 : number = 0;
baseImponible10 : number = 0;
baseImponible4 : number = 0;
iva21 : number = 0;
iva10 : number = 0;
iva4 : number = 0; 
precioTotal : number = 0;
numero1 = ((Math.random() * 100) + 1).toFixed(0);
numero2 = ((Math.random() * 100) + 1).toFixed(0);
suma : string = "";

  formularioContacto = new FormGroup({
    nombreCliente : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    numeroFactura : new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1,6}$/)]),
    fecha: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/), ValidacionesPropias.fecha]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
    cp: new FormControl('', [Validators.required, Validators.pattern(/^(50|51|52|[1-4][0-9]|0[1-9])[0-9]{3}$/)]),
    ciudad: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    tipoDocumento : new FormControl('seleccione', [Validators.pattern(/(nie|nif|dni)/)]),
    numeroDocumento: new FormControl('', [Validators.required, ValidacionesPropias.dni]),
    telefono: new FormControl('',[Validators.required, Validators.pattern(/^(6|7|8|9)[0-9]{8}$/)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  formularioArticulo = new FormGroup({
    nombreArticulo : new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    cantidad: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{0,3}$/)]),
    precio : new FormControl('', [Validators.required, Validators.min(1), Validators.max(10000)]),
    ivaSeleccionado: new FormControl ('21')
  });

  lineaPedido: {numero: number; articulo: string; cantidad:number; precio:number; iva_porcentaje:number; iva: number; base:number; total:number;} []= []

  agregarProducto(){
    if(this.formularioArticulo.valid){
      let numero = this.numeroFactura++;
      let articulo = this.formularioArticulo.value.nombreArticulo || "hola";
      let cantidad = Number(this.formularioArticulo.value.cantidad);
      let precio = Number(this.formularioArticulo.value.precio);
      let iva_porcentaje = Number(this.formularioArticulo.value.ivaSeleccionado);
      let iva = (Number(iva_porcentaje) * (Number(precio) * Number(cantidad)))/100;
      let base = (Number(cantidad) * Number(precio));
      let total = base + iva;
 
     this.lineaPedido.push(
       {
         numero, articulo, cantidad, precio, iva_porcentaje, iva, base, total
       }
     );
    this.ordenarArray();
    } else {
      alert("NO SE PUEDE AÑADIR EL PRODUCTO")
    }
  }

  provincia?: string;

  borrarProducto(posicion : number){
   this.lineaPedido.splice(posicion - 1, 1);   
   this.ordenarArray();
  }

  ordenarArray(){
    this.numeroFactura = 1;
    this.lineaPedido.map(linea => linea.numero = this.numeroFactura++)
    this.limpiarCasillas()
    for(let i = 0; i < this.lineaPedido.length; i++){
      if(this.lineaPedido[i].iva_porcentaje == 4){
        this.baseImponible4 += this.lineaPedido[i].base;
        this.iva4 += this.lineaPedido[i].iva;
        this.precioTotal += this.lineaPedido[i].total;
      } else if(this.lineaPedido[i].iva_porcentaje == 10){
        this.baseImponible10 += this.lineaPedido[i].base;
        this.iva10 += this.lineaPedido[i].iva;
        this.precioTotal += this.lineaPedido[i].total;
      } else {
        this.baseImponible21 += this.lineaPedido[i].base;
        this.iva21 += this.lineaPedido[i].iva;
        this.precioTotal += this.lineaPedido[i].total;
      }
    }
  }

  limpiarCasillas(){
    this.baseImponible21 = 0;
    this.baseImponible10 = 0;
    this.baseImponible4 = 0;
    this.iva21 = 0;
    this.iva10 = 0;
    this.iva4 = 0; 
    this.precioTotal = 0;
  }

  validarFactura() : Boolean{
    if(Number(this.suma) == (Number(this.numero1) + Number(this.numero2))){
      if(this.formularioContacto.valid){
        if(this.lineaPedido.length != 0){
          //Enviamos los datos a través del metodo del servicio "grabarFactura()"
          //this.servicioFactura.grabarFactura(this.formularioContacto.value)
          alert("DATOS ENVIADOS CORRECTAMENTE")
          return true
        } else {
          alert("NO HAY LINEAS DE PEDIDOS EN LA FACTURA")
          return false;
        }
      } else {
        alert("ERROR EN ALGUN DATO DEL FORMULARIO")
        return false;
      }
    } else {
      alert("CAPTACHA INCORRECTO")
      this.numero1 = ((Math.random() * 100) + 1).toFixed(0);
      this.numero2 = ((Math.random() * 100) + 1).toFixed(0);
      return false;
    }
  }

  actualizarProvincia(){
    let codigoPostal: number = this.formularioContacto.value.cp?.length == 5 ? Number(this.formularioContacto.value.cp?.substring(0,2)) : 0;
    this.provincia = codigoPostal != 0 ? this.provincias[codigoPostal] : "Codigo Postal Invalido";
  }
}
