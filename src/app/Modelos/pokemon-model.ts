import { EspecieModel } from "./especie-model";
import { GeneracionModel } from "./generacion-model";
import { HabilidadModel } from "./habilidad-model";
import { RegionModel } from "./region-model";
import { SpriteModel } from "./sprite-model";
import { TipoModel } from "./tipo-model";

export interface PokemonModel {
    Id: number,
    Nombre: string,
    PuntosSalud: number,
    Ataque: number,
    Defensa: number,
    AtaqueEspecial: number,
    DefensaEspecial: number,
    Velocidad: number,
    Altura: DoubleRange,
    Peso: DoubleRange,
    ExperienciaBase: number,
    Sonido: string,
    Tipos: TipoModel[],
    Habilidades: HabilidadModel[],
    Generacion: GeneracionModel,
    Region: RegionModel,
    Sprites: SpriteModel,
    Especie: EspecieModel
}
