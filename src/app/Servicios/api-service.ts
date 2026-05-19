import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { forkJoin, Observable, of, switchMap, tap } from "rxjs";
import { ResultApiModel } from "../ModelosAPI/resultapi-model";
import { PokemonApiModel } from "../ModelosAPI/pokemonapi-model";
import { Pokemon } from "../Componentes/pokemon/pokemon";

@Injectable({
    providedIn:'root'
})
export class ApiService{
    private url = "https://pokeapi.co/api/v2/";
    private http = inject(HttpClient);
    private readonly ClaveAlmacenamiento = 'Pokemons';

    GetAll():Observable<PokemonApiModel[]>{
        const ListaPokemons = localStorage.getItem(this.ClaveAlmacenamiento);

        if(ListaPokemons){
            const pokemons = JSON.parse(ListaPokemons) as PokemonApiModel[];
            return of(pokemons);
        }

        return this.http.get<ResultApiModel>(this.url+"pokemon?limit=1&offset=0").pipe(
            switchMap(data =>{
                const ListaPokemon = data.results.map(item=>
                    this.http.get<PokemonApiModel>(item.url)
                );
                return forkJoin(ListaPokemon);
            }),
            tap(resultado =>{
                localStorage.setItem(this.ClaveAlmacenamiento, JSON.stringify(resultado));
            })
        );
    } 

    GetById(id:number):Observable<any>{
        return this.http.get<any>(this.url+"/pokemon/"+id)
    }

    LimpiarListaPokemons(){
        localStorage.removeItem(this.ClaveAlmacenamiento)
    }



}