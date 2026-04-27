import { Component } from '@angular/core';
import { PokemonService } from '../../Servicios/pokemon-service';
import { PokemonModel } from '../../Modelos/pokemon-model';

@Component({
  selector: 'app-pokemon',
  imports: [],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.css',
})
export class Pokemon {

  public pokemons: PokemonModel[] = [];
  constructor(private pokemonService: PokemonService){};

  GetAll(){
    this.pokemonService.getAll().subscribe(
      data =>{
        this.pokemons = data;
      }
    )
  }




}
