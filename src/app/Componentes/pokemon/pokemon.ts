import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PokemonService } from '../../Servicios/pokemon-service';
import { PokemonModel } from '../../Modelos/pokemon-model';
import { TipoService } from '../../Servicios/tipos-service';
import { TipoModel } from '../../Modelos/tipo-model';
import { PokemonCartaComponent } from '../pokemon-carta/pokemon-carta';
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

  offset: number = 19;
  paso: number = 19;

  constructor(private pokemonService: PokemonService,
    private tiposService: TipoService,
    private cdr: ChangeDetectorRef) { };

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


  GetAll() {
    this.pokemonService.getAll().subscribe(
      data => {
        this.pokemons = data.objects;
        this.cdr.detectChanges();
      }
    )
  }

  GetAllTipos() {
    this.tiposService.getAll().subscribe(
      data => {
        this.tipos = data;
      }
    )
  }

  GetById(id: number) {
    this.pokemonService.getById(id).subscribe(
      data => {
        this.pokemon = data.object;
        this.cdr.detectChanges();
      }
    )
  }
}
