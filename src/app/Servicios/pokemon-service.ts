import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonModel } from '../Modelos/pokemon-model';
import { ResultadoModel } from '../Modelos/resultado-model';

@Injectable({
  providedIn: 'root',

})
export class PokemonService {

  private url:string = "http://localhost:8080/pokemon";

  constructor(private http: HttpClient){};

  getAll():Observable<PokemonModel[]>{
    return this.http.get<PokemonModel[]>(this.url);
  }

  getById(IdPokemon: number):Observable<ResultadoModel<PokemonModel>>{
    return this.http.get<ResultadoModel<PokemonModel>>(this.url+"/"+IdPokemon);
  }
}
