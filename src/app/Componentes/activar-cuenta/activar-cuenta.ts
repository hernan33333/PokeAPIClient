import { Component } from '@angular/core';
import { LoginService } from '../../Servicios/login-service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../Modelos/usuario-model';

@Component({
  selector: 'app-activar-cuenta',
  imports: [],
  templateUrl: './activar-cuenta.html',
  styleUrl: './activar-cuenta.css',
})
export class ActivarCuenta {

  constructor(private loginServicio: LoginService, private aRoute: ActivatedRoute,
    private router: Router
  ){}

  token: string | null = null;

  ngOnInit():void{
    this.aRoute.queryParamMap.subscribe(params=>{
      this.token = params.get('token');
    })
    if(this.token!=null){
      console.log("token: "+this.token)
      this.activarCuenta(this.token);
    }
  }


  activarCuenta(token:string):void{
    this.loginServicio.activarUsuario(token).subscribe(
      data =>{
        if(data.correct){
          console.log("Objeto: "+ data.object)
          //this.iniciarSesion(data.object);
        }else{
          this.error("Activacion incorrecta");
        }
      }
    )
  }

  iniciarSesion(usuario:UsuarioModel):void{
    this.loginServicio.iniciarSecion(usuario).subscribe(
      data =>{
        if(data.correct){
          this.router.navigate(["pokemon"]);
        }else{
          this.error("Error al inicar sesion");
        }
      }
    )
  }

  error(message: string) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
      });
    }
}
