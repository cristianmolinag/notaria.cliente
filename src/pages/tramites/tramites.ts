import { HttpProvider } from './../../providers/http/http';
import { RegistroTramitePage } from './../registro-tramite/registro-tramite';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Tramite } from '../../models/global';

@Component({
  selector: 'page-tramites',
  templateUrl: 'tramites.html',
})
export class TramitesPage {


  tituloTabla: string;
  tramites: Tramite[];
  isCliente: boolean = false;
  isFuncionario: boolean = false;
  registroTramite: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private user: UserProvider,
    private http: HttpProvider) {

    this.validaUsuario();
    this.registroTramite = RegistroTramitePage

  }

  gettramitesAdmin() {
    this.http.get('tramite/funcionario').then((data: any) => this.tramites = data.data);
  }

  validaUsuario() {
    const usuario = this.user.getUsuario();
    if (usuario.perfil.nombre === 'Cliente') {
      this.tituloTabla = 'Historial de trámites:'
      this.isCliente = true;
    }
    if (usuario.perfil.nombre === 'Funcionario') {
      this.tituloTabla = 'Historial de trámites:'
      this.isFuncionario = true;
    }
  }
}
