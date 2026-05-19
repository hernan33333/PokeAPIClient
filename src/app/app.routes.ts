import { Routes } from '@angular/router';
import { PokemonDetalles } from './Componentes/pokemon-detalles/pokemon-detalles';
import { Pokemon } from './Componentes/pokemon/pokemon';
import { CargaComponent } from './Componentes/carga-component/carga-component';
import { Login } from './Componentes/login/login';
import { Component } from '@angular/core';
import { RegistroUsuario } from './Componentes/registro-usuario/registro-usuario';
import { ActivarCuenta } from './Componentes/activar-cuenta/activar-cuenta';
import { PokemonFavoritos } from './Componentes/pokemon-favoritos/pokemon-favoritos';
import { UsuarioDetalles } from './Componentes/usuario-detalles/usuario-detalles';
import { PokemonAPi } from './Componentes/pokemon-api/pokemon-api';
import { Usuario } from './Componentes/usuario/usuario';

export const routes: Routes = [
    
    {path : "", component : CargaComponent},
    {path: "pokemon",component:Pokemon},
    {path:"pokemon/:id", component: PokemonDetalles},
    {path:"login", component: Login},
    {path:"registro",component: RegistroUsuario},
    {path: "activate", component: ActivarCuenta},
    {path: "favoritos/:id", component: PokemonFavoritos},
    {path: "usuario/:id", component: UsuarioDetalles},
    {path: "Pokeapi", component: PokemonAPi},
    {path: "usuario", component: Usuario},
    {path: "carga", component: CargaComponent},
];
