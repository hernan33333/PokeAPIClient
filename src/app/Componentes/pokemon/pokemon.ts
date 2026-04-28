import { Component } from '@angular/core';
import { PokemonService } from '../../Servicios/pokemon-service';
import { PokemonModel } from '../../Modelos/pokemon-model';
import { TipoService } from '../../Servicios/tipos-service';
import { TipoModel } from '../../Modelos/tipo-model';
import { PokemonCartaComponent } from '../pokemon-carta/pokemon-carta';

@Component({
  selector: 'app-pokemon',
  imports: [PokemonCartaComponent],
  standalone: true,
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.css',
})
export class Pokemon {

  public pokemons: PokemonModel[] = [];
  public tipos: TipoModel[] = [];
  constructor(private pokemonService: PokemonService, private tiposService: TipoService){};

  GetAll(){
    this.pokemonService.getAll().subscribe(
      data =>{
        this.pokemons = data;
      }
    )
  }

  GetAllTipos(){
    this.tiposService.getAll().subscribe(
      data=>{
        this.tipos = data;
      }
    )
  }




}
