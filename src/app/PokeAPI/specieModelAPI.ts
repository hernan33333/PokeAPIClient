import { BaseModelAPI } from "./baseModelAPI";
import { FlavorModelAPI } from "./flavorModelAPI";

export interface SpecieModelAPI{
    base_happiness: number,
    capture_rate: number,
    color: BaseModelAPI,
    egg_groups: BaseModelAPI[],
    evolution_chain: string,
    evolves_from_species: BaseModelAPI,
    flavor_text_entries: FlavorModelAPI[]
}