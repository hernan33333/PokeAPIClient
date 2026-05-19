import { Component, OnInit, inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../../Servicios/pokemon-service';
import { CargaService } from '../../Servicios/carga-service';   
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../Servicios/auth-service';

@Component({
  selector: 'app-carga-component',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './carga-component.html',
  styleUrl: './carga-component.css',
})
export class CargaComponent implements OnInit {
  rutaImagenCargando = "/pokeball-loading.png";

  constructor(
    private pokemonService: PokemonService,
    public cargaService: CargaService,   
    private router: Router,
    private zone: NgZone,
    private AuthServicio: AuthService,

  ) {}


  ngOnInit() {
    if(!this.AuthServicio.token()){
      this.router.navigate(["login"]);
    }
    this.cargaTradicional();
  }

  cargaTradicional() {

  this.cargaService.show();

  let progreso = 0;

  this.cargaService.setProgres(progreso);

  const intervalo = setInterval(() => {
    if (progreso < 85) {

      progreso += 1;

      this.cargaService.setProgres(progreso);
    }

  }, 80);

  this.pokemonService.getAll().subscribe({

    next: (pokemonesData: any) => {

      this.pokemonService.pokemones = pokemonesData.objects;

      clearInterval(intervalo);
      const finalInterval = setInterval(() => {

        progreso += 1;

        this.cargaService.setProgres(progreso);

        if (progreso >= 100) {

          clearInterval(finalInterval);

          setTimeout(() => {

            this.cargaService.hide();

            this.router.navigate(["pokemon"]);

          }, 300);
        }

      }, 20);
    },

    error: (error: any) => {

      clearInterval(intervalo);

      console.error(error);

      this.cargaService.hide();
    }
  });
  }
}