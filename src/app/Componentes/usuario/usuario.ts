import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { UsuarioService } from '../../Servicios/usuario-service';
import { UsuarioModel } from '../../Modelos/usuario-model';

@Component({
  selector: 'app-usuario',
  imports: [],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario {

  private UsuarioServicio = inject(UsuarioService)
  private cdr = inject(ChangeDetectorRef)


  public ListaUsuarios: UsuarioModel[] = []


  GetAll(){
    this.UsuarioServicio.getAll().subscribe(
      data =>{
        console.log(data)
        this.ListaUsuarios = data.objects
        this.cdr.detectChanges();
      }
    )
  }

  ngOnInit(){
    this.GetAll();
  }


}
