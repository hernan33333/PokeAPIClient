import { AbilitieModelAPI } from "./abilitieModelAPI";
import { BaseModelAPI } from "./baseModelAPI";
import { CriesModelAPI } from "./criesModelAPI";
import { SpecieModelAPI } from "./specieModelAPI";
import { SpriteModelAPI } from "./spriteModelAPI";
import { StatModelAPI } from "./statModelAPI";
import { TipeModelAPI } from "./tipeModelAPI";

export interface PokemonModelAPI{
    abilities: AbilitieModelAPI[],
    base_experience: number,
    cries: CriesModelAPI,
    forms: BaseModelAPI[],
    height: number,
    id: number,
    name: string,
    species: SpecieModelAPI,
    sprites: SpriteModelAPI,
    stats: StatModelAPI[],
    types: TipeModelAPI[],
    weight: number
}