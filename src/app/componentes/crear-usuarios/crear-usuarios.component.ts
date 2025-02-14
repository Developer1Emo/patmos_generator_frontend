import { Component } from '@angular/core';
import { FormGroup, AbstractControlOptions, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CrearUsuarioDTO } from '../../dto/crear-usuario-dto';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-crear-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './crear-usuarios.component.html',
  styleUrl: './crear-usuarios.component.css'
})
export class CrearUsuariosComponent {

  crearUsuarioForm!: FormGroup;
  mensaje!: String;
  tiposDeRol: string[] ; 

  //CONSTRUCTOR
  constructor(private formBuilder: FormBuilder,private router: Router,private adminService: AdministradorService) { 
    
    this.crearFormulario();
    this.tiposDeRol = ['ADMINISTRADOR', 'EMPLEADO'];
   }
   
//tipoDeRol
  private crearFormulario() {
    this.crearUsuarioForm = this.formBuilder.group({
      identificacion: ['', [Validators.required]],
      nombreCompleto: ['', [Validators.required]],
      tipoDeRol: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]],
      direccion: ['', [Validators.required]],
      confirmaPassword: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]]
     },
    { validators: this.passwordsMatchValidator
     } as AbstractControlOptions
  );
   }

public crearUsuario(){
  const formValues = this.crearUsuarioForm.value;
  for (const key in formValues) {
    if (formValues.hasOwnProperty(key)) {
      console.log(`${key}: ${formValues[key]}`);
    }
  }
  
  const usuarioDTO = this.crearDTO();

  this.adminService.crearUsuario(usuarioDTO).subscribe({
    next: (data) => {
      this.mensaje=data?.respuesta.mensaje;
      Swal.fire({
        title: 'Creación exitosa',
        text: 'Se ha creado correctamente - '+this.mensaje,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
      this.router.navigate(["/home"]);
    },
    error: (error) => {
      Swal.fire({
        title: 'Error: No se ha podido registrar.',
        text: error.error?.respuesta.mensaje || 'Error desconocido',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
  });
}

private crearDTO(): CrearUsuarioDTO {
  const formValues = this.crearUsuarioForm.value; // Obtiene todos los valores del formulario
  const usuarioDTO: CrearUsuarioDTO = {
    identificacion: formValues.identificacion,
    nombreCompleto: formValues.nombreCompleto,
    rol: formValues.tipoDeRol,
    email: formValues.email,
    password: formValues.password,
    estadoUsuario:true,
    telefono: formValues.telefono,
    direccion: formValues.direccion
  };

  return usuarioDTO;
}

//ESTA ES UNA UTILIDAD PARA INDICAR AL USUARIO SI LAS CONTRASEÑAS COINCIDEN
passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmaPassword = formGroup.get('confirmaPassword')?.value;
    // Si las contraseñas no coinciden, devuelve un error, de lo contrario, null
    return password == confirmaPassword ? null : { passwordsMismatch: true };
   }

}
