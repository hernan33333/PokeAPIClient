import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PokemonModel } from '../Modelos/pokemon-model';
import { ResultadoModel } from '../Modelos/resultado-model';

@Injectable({
  providedIn: 'root',

})
export class PokemonService {

  private url:string = "http://192.167.0.172:8080/pokemon";

  public pokemones : PokemonModel[] = [];

  constructor(private http: HttpClient){};

  getAll():Observable<ResultadoModel<PokemonModel>>{
    return this.http.get<ResultadoModel<PokemonModel>>(this.url);
  }

  getAllPaginado(numero: number):Observable<ResultadoModel<PokemonModel>>{
    return this.http.get<ResultadoModel<PokemonModel>>(this.url+"?offset="+numero);
  }

  getById(IdPokemon: number):Observable<ResultadoModel<PokemonModel>>{
    return this.http.get<ResultadoModel<PokemonModel>>(this.url+"/"+IdPokemon);
  }

  busqueda(pokemon:PokemonModel):Observable<ResultadoModel<PokemonModel>>{
    const params = new HttpParams()
    .set('Generacion', pokemon.Generacion.Id)
    .set('Region', pokemon.Generacion.Region.id)
    .set('Tipo',pokemon.Tipos[0].Nombre)
    .set('offset',20)
    return this.http.get<ResultadoModel<PokemonModel>>(this.url+"/buscar",{params})
  }
}
