import { UserProvider } from './../../providers/user/user';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { TramitesPage } from '../tramites/tramites';
import { CitasPage } from '../citas/citas';
import { ConsultasPage } from '../consultas/consultas';

@Component({
  selector: 'page-menu-cliente',
  templateUrl: 'menu-cliente.html',
})
export class MenuClientePage {

  @ViewChild('menuCliente') nav: Nav;
  tramites = TramitesPage;
  citas = CitasPage;
  consultas = ConsultasPage;
  rootPage: any;
  usuario: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private user: UserProvider) {

    this.usuario = this.user.getUsuario();
    this.rootPage = this.tramites;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuClientePage');
  }

  abrirPagina(pagina) {
    this.nav.setRoot(pagina);
  }

}
