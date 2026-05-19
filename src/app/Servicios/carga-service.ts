import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn : 'root',
})
export class CargaService{
    isLoading = new BehaviorSubject<boolean>(false);
    progres = new BehaviorSubject<number>(0);

    show(){
        this.isLoading.next(true);
    }
    hide(){
        this.isLoading.next(false);
        this.progres.next(0);
    }
    setProgres(value:number){
        this.progres.next(value);
    }
}