import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../Servicios/api-service';
import { PokemonApiModel } from '../../ModelosAPI/pokemonapi-model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-api',
  imports: [],
  templateUrl: './pokemon-api.html',
  styleUrl: './pokemon-api.css',
})
export class PokemonAPi {

  private ApiServicio = inject(ApiService)

  public listaPokemon = toSignal(this.ApiServicio.GetAll(),{initialValue:[]});

  ElimitarPokemones(){
    this.ApiServicio.LimpiarListaPokemons();
  }
}
