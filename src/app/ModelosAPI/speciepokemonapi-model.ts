import { BaseApiModel } from "./baseapi-model";
import { FlavorTextApiModel } from "./flavortextapi-model";
import { VarietieApiModel } from "./varietietiapi-model";

export interface SpeciePokemonApiModel{
    base_happiness: number,
    capture_rate: number,
    color: BaseApiModel,
    egg_groups: BaseApiModel[],
    flavor_text_entries: FlavorTextApiModel[],
    has_gender_differences: boolean,
    hatch_counter: number,
    id: number,
    is_baby: boolean,
    is_legendary: boolean,
    is_mythical: boolean,
    name: string,
    order: number,
    shape: BaseApiModel,
    varieties: VarietieApiModel[]
}