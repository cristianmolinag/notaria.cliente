import { HttpProvider } from './../../providers/http/http';
import { RegistroCitaPage } from './../registro-cita/registro-cita';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Cita } from '../../models/global';

@Component({
  selector: 'page-citas',
  templateUrl: 'citas.html',
})
export class CitasPage {


  usuario: any;
  isCliente: boolean;
  isFuncionario: boolean;
  citas: Cita[];

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private http: HttpProvider,
    private user: UserProvider) {


    this.isCliente = false;
    this.isFuncionario = false;
    this.usuario = this.user.getUsuario();
    this.validaUsuario();
  }

  registroCita() {
    const modal = this.modalCtrl.create(RegistroCitaPage);
    modal.onDidDismiss(data => {
      this.validaUsuario();
    });
    modal.present();
  }

  validaUsuario() {

    if (this.usuario.perfil.nombre === 'Cliente') {
      this.http.get('cita/' + this.usuario.id).then((data: any) => this.citas = data.data);
      this.isCliente = true;
    }
    if (this.usuario.perfil.nombre === 'Funcionario') {
      this.http.get('cita').then((data: any) => this.citas = data.data);
      this.isFuncionario = true;
    }
  }

  cerrar(item) {
    this.http.put('cita/' + item, { estado: 'Cerrada' }).then((data: any) => this.validaUsuario());
  }

  cancelar(item) {
    this.http.put('cita/' + item, { estado: 'Cancelada' }).then((data: any) => this.validaUsuario());
  }

}
