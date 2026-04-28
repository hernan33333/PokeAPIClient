import { Component, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { PokemonService } from '../../Servicios/pokemon-service';
import { PokemonModel } from '../../Modelos/pokemon-model';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { PokemonModelAPI } from '../../PokeAPI/pokemonModelAPI';

declare var Chart: any;

@Component({
  selector: 'app-pokemon-detalles',
  imports: [RouterLink],
  templateUrl: './pokemon-detalles.html',
  styleUrl: './pokemon-detalles.css',
})
export class PokemonDetalles {

  @Input() id!: string;

  public pokemon: PokemonModel | undefined;

  public poke: PokemonModelAPI | undefined;

  constructor(private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute) { };

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      const id = Number(params.get('id'));
      if(id){
        this.GetById(Number(id));
      }
    })
  }

  reproducirGrito(url: string | undefined) {
    if (!url) {
      console.warn("No hay una URL de audio disponible");
      return;
    }

    const audio = new Audio(url);
    audio.play().catch(err => {
      console.log("No se pudo reproducir: " + err);
    })
  }

  /*getById(Id: number) {
    this.pokemonServiceAPI.getById(Id).subscribe(
      data => {
        this.poke = data;
        this.cdr.detectChanges();
      }
    )
  }*/

  GetById(IdPokemon: number) {
    this.pokemonService.getById(IdPokemon).subscribe(
      data => {
        console.log(data.object);
        this.pokemon = data.object;
        console.log(data)
      }
    )
  }
}
