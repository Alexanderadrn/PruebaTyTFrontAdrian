export interface IEmpleados{
    id: number;
    usuario?: string;
    primerNombre: string;
    segundoNombre:string;
    primerApellido: string;
    segundoApellido: string;
    idDepartamento: number;
    nombreDepartamento?:string;
    idCargo: number;
    nombreCargo?: string;
    estado:boolean;
    email: string;
    
}