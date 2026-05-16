import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../Servicios/login-service';
import { UsuarioModel } from '../../Modelos/usuario-model';
import { RolModel } from '../../Modelos/rol-model';
import { AuthService } from '../../Servicios/auth-service';
import { form } from '@angular/forms/signals';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-registro-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './registro-usuario.html',
  styleUrl: './registro-usuario.css',
})
export class RegistroUsuario {
  constructor(private formBuilder: FormBuilder, private router: Router, private loginServicio: LoginService) { }

  private AutenticacionServicio = inject(AuthService);
  public correcto: boolean = true;

  addForm!: FormGroup;

  rolDefecto: RolModel = {
    idRol: 7,
    nombre: "MaestroPokemon"
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      correoConfirmacion: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required]],
      contraseñaConfirmacion: ['', [Validators.required]]
    });

  }

  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  exito(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Listo',
      text: message
    })
  }

  async agregar(): Promise<void> {
    if (this.addForm.invalid) {
      this.error("Datos inválidos");
      return;
    }

    const usuario = this.addForm.value;

    if (usuario.contraseña !== usuario.contraseñaConfirmacion) {
      this.error("Las contraseñas deben coincidir");
      return;
    }

    if (usuario.correo !== usuario.correoConfirmacion) {
      this.error("Los correos deben coincidir");
      return;
    }

    try {

      const respuestaCorreo = await lastValueFrom(this.loginServicio.comprobarCorreo(usuario.correo));
      if (respuestaCorreo.correct) {
        this.error("El correo ya está registrado");
        return;
      }

      const esNombreValido = await this.comprobarNombre();

      if(!esNombreValido){
        return;
      }

      const User: UsuarioModel = {
      idusuario: 0,
      nombre: usuario.nombre,
      correo: usuario.correo,
      contraseña: usuario.contraseña,
      rol: this.rolDefecto
    };

    const resultadoRegistro = await lastValueFrom(this.loginServicio.registrarUsuario(User));

    if(resultadoRegistro.correct){
      this.exito("Confirme su correo electronico");
      this.addForm.reset();
    }else{
      this.error("Error al ingresar al usuario");
    }


    } catch (error) {
      this.error("Ocurrio un error inesperado: " + error);
    }

  }

  async comprobarNombre(): Promise<boolean> {
    const username = this.addForm.get('nombre')?.value;

    if (!username) {
      this.error("Por favor, ingresa un nombre de usuario primero");
      return false;
    }

    try {

      const data = await lastValueFrom(this.loginServicio.comprobarNombre(username));

      if(data.correct){
        this.error("El nombre de usuario ya esta registrado");
        return false;
      }else{
        this.exito("El nombre de usuario esta disponible");
        return true;
      }
      
    } catch (error) {
      this.error("Error al conectar con el servidor: "+ error);
    return false;
    }
  }

}
