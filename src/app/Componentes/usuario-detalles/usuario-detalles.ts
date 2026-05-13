import { ChangeDetectorRef, Component, inject } from '@angular/core';

import { UsuarioService } from '../../Servicios/usuario-service';

import { UsuarioModel } from '../../Modelos/usuario-model';

import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({

  selector: 'app-usuario-detalles',

  imports: [],

  templateUrl: './usuario-detalles.html',

  styleUrl: './usuario-detalles.css',

})

export class UsuarioDetalles {

  private UsuarioServicio = inject(UsuarioService)

  private CDR = inject(ChangeDetectorRef)

  private route = inject(ActivatedRoute);

  Usuario: UsuarioModel | undefined;

  ngOnInit(): void {

    this.route.paramMap.subscribe(params =>{

      const id = params.get('id');

      if(id){

        this.getUsuarioById(parseInt(id));

      }

    })

  }

  getUsuarioById(IdUsuario: number) {

    this.UsuarioServicio.getById(IdUsuario).subscribe(

      data => {

        if (data.correct) {

          if (data.object) {

            this.Usuario = data.object;

            this.CDR.detectChanges();

          } else {

            this.error("No se encontro el usuario");

          }

        } else {

          this.error("Error: " + data.errorMessage);

        }


      }

    )

  }

  error(mensaje:string){Swal.fire({icon: 'error',title: 'Oops...',text: mensaje,})}

  exito(mensaje:string){Swal.fire({icon: 'success', title: 'Listo', text: mensaje})}

}
