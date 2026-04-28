import { Component, Input, AfterViewInit, ChangeDetectorRef, inject } from '@angular/core';
import { PokemonService } from '../../Servicios/pokemon-service';
import { PokemonModel } from '../../Modelos/pokemon-model';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

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

  constructor(
    private pokemonService: PokemonService,
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
