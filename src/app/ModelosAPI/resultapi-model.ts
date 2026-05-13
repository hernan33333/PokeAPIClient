import { BaseApiModel } from "./baseapi-model";

export interface ResultApiModel{
    count: number,
    next: string
    previous: string
    results: BaseApiModel[]
}