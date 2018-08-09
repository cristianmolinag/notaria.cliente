import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-registro-tramite',
  templateUrl: 'registro-tramite.html',
})
export class RegistroTramitePage {

  tipoTramite: TipoTramite;
  tramite: Tramite;



  constructor(public navCtrl: NavController, public navParams: NavParams) {


  }

}

export class TipoTramite {
  id: number;
  nombre: string;
}

export class Tramite {
  id: number;
  tipo_tramite_id: number;
  estado_tramite_id: number;
  forma_pago_id: number;
  cliente_id: number;


}


