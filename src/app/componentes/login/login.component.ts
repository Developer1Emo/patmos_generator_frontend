import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl, AbstractControlOptions, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule,ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { LoginDTO } from '../../dto/login-dto';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router,private authService: AuthService,
                private route: ActivatedRoute,private tokenService: TokenService ) {
    this.crearFormulario();
  }

  private crearFormulario() {
    
  }

   ngOnInit(): void {
  
      // Inicializamos el formulario reactivo
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
      });
    }

  public iniciarSesion() {
  
     if (this.loginForm.valid) {
        //------------------------
        const loginDTO = this.loginForm.value as LoginDTO; 

        this.authService.iniciarSesion(loginDTO).subscribe({
          next: (data) => {
            Swal.fire({
              title: 'Ingreso exitoso',
              text: 'Bienvenid@',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            })
            this.tokenService.login(data.respuesta.token);
            
          },
          error: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.error?.respuesta.mensaje || 'No se acceder.',
            });
          },
        });
        
        //------------------------ 
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
  
  
}