import { Component, Input, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { PokemonService } from '../../Servicios/pokemon-service';
import { PokemonModel } from '../../Modelos/pokemon-model';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map, switchMap, tap } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-detalles',
  imports: [RouterLink],
  templateUrl: './pokemon-detalles.html',
  styleUrl: './pokemon-detalles.css',
})
export class PokemonDetalles implements OnInit {

  public pokemon: PokemonModel= {
    Id:1,
    Nombre:"Bulbasaur",
    Altura:7.9,
    Peso:6.5,
    Ataque:49,
    AtaqueEspecial:65,
    Defensa:49,
    DefensaEspecial:65,
    ExperienciaBase:10,
    Especie:{
      Id:1,
      Color:"Verde",
      Descripcion:" Este Pokémon tiene plantado un bulbo en el lomo desde que nace, esta semilla crece y se desarrolla a lo largo del ciclo de vida de Bulbasaur a medida que suceden sus evoluciones.",
      FelicidadBase:3,
      Forma:"Cuadrupedo",
      Habitat: ""
    },
    Generacion:{
      Id:1,
      Nombre:"",
      Region:{
        id:1,
        Generacion:1,
        Nombre:""
      },

    },
    Habilidades:[{
      IdHabilidad:1,
      Nombre:"chlorophyll",
      EfectosEntrada:["Sube la Velocidad cuando hace sol.",""],
    }],
    PuntosSalud:45,
    Sonido: "",
    Sprites:{
      front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
      front_female:"",
      front_shiny:"",
      front_shiny_female:""
    },
    Tipos:[{
      Id:1,
      Nombre:"Planta",
      Generacion:1
    },
  {
    Id:2,
    Nombre:"Veneno",
    Generacion:1
  }],
    Velocidad:45
    
  }
  

  public urlImagen: string = "";

  constructor(
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef,
    private location: Location,
    private route: ActivatedRoute) { };

  ngOnInit(): void {
    /*this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.GetById(parseInt(id))
      }
    })*/
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

  regresar(){
    this.location.back();
  }
}
