import { Routes } from '@angular/router';
import { PokemonDetalles } from './Componentes/pokemon-detalles/pokemon-detalles';
import { Pokemon } from './Componentes/pokemon/pokemon';
import { CargaComponent } from './Componentes/carga-component/carga-component';
import { Login } from './Componentes/login/login';
import { Component } from '@angular/core';
import { RegistroUsuario } from './Componentes/registro-usuario/registro-usuario';

export const routes: Routes = [
    
    {path : "", component : CargaComponent},
    {path: "pokemon",component:Pokemon},
    {path:"pokemon/:id", component: PokemonDetalles},
    {path:"login", component: Login},
    {path:"registro",component: RegistroUsuario}
];
