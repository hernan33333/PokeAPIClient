export interface ResultadoModel<T>{
    correct: boolean,
    errorMessage: string,
    ex: any,
    object: T,
    objects: T[]
}