import { BaseModelAPI } from "./baseModelAPI";

export interface ResultadoModelAPI{
    count: number,
    next: string,
    previous: string,
    results: BaseModelAPI[]
}