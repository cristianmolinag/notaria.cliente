import { UserProvider } from './../../providers/user/user';
import { HttpProvider } from './../../providers/http/http';
import { RegistroClientePage } from './../registro-cliente/registro-cliente';
import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Usuario } from '../../models/global';
import { MenuPage } from '../menu/menu';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('home') nav: NavController;
  home: string;
  rootPage: any;
  registroCliente: any;
  cliente: Usuario;
  funcionario: Usuario;


  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private http: HttpProvider,
    private user: UserProvider,
    private storage: Storage) {

    this.cliente = new Usuario;
    this.funcionario = new Usuario;
    this.home = 'consulta';
    this.registroCliente = RegistroClientePage;
  }

  ionViewDidEnter() {
    this.validarLogin();
  }

  validarLogin() {
    let usuario: any;
    this.storage.get('usuario').then((val) => {
      if (val) {
        this.user.setUsuario(val);
        this.navCtrl.setRoot(MenuPage);
      }
    });
  }

  loginCliente() {

    if (!this.cliente.correo || !this.cliente.contrasena) {
      const toast = this.toastCtrl.create({
        message: "Hay campos vacíos",
        duration: 3000
      });
      toast.present();
    }
    else {
      this.http.post('usuario/login/cliente', this.cliente).then((data: any) => {

        if (data.mensaje) {
          const toast = this.toastCtrl.create({
            message: data.mensaje,
            duration: 3000
          });
          toast.present();
        }
        else {
          this.user.setUsuario(data.data);
          const toast = this.toastCtrl.create({
            message: "Bienvenido " + data.data.nombres,
            duration: 3000
          });
          toast.present();
          this.storage.set('usuario', data.data);
          this.navCtrl.setRoot(MenuPage);
        }
      });
    }
  }

  loginFuncionario() {
    if (!this.funcionario.correo || !this.funcionario.contrasena) {
      const toast = this.toastCtrl.create({
        message: "Hay campos vacíos",
        duration: 3000
      });
      toast.present();
    }
    else {
      this.http.post('usuario/login/funcionario', this.funcionario).then((data: any) => {

        if (data.mensaje) {
          const toast = this.toastCtrl.create({
            message: data.mensaje,
            duration: 3000
          });
          toast.present();
        }
        else {
          this.user.setUsuario(data.data);
          const toast = this.toastCtrl.create({
            message: "Bienvenido " + data.data.nombres,
            duration: 3000
          });
          toast.present();
          this.storage.set('usuario', data.data);
          this.navCtrl.setRoot(MenuPage);
        }
      });
    }
  }
}
