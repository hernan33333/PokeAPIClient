import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PokemonModel } from '../Modelos/pokemon-model';
import { ResultadoModel } from '../Modelos/resultado-model';

@Injectable({
  providedIn: 'root',

})
export class PokemonService {

  private url:string = "http://192.167.0.90:8080/pokemon";

  public pokemones : PokemonModel[] = [];
  pokemon: any ={
    Nombre: "",
    Generacion: null,
    Tipos: null,
    Region: null
  }


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

  busqueda(
  pokemon: PokemonModel,
  offset:number
): Observable<ResultadoModel<PokemonModel>> {

  let params = new HttpParams();

  if (pokemon?.Generacion?.Id) {

    params = params.set(
      'Generacion',
      pokemon.Generacion.Id.toString()
    );
  }

if (pokemon?.Generacion?.Region?.id) {

  params = params.set(
    'Region',
    pokemon.Generacion.Region.id.toString()
  );
}

  if (
    pokemon?.Tipos &&
    pokemon.Tipos.length > 0 &&
    pokemon.Tipos[0]?.Id
  ) {

    params = params.set(
      'Tipo',
      pokemon.Tipos[0].Id.toString()
    );
  }

  params = params.set('offset', offset.toString());

  return this.http.get<ResultadoModel<PokemonModel>>(
    this.url + "/buscar",
    { params }
  );
}
}