import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { ConfiguracionPage } from '../configuracion/configuracion';
import { UsuariosPage } from '../usuarios/usuarios';
import { ConsultasPage } from '../consultas/consultas';
import { TramitesPage } from '../tramites/tramites';
import { CitasPage } from '../citas/citas';

@Component({
  selector: 'page-menu-admin',
  templateUrl: 'menu-admin.html',
})
export class MenuAdminPage {
  @ViewChild('menuAdmin') nav: Nav;

  rootPage: any;
  configuracion: any = ConfiguracionPage;
  usuarios: any = UsuariosPage;
  consultas: any = ConsultasPage;
  tramites: any = TramitesPage;
  citas: any = CitasPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.rootPage = this.tramites;
  }

  abrirPagina(pagina: any) {
    this.nav.setRoot(pagina);
  }

}
