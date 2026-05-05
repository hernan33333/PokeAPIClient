import { RolModel } from "./rol-model"

export interface UsuarioModel{
    idusuario: number,
    nombre: string,
    contraseña: string,
    correo: string
    rol: RolModel,
}