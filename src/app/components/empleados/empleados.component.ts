import { Component } from '@angular/core';
import { EmpleadosService } from 'src/app/service/empleados.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarEmpleadosComponent } from '../registrar-empleados/registrar-empleados.component';
import { IEmpleados } from 'src/app/interface/Empleados';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  
})
export class EmpleadosComponent {
  public cargos: any[] = []
  public cargoSelect: number = 0;
  public departamento: any[] = []
  public departamentoSelect: number = 0;
  public p: number = 1;
  filtroempleados: IEmpleados =
    {
      id: 0,
      usuario: "",
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: '',
      idDepartamento: 0,
      nombreDepartamento: "",
      idCargo: 0,
      nombreCargo: "",
      email: "",
      estado:true
    };
  empleados: IEmpleados[] = [
    {
      id: 0,
      usuario: "",
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: '',
      idDepartamento: 0,
      nombreDepartamento: "",
      idCargo: 0,
      nombreCargo: "",
      email: "",
      estado:true
    }
  ]

  constructor(
    private empleadoService: EmpleadosService,
    private router: Router,
    private matDialog: MatDialog

  ) { }
  ngOnInit(): void {
    this.getEmpleados()
    this.getCargos()
    this.getDepartamentos()
  }
  displayedColumns: string[] = ['Usuario', 'Nombres', 'Apellidos', 'Departamento', 'Cargo', 'Email', 'Acciones'];
  dataSource = this.empleados;
  getEmpleados() {
    this.empleados = []
    this.empleadoService.getEmpleados().subscribe(resp => {
      this.empleados = resp
      console.log(resp)
    });
  }
  getCargos() {
    this.empleadoService.getCargos().subscribe(resp => {
      console.log(resp)
      this.cargos = resp
    });
  }
  getDepartamentos() {
    this.empleadoService.getDepartamentos().subscribe(resp => {
      console.log(resp)
      this.departamento = resp
    });
  }
  registrarEmpleados() {
    const dialogRef = this.matDialog.open(RegistrarEmpleadosComponent, {
      width: 'auto',
      panelClass: 'fondo',
      data: null
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getEmpleados()
    });
  }

  actualizarEmpleados(empleados: any) {
    localStorage.setItem("usuario", JSON.stringify(empleados));
    const dialogRef = this.matDialog.open(RegistrarEmpleadosComponent, {
      width: '600px',
      panelClass: 'fondo',
      data: null
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getEmpleados()
    });
  }

  openConfirmationDialog(empleado: IEmpleados): void {
    const dialogRef = this.matDialog.open(ConfirmationComponent, {
      width: '300px',
      data: {
        message: '¿Estás seguro de eliminar el usuario seleccionado?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.empleadoService.deleteEmpleados(empleado.id).subscribe(resp => {
          if (resp) {
            alert("Se elmino correctamente");
            this.ngOnInit();
          } else { alert("No se pudo eliminar la persona") }
        });
        console.log('Usuario confirmó');
      } else {
        console.log('Usuario canceló');
      }
    });
  }


  GetUsuariosFiltros() {
    console.log(this.filtroempleados)
    this.empleadoService.GetUsuariosFiltros(this.filtroempleados).subscribe(resp => {
      console.log(resp);
      this.empleados = resp;
    })
  }
}


