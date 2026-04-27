import { Routes } from '@angular/router';
import { PokemonDetalles } from './Componentes/pokemon-detalles/pokemon-detalles';
import { Pokemon } from './Componentes/pokemon/pokemon';

export const routes: Routes = [
    {path: "",component:Pokemon},
    {path:"GetById/:id", component: PokemonDetalles}
];
