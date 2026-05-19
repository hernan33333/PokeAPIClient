import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './Servicios/auth-service';
import { ApiService } from './Servicios/api-service';
import { PokemonApiModel } from './ModelosAPI/pokemonapi-model';
import { ActivarCuenta } from "./Componentes/activar-cuenta/activar-cuenta";
import { CargaComponent } from "./Componentes/carga-component/carga-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('PokeAPIClient');

  public authService = inject(AuthService);
  private PokeApiService = inject(ApiService);
  public listaPokemon = signal<PokemonApiModel[]>([]);

  CerrarSesion(){
    this.authService.logout();
  }

  constructor(){
    this.PokeApiService.GetAll().subscribe({
      next: (data) => this.listaPokemon.set(data),
      error: (err) => console.error("Error al cargar los pokemon", err)
    })
  }

  BorrarPokemons(){
    this.PokeApiService.LimpiarListaPokemons();
  }
  
}