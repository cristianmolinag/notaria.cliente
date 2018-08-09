import { UserProvider } from './../../providers/user/user';
import { HttpProvider } from './../../providers/http/http';
import { RegistroClientePage } from './../registro-cliente/registro-cliente';
import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { MenuClientePage } from '../menu-cliente/menu-cliente';
import { MenuFuncionarioPage } from '../menu-funcionario/menu-funcionario';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('home') nav: NavController;
  home: string;
  menuFuncionario: any = MenuFuncionarioPage;
  menuCliente: any = MenuClientePage;
  rootPage: any;
  registroCliente: any;
  cliente: Cliente;
  funcionario: Funcionario;


  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private http: HttpProvider,
    private user: UserProvider) {

    this.cliente = new Cliente;
    this.funcionario = new Funcionario;

    this.home = 'consulta';
    this.registroCliente = RegistroClientePage;
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
      this.http.post('cliente/login', this.cliente).then((data: any) => {

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
            message: "Bienvenido " + data.data.nombre,
            duration: 3000
          });
          toast.present();
          this.navCtrl.setRoot(this.menuCliente);
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
      this.http.post('funcionario/login', this.funcionario).then((data: any) => {

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
            message: "Bienvenido " + data.data.nombre,
            duration: 3000
          });
          toast.present();
          this.navCtrl.setRoot(this.menuFuncionario);
        }
      });
    }
  }
}

export class Cliente {
  correo: string;
  contrasena: string;
}

export class Funcionario {
  correo: string;
  contrasena: string;
  firma: string;
  usuario_id;
}
