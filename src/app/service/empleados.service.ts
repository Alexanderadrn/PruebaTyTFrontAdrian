import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmpleados } from '../interface/Empleados';



@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  urlbase = 'https://localhost:7059/api/'
  controlador = 'Prueba/'

  constructor(private httpClient: HttpClient) { }

  getEmpleados(): Observable<any> {
    var metodo = 'obtener-usuarios'
    return this.httpClient.get<any>(this.urlbase + this.controlador + metodo);
  }
  setEmpleados(datosEmpleados: any) {
    
    var metodo = 'crear-usuario'
    return this.httpClient.post<any>(this.urlbase + this.controlador + metodo, datosEmpleados)
  }
  updateEmpleados(datosEmpleados: any) {
    var metodo = 'actualizar-usuario'
    return this.httpClient.post<any>(this.urlbase + this.controlador + metodo, datosEmpleados)
  }
  deleteEmpleados(usuarioId: number) {
    var metodo='borrar-usuario'
    let params = new HttpParams()
      .append("usuarioId", usuarioId)
    console.log(usuarioId);
    const headers = new HttpHeaders().set('content-type', 'application/json')
    return this.httpClient.post<any>(this.urlbase + this.controlador + metodo, usuarioId, { headers, params });
  }
  getCargos():Observable<any>{
    var metodo= 'obtener-cargos'
    return this.httpClient.get<any>(this.urlbase+this.controlador+metodo);
  }
  getDepartamentos():Observable<any>{
    var metodo= 'obtener-departamentos'
    return this.httpClient.get<any>(this.urlbase+this.controlador+metodo);
  }
  GetUsuariosFiltros(empleados : IEmpleados): Observable<any>{
    let header = new HttpHeaders()
  .set('Type-content','aplication/json')
    return this.httpClient.post<any>(this.urlbase+this.controlador+'obtener-usuarios-by-filtro',empleados);
  }
}
