import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { LoginService } from '../../Servicios/login-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../Servicios/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private fb: FormBuilder, 
    private loginService:LoginService, 
    private cdr:ChangeDetectorRef,
    private AutenticacionServicio: AuthService) {}

  public correcto:boolean = true;
  private router = inject(Router);
  

  loginForm!: FormGroup;
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  login():void{
    if(this.loginForm.valid){

      const usuario = this.loginForm.value;
        
      console.log('Usuario:', usuario);

      this.AutenticacionServicio.iniciarSecion(usuario).subscribe(
        data=>{
          console.log(data)
          if(data.correct){
            this.correcto = true;
            this.router.navigate(["pokemon"])
          }else{
            this.correcto = false;
            this.cdr.detectChanges();
            this.error("Usuario o contraseña incorrectos");
          }
        }
      )
    }else {
      this.error("Credenciales Invalidas");
    }
  }

  


}
