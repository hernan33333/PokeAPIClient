import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PokemonService } from '../../Servicios/pokemon-service';
import { PokemonModel } from '../../Modelos/pokemon-model';
import { TipoService } from '../../Servicios/tipos-service';
import { TipoModel } from '../../Modelos/tipo-model';
import { PokemonCartaComponent } from '../pokemon-carta/pokemon-carta';
import { Router } from '@angular/router';
import { RegionModel } from '../../Modelos/region-model';
import { GeneracionModel } from '../../Modelos/generacion-model';
import { GeneracionService } from '../../Servicios/generacion-service';
import { RouterLink } from '@angular/router';
import { RegionService } from '../../Servicios/region-service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon',
  imports: [PokemonCartaComponent, RouterLink, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.css',
})
export class Pokemon implements OnInit {
  public pokemon: PokemonModel | undefined;

  public pokemons: PokemonModel[] = [];
  public tipos: TipoModel[] = [];
  public generaciones: GeneracionModel[] = [];
  public regiones: RegionModel[] = [];
  private formularioReactivo = inject(FormBuilder);

  public RegionDefecto: RegionModel = {
    id: 0,
    Generacion: 0,
    Nombre: "Ninguna opcion seleccionada"
  }

  public GeneracionDefecto: GeneracionModel = {
    Id: 0,
    Nombre: "Ninguna opcion seleccionda",
    Region: this.RegionDefecto
  }

  public TipoDefecto: TipoModel = {
    Id: 0,
    Nombre: "Ninguna opcion seleccionada",
    Generacion: 0
  }

  public form: FormGroup = this.formularioReactivo.group({
    Nombre: [''],
    Region: [this.RegionDefecto],
    Generacion: [this.GeneracionDefecto],
    Tipos: [this.TipoDefecto]
  })

  offset: number = 19;
  paso: number = 19;

  constructor(
    private pokemonService: PokemonService,
    private tiposService: TipoService,
    private regionService: RegionService,
    private generacionService: GeneracionService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { };



  ngOnInit(): void {

    if (this.pokemonService.pokemones.length <= 0) {

      this.router.navigate([""]);

    } else {

      this.cargarPokemons();
      this.GetAllGeneraciones();
      this.GetAllRegiones();
      this.GetAllTipos();

    }

  }

  cambioPagina(direccion: 'sig' | 'ant') {

    if (direccion === 'sig') {
      this.offset += this.paso;

      if (this.offset > 1350) {
        this.offset = 0;
      }
    } else {
      this.offset -= this.paso;

      if (this.offset < 0) {
        this.offset = 1350 - this.paso;
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

  GetAll() {

    this.pokemonService.getAll().subscribe(

      pokemonesData => {

        this.pokemons = pokemonesData.objects;
        this.cdr.detectChanges();

      },
      error => {

        console.log("Hubo un problema al consultar los pokemones: ", error);


      }
    )
  }

  GetAllTipos() {

    this.tiposService.getAll().subscribe(

      tiposData => {

        this.tipos = tiposData.objects;
        this.cdr.detectChanges();

      },
      error => {

        console.log("Hubo un problema al obtener los tipos: ", error);


      }
    )
  }

  GetAllRegiones() {

    this.regionService.getAll().subscribe(

      regionesData => {

        this.regiones = regionesData.objects;
        this.cdr.detectChanges();


      },
      error => {

        console.log("Hubo un problema al obtener las regiones: ", error);

      }

    );

  }

  GetAllGeneraciones() {

    this.generacionService.getAll().subscribe(

      generacionesData => {

        this.generaciones = generacionesData.objects;
        this.cdr.detectChanges();

      },
      error => {

        console.log("Hubo un problema al obtener las generaciones: ", error);


      }


    );

  }

  GetById(id: number) {

    this.pokemonService.getById(id).subscribe(

      pokemonData => {

        this.pokemon = pokemonData.object;

      }
    )
  }

  busqueda() {
    console.log(this.form.value)
    this.pokemon = this.form.value as PokemonModel;
    console.log(this.pokemon)
    this.pokemonService.busqueda(this.pokemon).subscribe({
      next: (data) => {
        if (data.correct) {
          this.pokemons = data.objects;
          this.cdr.detectChanges();
        } else {
          console.log("error:" + data.errorMessage);
        }
      }
    })
  }
}



