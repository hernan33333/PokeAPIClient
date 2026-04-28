import { Component, Input } from "@angular/core";
import { PokemonModel } from "../../Modelos/pokemon-model";

@Component({
  selector: 'app-pokemon-carta',
  templateUrl: './pokemon-carta.html',
  styleUrls: ['./pokemon-carta.css']
})

export class PokemonCartaComponent{
  @Input() pokemon: any;
}
