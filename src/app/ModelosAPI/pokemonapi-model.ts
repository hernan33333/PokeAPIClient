import { abilityApiModel } from "./abilityapi-model";
import { BaseApiModel } from "./baseapi-model";
import { CriesAPIModel } from "./criesapiModel";
import { spriteApiModel } from "./spritesapi-model";
import { StatApiModel } from "./statapi-model";
import { TypesApiModel } from "./typesapi-model";

export interface PokemonApiModel{
    abilities: abilityApiModel[],
    base_experience: number,
    cries: CriesAPIModel,
    forms: BaseApiModel[],
    height: number,
    held_items: number,
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    name: string,
    order: string,
    species: BaseApiModel,
    sprites: spriteApiModel,
    stats: StatApiModel[],
    types:TypesApiModel[],
    weight: number
}