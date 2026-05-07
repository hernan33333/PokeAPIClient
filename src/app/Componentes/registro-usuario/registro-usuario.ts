import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../Servicios/login-service';
import { UsuarioModel } from '../../Modelos/usuario-model';
import { RolModel } from '../../Modelos/rol-model';

@Component({
  selector: 'app-registro-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './registro-usuario.html',
  styleUrl: './registro-usuario.css',
})
export class RegistroUsuario {
  constructor(private formBuilder: FormBuilder, private router: Router, private loginServicio: LoginService) { }

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

  agregar(): void {
    if (this.addForm.valid) {
      const usuario = this.addForm.value;
      console.log("usuario: " + usuario)
      if (usuario.contraseña != usuario.contraseñaConfirmacion) {
        this.correcto = false;
        this.error("Las contraseñas deben coincidir");
      }
      if (usuario.correo != usuario.correoConfirmacion) {
        this.correcto = false;
        this.error("Los correos deben coincidir")
      }

      if (this.correcto) {
        const User: UsuarioModel = {
          idusuario: 0,
          nombre: usuario.nombre,
          correo: usuario.correo,
          contraseña: usuario.contraseña,
          rol: this.rolDefecto
        }
     
        console.log("User: "+ User.nombre);
        console.log("Correo: "+ User.correo);
        console.log("Contraseña: "+ User.contraseña);
        console.log("Rol: "+User.rol.idRol)

        this.loginServicio.registrarUsuario(User).subscribe(
          data => {
            if (data.correct) {
              this.exito("Confirme su correo electronico")
              
            } else {
              this.error("Error al ingresar el usuario")
            }
            console.log(data)
          }
        )
      }


    } else {
      this.error("Datos invalidos");
    }
  }

}
