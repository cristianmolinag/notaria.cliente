import { RegistroTramitePage } from './../registro-tramite/registro-tramite';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-tramites',
  templateUrl: 'tramites.html',
})
export class TramitesPage {

  tituloTabla: string;
  isCliente: boolean = false;
  isAdmin: boolean = false;
  isFuncionario: boolean = false;
  registroTramite: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private user: UserProvider) {

    this.registroTramite = RegistroTramitePage

    const usuario = this.user.getUsuario()
    // if (usuario.perfil === 'cliente') {
    //   this.tituloTabla = 'Histórico de sus trámites:'
    //   this.isCliente = true;
    // }
  }
}
