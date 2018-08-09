import { UserProvider } from './../../providers/user/user';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { ConfiguracionPage } from '../configuracion/configuracion';
import { UsuariosPage } from '../usuarios/usuarios';
import { ConsultasPage } from '../consultas/consultas';
import { TramitesPage } from '../tramites/tramites';
import { CitasPage } from '../citas/citas';

@Component({
  selector: 'page-menu-funcionario',
  templateUrl: 'menu-funcionario.html',
})
export class MenuFuncionarioPage {
  @ViewChild('menuFuncionario') nav: Nav;

  rootPage: any;
  configuracion: any = ConfiguracionPage;
  usuarios: any = UsuariosPage;
  consultas: any = ConsultasPage;
  tramites: any = TramitesPage;
  citas: any = CitasPage;
  usuario: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private user: UserProvider) {
    this.rootPage = this.tramites;
    this.usuario = this.user.getUsuario();
  }


  abrirPagina(pagina: any) {
    this.nav.setRoot(pagina);
  }

}
