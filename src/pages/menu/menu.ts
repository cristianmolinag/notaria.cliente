import { HomePage } from './../home/home';
import { Storage } from '@ionic/storage';
import { CitasPage } from './../citas/citas';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { UserProvider } from '../../providers/user/user';
import { ConfiguracionPage } from '../configuracion/configuracion';
import { ConsultasPage } from '../consultas/consultas';
import { UsuariosPage } from '../usuarios/usuarios';
import { RegistroCivilNacimientoPage } from '../registro-civil-nacimiento/registro-civil-nacimiento';
import { RegistroCivilMatrimonioPage } from '../registro-civil-matrimonio/registro-civil-matrimonio';
import { RegistroCivilDefuncionPage } from '../registro-civil-defuncion/registro-civil-defuncion';
import { TramitesPage } from '../tramites/tramites';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild('nav') nav: Nav;
  rootPage: any;
  titulo: string;
  usuario: any;
  menu: Array<{ titulo: string, componente: any }>;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    private user: UserProvider,
    private storage: Storage,
    private toastCtrl: ToastController) {
    this.menu = null;
    this.getPermisos();

    this.usuario = this.user.getUsuario().nombres;


  }

  getPermisos() {

    this.http.get('permiso/porUsuario/' + this.user.getUsuario().id).then((data: any) => {
      this.menu = data.data
      return this.menu;
    }).then((data: any) => {
      this.abrirPagina(this.menu[0]);
    });
  }

  abrirPagina(item: any) {
    switch (item.componente) {
      case 'ConfiguracionPage':
        item.componente = ConfiguracionPage;
        break;
      case 'UsuariosPage':
        item.componente = UsuariosPage;
        break;
      case 'RegistroCivilNacimientoPage':
        item.componente = RegistroCivilNacimientoPage;
        break;
      case 'RegistroCivilMatrimonioPage':
        item.componente = RegistroCivilMatrimonioPage;
        break;
      case 'RegistroCivilDefuncionPage':
        item.componente = RegistroCivilDefuncionPage;
        break;
      case 'ConsultasPage':
        item.componente = ConsultasPage;
        break;
      case 'TramitesPage':
        item.componente = TramitesPage;
        break;
      case 'CitasPage':
        item.componente = CitasPage;
        break;
    }

    this.titulo = item.titulo;
    this.nav.setRoot(item.componente);
  }

  cerrarSesion() {
    const toast = this.toastCtrl.create({
      message: "Cerrando sesión",
      duration: 3000
    });
    toast.present();
    this.storage.remove('usuario');
    this.navCtrl.setRoot(HomePage);
  }

}
