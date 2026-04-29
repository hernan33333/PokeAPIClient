import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PokemonService } from '../../Servicios/pokemon-service';
import { PokemonModel } from '../../Modelos/pokemon-model';
import { TipoService } from '../../Servicios/tipos-service';
import { TipoModel } from '../../Modelos/tipo-model';
import { PokemonCartaComponent } from '../pokemon-carta/pokemon-carta';
import { Router } from '@angular/router';

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
  constructor(private pokemonService: PokemonService, 
    private tiposService: TipoService,
  private cdr: ChangeDetectorRef){};

  ngOnInit(): void{
    this.GetById(9);
  }


  ngOnInit(){

    if(this.pokemonService.pokemones.length <= 0){

      this.router.navigate([""]);

    }

  }

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

  GetById(id: number){
    this.pokemonService.getById(id).subscribe(
      data=>{
        this.pokemon = data.object;
        this.cdr.detectChanges();
      }
    )
  }




}
