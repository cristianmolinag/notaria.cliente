import { IndexRegistroCivilMatrimonioPage } from './../index-registro-civil-matrimonio/index-registro-civil-matrimonio';
import { IndexRegistroCivilDefuncionPage } from './../index-registro-civil-defuncion/index-registro-civil-defuncion';
import { HttpProvider } from './../../providers/http/http';
import { RegistroTramitePage } from './../registro-tramite/registro-tramite';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Tramite } from '../../models/global';
import { IndexRegistroCivilNacimientoPage } from '../index-registro-civil-nacimiento/index-registro-civil-nacimiento';

@Component({
  selector: 'page-tramites',
  templateUrl: 'tramites.html',
})
export class TramitesPage {


  tituloTabla: string;
  usuario: any;
  tramites: Tramite[];
  indexNacimiento: any;
  indexMatrimonio: any;
  indexDefuncion: any;
  isCliente: boolean = false;
  isFuncionario: boolean = false;
  registroTramite: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private user: UserProvider,
    private http: HttpProvider,
    private toastCtrl: ToastController) {

    this.usuario = this.user.getUsuario();

    this.validaUsuario();
    this.registroTramite = RegistroTramitePage;
    this.indexDefuncion = IndexRegistroCivilDefuncionPage;
    this.indexMatrimonio = IndexRegistroCivilMatrimonioPage;
    this.indexNacimiento = IndexRegistroCivilNacimientoPage;

  }

  gettramitesAdmin() {
    this.http.get('tramite/').then((data: any) => this.tramites = data.data);
  }

  gettramitesCliente() {
    this.http.get('tramite/buscar/' + this.usuario.id).then((data: any) => this.tramites = data.data);
  }

  validaUsuario() {

    if (this.usuario.perfil.nombre === 'Cliente') {
      this.tituloTabla = 'Historial de trámites:'
      this.gettramitesCliente();
      this.isCliente = true;
    }
    if (this.usuario.perfil.nombre === 'Funcionario') {
      this.tituloTabla = 'Historial de trámites:'
      this.gettramitesAdmin();
      this.isFuncionario = true;
    }
  }

  rechazar(item) {
    var tr = new Tramite();
    tr.estado_tramite_id = 3;
    this.http.put('tramite/' + item, tr).then((data: any) => {
      const toast = this.toastCtrl.create({
        message: 'Registro rechazado con éxito',
        duration: 3000
      });
      toast.present();
      this.validaUsuario();
    });
  }

  autorizar(item) {
    var tr = new Tramite();
    tr.estado_tramite_id = 2;
    this.http.put('tramite/' + item, tr).then((data: any) => {
      const toast = this.toastCtrl.create({
        message: 'Registro autorizado con éxito',
        duration: 3000
      });
      toast.present();
      this.validaUsuario();
    });
  }

}
