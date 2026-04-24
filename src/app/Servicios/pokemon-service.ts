import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonModel } from '../Modelos/pokemon-model';

@Injectable({
  providedIn: 'root',

})
export class PokemonService {

  private url:string = "";

  constructor(private http: HttpClient){};

  getAll():Observable<PokemonModel[]>{
    return this.http.get<PokemonModel[]>(this.url);
  }

  getById(IdPokemon: number):Observable<PokemonModel>{
    return this.http.get<PokemonModel>(this.url+IdPokemon);
  }
}
