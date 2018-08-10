import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TipoTramite, Tramite } from '../../models/global';

@Component({
  selector: 'page-registro-tramite',
  templateUrl: 'registro-tramite.html',
})
export class RegistroTramitePage {

  tiposTramite: TipoTramite[];
  tramite: Tramite;

  busqueda: any;





  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider) {

    this.busqueda = Array<{ tipo_tramite: string, filtro: string }>();



  }

  getTiposTramite() {
    this.http.get('tipo_tramite').then((data: TipoTramite[]) => {
      this.tiposTramite = data;
    });

  }

}



