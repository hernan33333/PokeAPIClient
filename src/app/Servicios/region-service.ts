import { Injectable } from '@angular/core';
import { RegionModel } from '../Modelos/region-model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ResultadoModel } from '../Modelos/resultado-model';

@Injectable({
  providedIn: 'root',
})
export class RegionesService {

  private url:string = "http://localhost:8080/pokeapi/region";

  constructor(
    private http : HttpClient
  ){};

  getAll() : Observable<RegionModel[]>{

    return this.http.get<ResultadoModel<RegionModel>>(this.url).pipe(map((resultRegion : ResultadoModel<RegionModel>) => resultRegion.objects as RegionModel[]));

  }

}
