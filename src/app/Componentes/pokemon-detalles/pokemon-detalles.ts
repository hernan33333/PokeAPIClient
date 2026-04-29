import { Component, Input, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { PokemonService } from '../../Servicios/pokemon-service';
import { PokemonModel } from '../../Modelos/pokemon-model';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-pokemon-detalles',
  imports: [RouterLink],
  templateUrl: './pokemon-detalles.html',
  styleUrl: './pokemon-detalles.css',
})
export class PokemonDetalles implements OnInit {

  public pokemon: PokemonModel | undefined;

  public urlImagen: string = "";

  constructor(private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute) { };

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.GetById(parseInt(id))
      }
    })
  }

  cambiarImagen(url: string){
      this.urlImagen = url;
      this.cdr.detectChanges();
    
  }

  reproducirGrito(url: string | undefined) {
    if (!url) {
      console.log("No hay audio disponible");
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
        this.pokemon = data.object;
        this.urlImagen = this.pokemon.Sprites.front_default;
        this.cdr.detectChanges();
      }
    )
  }
}
