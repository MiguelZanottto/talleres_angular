import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

 @Injectable({ providedIn: 'root' })

 export class FacturaService { 

     private urlServicio = 'URL_DEL_SERVICIO_JAVA/grabarfactura';
     constructor(private http: HttpClient) { }
     grabarFactura(facturaData: any): Observable<any> { 
           return this.http.post<any>(this.urlServicio, facturaData); }
       }