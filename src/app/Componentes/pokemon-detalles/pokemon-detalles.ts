import { Component, Input, AfterViewInit } from '@angular/core';
import { PokemonService } from '../../Servicios/pokemon-service';
import { PokemonModel } from '../../Modelos/pokemon-model';
import { RouterLink } from "@angular/router";

declare var Chart: any;

@Component({
  selector: 'app-pokemon-detalles',
  imports: [RouterLink],
  templateUrl: './pokemon-detalles.html',
  styleUrl: './pokemon-detalles.css',
})
export class PokemonDetalles implements AfterViewInit {

  ngAfterViewInit(): void {
    const ctx = (document.getElementById('radarChart') as HTMLCanvasElement).getContext('2d');

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['PS', 'Ataque', 'Defensa', 'At. Especial', 'Def. Especial', 'Velocidad'],
        datasets: [
          
          {
            label: 'Rayquaza',
            data: [105, 150, 90, 150, 90, 95],
            fill: true,
            backgroundColor: 'rgba(60, 30, 30, 0.8)',
            borderColor: 'rgb(0, 0, 0)',
            pointBackgroundColor: 'rgb(0, 0, 0)'
          }
        ],
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
          },
          scales: {
            r: {
              min:0,
              max:260,
              ticks: {
                stepSize: 50,
                color: '#000000',
                font: {
                  size: 14
                }

              }
            }
          },
          pointLabels: {
            font: {
              size: 16
            },
            color: '#000'
          },
          grid:{
            color:'#ccc'
          }
        }
      }
    });
  }

  @Input() id = '';

  idPokemon: number = parseInt(this.id);

  public pokemon: PokemonModel | undefined;

  constructor(private pokemonService: PokemonService) { };

  ngOnInit() {
    this.GetById(parseInt(this.id));
  }

  reproducirGrito(url: string) {
    const audio = new Audio(url);
    audio.play().catch(err => {
      console.log("No se pudo reproducir: " + err);
    })
  }

  GetById(IdPokemon: number) {
    this.pokemonService.getById(IdPokemon).subscribe(
      data => {
        this.pokemon = data;
      }
    )
  }
}
