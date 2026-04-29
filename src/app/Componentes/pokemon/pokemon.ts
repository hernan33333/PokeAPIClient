import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PokemonService } from '../../Servicios/pokemon-service';
import { PokemonModel } from '../../Modelos/pokemon-model';
import { TipoService } from '../../Servicios/tipos-service';
import { TipoModel } from '../../Modelos/tipo-model';
import { PokemonCartaComponent } from '../pokemon-carta/pokemon-carta';
import { Router } from '@angular/router';
import { RegionModel } from '../../Modelos/region-model';
import { RegionesService } from '../../Servicios/region-service';
import { GeneracionModel } from '../../Modelos/generacion-model';
import { GeneracionService } from '../../Servicios/generacion-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  imports: [PokemonCartaComponent, RouterLink],
  standalone: true,
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.css',
})
export class Pokemon implements OnInit {
  public pokemon: PokemonModel | undefined;

  public pokemons: PokemonModel[] = [];
  public tipos: TipoModel[] = [];
  public regiones: RegionModel[] = [];
  public generaciones: GeneracionModel[] = [];

  public regionSeleccionada: Number = 0;
  public generacionSeleccionada: Number = 0;
  public tipoSeleccionado: number = 0;

  offset: number = 19;
  paso: number = 19;
  
  constructor(
    private pokemonService: PokemonService, 
    private tiposService: TipoService,
    private regionService: RegionesService,
    private generacionService: GeneracionService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ){};

  ngOnInit(): void {

    this.cargarPokemons();

  }

  cambioPagina(direccion: 'sig' | 'ant') {

    if (direccion === 'sig') {
      this.offset += this.paso;

      if (this.offset > 1025) {
        this.offset = 0;
      }
    } else {
      this.offset -= this.paso;

      if (this.offset < 0) {
        this.offset = 1025 - this.paso;
      }
    }

    this.GetAllRegiones();
    this.GetAllGeneraciones();
    this.GetAllTipos();

    this.cargarPokemons();

  }


  cargarPokemons() {

    this.pokemonService.getAllPaginado(this.offset).subscribe(

      data => {

        this.pokemons = data.objects;
        this.cdr.detectChanges();
        
      }
    )
  }

  GetAll(){

    this.pokemonService.getAll().subscribe(

      pokemonesData =>{

        this.pokemons = pokemonesData.objects;
        this.cdr.detectChanges();

      },
      error => {

        console.log("Hubo un problema al consultar los pokemones: ", error);


      }
    )
  }

  GetAllTipos(){

    this.tiposService.getAll().subscribe(

      tiposData => {

        this.tipos = tiposData;
        this.cdr.detectChanges();

      },
      error => {

        console.log("Hubo un problema al obtener los tipos: ", error);


      }
    )
  }

  GetAllRegiones(){

    this.regionService.getAll().subscribe(

      regionesData => {
        
        this.regiones = regionesData;
        this.cdr.detectChanges();
        

      },
      error => {

        console.log("Hubo un problema al obtener las regiones: ", error);

      }

    );

  }

  GetAllGeneraciones(){
    
    this.generacionService.getAll().subscribe(

      generacionesData => {

        this.generaciones = generacionesData;
        this.cdr.detectChanges();

      },
      error => {

        console.log("Hubo un problema al obtener las generaciones: ", error);


      }


    );

  }

  GetById(id: number){

    this.pokemonService.getById(id).subscribe(

      pokemonData => {

        this.pokemon = pokemonData.object;

      }
    )
  }
}