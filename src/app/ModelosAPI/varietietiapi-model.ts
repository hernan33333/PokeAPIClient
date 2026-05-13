import { BaseApiModel } from "./baseapi-model";

export interface VarietieApiModel{
    is_default: boolean,
    pokemon: BaseApiModel
}