import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { LoginService } from '../../Servicios/login-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private fb: FormBuilder, private loginService:LoginService, private cdr:ChangeDetectorRef) {}

  public correcto:boolean = true;
  private router = inject(Router);

  loginForm!: FormGroup;
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login():void{
    if(this.loginForm.valid){

      const usuario = this.loginForm.value;

      console.log('Usuario:', usuario);

      this.loginService.iniciarSecion(usuario).subscribe(
        data=>{
          console.log(data)
          if(data.correct){
            this.correcto = true;
            this.router.navigate(["pokemon"])
          }else{
            this.correcto = false;
            this.cdr.detectChanges();
          }
        }
      )

    }else {

      console.log('Formulario no válido');

    }
  }

}