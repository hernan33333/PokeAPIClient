import { GeneracionModel } from "./generacion-model";
import { RegionModel } from "./region-model";
import { TipoModel } from "./tipo-model";

export interface BusquedaModel{
    Nombre: String,
    Id: number,
    Tipos: TipoModel[],
    Regiones: RegionModel[],
    Generaciones: GeneracionModel[]
    offset: number
}