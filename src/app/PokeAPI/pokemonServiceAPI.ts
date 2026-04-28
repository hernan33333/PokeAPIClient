import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable, switchMap } from "rxjs";
import { PokemonModelAPI } from "./pokemonModelAPI";
import { ResultadoModelAPI } from "./resultadoModelAPI";

@Injectable({
    providedIn: 'root',
})

export class PokemonAPIService {
    private url: string = "https://pokeapi.co/api/v2/pokemon";

    constructor(private http: HttpClient) { };


    getById(id: number): Observable<PokemonModelAPI> {
        return this.http.get<PokemonModelAPI>(this.url +'/'+ id);
    }

    getByURL(URL: string): Observable<PokemonModelAPI> {
        return this.http.get<PokemonModelAPI>(URL);
    }

    getAll(): Observable<PokemonModelAPI[]> {
        return this.http.get<ResultadoModelAPI>(this.url).pipe(
            switchMap(resultado => {
                const pokemons = resultado.results.map(p => this.getByURL(p.url));
                return forkJoin(pokemons);
            })
        );
    }
}