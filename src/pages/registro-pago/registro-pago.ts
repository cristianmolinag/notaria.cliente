import { HttpProvider } from './../../providers/http/http';
import { UserProvider } from './../../providers/user/user';
import { RCNacimiento, Usuario, Busqueda, TipoTramite } from './../../models/global';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-registro-pago',
  templateUrl: 'registro-pago.html',
})
export class RegistroPagoPage {

  registro: any;
  busqueda: Busqueda;
  usuario: Usuario;
  tipo_tramite: TipoTramite;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private user: UserProvider,
    private http: HttpProvider) {

    this.usuario = user.getUsuario();
    this.registro = this.navParams.get('registro');
    this.busqueda = this.navParams.get('busqueda');
    this.tipo_tramite = new TipoTramite();

    console.log(this.busqueda.tipo_tramite);

    this.http.get('tipo_tramite/' + this.busqueda.tipo_tramite).then((data: any) => this.tipo_tramite = data.data);
  }

  pagar() {
    console.log(this.registro);
  }

}
