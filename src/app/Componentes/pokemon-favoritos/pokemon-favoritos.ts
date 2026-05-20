import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { PokemonModel } from '../../Modelos/pokemon-model';
import { PokemonService } from '../../Servicios/pokemon-service';
import { AuthService } from '../../Servicios/auth-service';
import { UsuarioModel } from '../../Modelos/usuario-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-favoritos',
  imports: [],
  templateUrl: './pokemon-favoritos.html',
  styleUrl: './pokemon-favoritos.css',
})
export class PokemonFavoritos {

  private PokemonServicio = inject(PokemonService);
  private AuthServicio = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  public router = inject(Router);
  public Usuario:UsuarioModel = this.AuthServicio.Usuario!;

  public Pokemons:PokemonModel[] = [];

  ObtenerFavoritos(IdUsuario: number){
    this.PokemonServicio.getFavoritos(IdUsuario).subscribe(
      data=>{
        if(data.correct){
          this.Pokemons = data.objects;
          this.cdr.detectChanges();
        }
      }
    )
  }

  ngOnInit(){
    this.ObtenerFavoritos(this.Usuario.idusuario);
  }

  /*Pokemon:PokemonModel = {
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
    
  }*/


}
