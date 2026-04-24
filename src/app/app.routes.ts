import { Routes } from '@angular/router';
import { PokemonDetalles } from './Componentes/pokemon-detalles/pokemon-detalles';

export const routes: Routes = [
    {path:"GetById/:id", component: PokemonDetalles}
];
