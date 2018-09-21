import { RegistroCitaPage } from './../registro-cita/registro-cita';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-citas',
  templateUrl: 'citas.html',
})
export class CitasPage {


  usuario: any;
  isCliente: boolean;
  isFuncionario: boolean;

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private user: UserProvider) {


    this.isCliente = false;
    this.isFuncionario = false;
    this.usuario = this.user.getUsuario();
    this.validaUsuario();
  }

  registroCita() {
    const modal = this.modalCtrl.create(RegistroCitaPage);
    modal.onDidDismiss(data => {
      // this.http.get('tramite').then((data: any) => this.tramites = data.data);
      // this.navCtrl.pop();
    });
    modal.present();
  }

  validaUsuario() {

    if (this.usuario.perfil.nombre === 'Cliente') {
      this.isCliente = true;
    }
    if (this.usuario.perfil.nombre === 'Funcionario') {
      this.isFuncionario = true;
    }
  }

}
