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

@Component({
  selector: 'app-pokemon',
  imports: [PokemonCartaComponent],
  standalone: true,
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.css',
})
export class Pokemon implements OnInit{
  public pokemon: PokemonModel | undefined;

  public pokemons: PokemonModel[] = [];
  public tipos: TipoModel[] = [];
  public regiones: RegionModel[] = [];
  public generaciones: GeneracionModel[] = [];

  public regionSeleccionada: Number = 0;
  public generacionSeleccionada: Number = 0;
  public tipoSeleccionado: number = 0;
  
  constructor(
    private pokemonService: PokemonService, 
    private tiposService: TipoService,
    private regionService: RegionesService,
    private generacionService: GeneracionService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ){};

  ngOnInit(){

    if(this.pokemonService.pokemones.length <= 0){

      this.router.navigate([""]);

    }

    this.GetAllRegiones();
    this.GetAllGeneraciones();
    this.GetAllTipos();

  }

  GetAll(){

    this.pokemonService.getAll().subscribe(

      pokemonesData =>
        {

        this.pokemons = pokemonesData;
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
      data=>{
        this.pokemon = data.object;
      }
    )
  }

}
