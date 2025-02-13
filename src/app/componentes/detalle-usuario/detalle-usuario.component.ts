import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, AbstractControlOptions, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { CrearUsuarioDTO } from '../../dto/crear-usuario-dto';
import { ActualizarUsuarioDTO } from '../../dto/actualizar-usuario-dto';

@Component({
  selector: 'app-detalle-usuario',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './detalle-usuario.component.html',
  styleUrl: './detalle-usuario.component.css'
})
export class DetalleUsuarioComponent implements OnInit {
  detalleUsuarioForm!: FormGroup;

  usuarioActualizar!: ActualizarUsuarioDTO;

  idUsuario: string = '';
  
  /*identificacion:string='';
  nombre:string='';
  rol:string='';
  email:string='';
  estadoUsuario:boolean=false;
  telefono:string='';
  direccion:string='';*/
  estadoU:boolean=false;
  mensaje!: String;
  tiposDeRol: string[] ; 

  //CONSTRUCTOR
  constructor(private formBuilder: FormBuilder,private router: Router,private adminService: AdministradorService,
              private route: ActivatedRoute ) { 
                this.tiposDeRol = ['ADMINISTRADOR', 'EMPLEADO'];
   }

   ngOnInit(): void {
    
    this.route.params.subscribe((params) => {
      this.idUsuario = params['id'];
      //this.obtenerUsuarioId(params['id']);
    });

    // Inicializamos el formulario reactivo
    this.detalleUsuarioForm = new FormGroup({
      identificacion: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      rol: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      estadoUsuario: new FormControl(false),
      telefono: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
    });

    // Llamamos a la API para obtener el usuario por ID
    this.obtenerUsuarioId(this.idUsuario);
  }

   

  public guardarUsuario(){

    if (this.detalleUsuarioForm.valid) {
      // Confirmación antes de actualizar
      Swal.fire({
        title: '¿Estás seguro de actualizar este usuario?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          // Llamada al servicio para actualizar el usuario
          const usuarioActualizado = this.detalleUsuarioForm.value;
          this.adminService.actualizarUsuario(this.idUsuario, usuarioActualizado).subscribe({
            next: (response) => {
              Swal.fire({
                title: '¡Actualización exitosa!',
                text: 'El usuario ha sido actualizado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              // Actualizar el componente después de la actualización
              this.obtenerUsuarioId(this.idUsuario); // Vuelve a cargar los datos del usuario
              
           
            },
            error: (error) => {
              Swal.fire({
                title: 'Error',
                text: error.error?.respuesta.mensaje || 'No se pudo actualizar el usuario.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          });
        }
      });
    } else {
      // Si el formulario no es válido
      Swal.fire({
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos requeridos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
  public obtenerEstado(){
    
    this.estadoU=this.detalleUsuarioForm.value.estadoUsuario;
    return this.estadoU;
  }

  public obtenerUsuarioId(id:string){
    this.adminService.obtenerUsuarioId(id).subscribe({
      next: (data) => {
        this.detalleUsuarioForm.patchValue({
          identificacion: data.identificacion,
          nombre: data.nombre,
          rol: data.rol,
          email: data.email,
          estadoUsuario: data.estadoUsuario,
          telefono: data.telefono,
          direccion: data.direccion,
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error: No se encontrado registro.',
          text: error.error?.respuesta.mensaje || 'Error desconocido',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      },
    });
    }


  


}
