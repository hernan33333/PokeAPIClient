import { RegionModel } from "./region-model"

export interface GeneracionModel{
    IdGeneracion: number,
    Nombre: string
    Region: RegionModel
}