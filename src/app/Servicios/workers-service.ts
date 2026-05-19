import { Injectable, NgZone } from "@angular/core";
import { CargaComponent } from "../Componentes/carga-component/carga-component";
import { CargaService } from "./carga-service";

@Injectable({
    providedIn : 'root',
})
export class workersService{
    private worker!: Worker;

    constructor(private zone: NgZone ,private cargaService: CargaService){}
    procesarDatos(bigArray: any[]){
        if(typeof Worker !== 'undefined'){
            const worker = new Worker(
                new URL('../workers/loading.worker', import.meta.url)
            );

this.cargaService.show();
worker.onmessage = ({ data }) => {
    this.zone.run(() => {
        const progreso = typeof data === 'number' ? data : data.progress;
        
        this.cargaService.setProgres(progreso);

        if (progreso >= 100) {
            this.cargaService.hide();
            worker.terminate();
        }
    });
};
worker.onerror = (error) => {
    this.zone.run(() => {
        console.error('El Worker falló en segundo plano:', error);
        this.cargaService.hide();
        worker.terminate();
    });
};

            };
            this.worker.postMessage(bigArray);
        }
    }