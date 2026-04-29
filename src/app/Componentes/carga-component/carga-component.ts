import { Component, inject } from '@angular/core';
import { PokemonModel } from '../../Modelos/pokemon-model';
import { PokemonService } from '../../Servicios/pokemon-service';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon/pokemon';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-carga-component',
  imports: [],
  templateUrl: './carga-component.html',
  styleUrl: './carga-component.css',
})
export class CargaComponent {

  private pokemonService = inject(PokemonService);
  private router = inject(Router);

  rutaImagenCargando = "/pokeball-loading.png";

  ngOnInit(){

    this.GetAll();

  }

  GetAll(){

    this.pokemonService.getAll()
    .pipe(
      finalize(() => {
        
        this.router.navigate(["pokemon"])
      })
    )
    .subscribe(

      pokemonesData => this.pokemonService.pokemones = pokemonesData.objects,
      error => console.log("Hubo un error: ", error)
    );


  }

}
