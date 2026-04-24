import { Component, Input } from '@angular/core';
import { PokemonService } from '../../Servicios/pokemon-service';
import { PokemonModel } from '../../Modelos/pokemon-model';

@Component({
  selector: 'app-pokemon-detalles',
  imports: [],
  templateUrl: './pokemon-detalles.html',
  styleUrl: './pokemon-detalles.css',
})
export class PokemonDetalles {

  @Input() id = '';

  public pokemon: PokemonModel | undefined;

  constructor(private pokemonService: PokemonService){};

  ngOnInit(){
    this.GetById(parseInt(this.id));
  }

  GetById(IdPokemon: number){
    this.pokemonService.getById(IdPokemon).subscribe(
      data=>{
        this.pokemon = data;
      }
    )
  }
}
