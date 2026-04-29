import { Routes } from '@angular/router';
import { PokemonDetalles } from './Componentes/pokemon-detalles/pokemon-detalles';
import { Pokemon } from './Componentes/pokemon/pokemon';
import { CargaComponent } from './Componentes/carga-component/carga-component';

export const routes: Routes = [
    
    {path : "", component : CargaComponent},
    {path: "pokemon",component:Pokemon},
    {path:"pokemon/:id", component: PokemonDetalles}

];
