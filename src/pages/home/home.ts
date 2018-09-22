import { UserProvider } from './../../providers/user/user';
import { HttpProvider } from './../../providers/http/http';
import { RegistroClientePage } from './../registro-cliente/registro-cliente';
import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { RCNacimiento, RCDefuncion, RCMatrimonio } from '../../models/global';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  frmLogin: FormGroup;
  frmConsulta: FormGroup;
  @ViewChild('home') nav: NavController;
  home: string;
  rootPage: any;
  registroCliente: any;
  nacimiento: RCNacimiento;
  defuncion: RCDefuncion;
  matrimonio: RCMatrimonio;


  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private http: HttpProvider,
    private user: UserProvider,
    private storage: Storage,
    private frmBuilder: FormBuilder) {

    this.nacimiento = new RCNacimiento;
    this.defuncion = new RCDefuncion;
    this.matrimonio = new RCMatrimonio;


    this.frmLogin = this.frmBuilder.group({
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      contrasena: ['', Validators.required],
    });

    this.frmConsulta = this.frmBuilder.group({
      documento: ['', Validators.required],
    })

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

  login() {
    this.http.post('usuario/login', this.frmLogin.value).then((data: any) => {

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

  consulta() {
    // console.log(this.frmConsulta.value.documento);

    this.http.get('tramite/' + this.frmConsulta.value.documento).then((data: any) => {
      if (!!data.data) {
        if (!data.mensaje) {

          var tipo_registro = data.data.tipo_registro;
          console.log(tipo_registro);
          switch (tipo_registro) {
            case "rc_nacimiento":
              this.defuncion.indicativo_serial = null;
              this.matrimonio.indicativo_serial = null;
              this.nacimiento = data.data;
              break;
            case "rc_matrimonio":
              this.nacimiento.indicativo_serial = null;
              this.defuncion.indicativo_serial = null;
              this.matrimonio = data.data;
              break;
            case "rc_defuncion":
              this.matrimonio.indicativo_serial = null;
              this.nacimiento.indicativo_serial = null;
              this.defuncion = data.data;
              break;
            default:
              break;
          }

        }
      }
      else {
        const toast = this.toastCtrl.create({
          message: 'No se encontraron registros',
          duration: 3000
        });
        toast.present();
      }
    });

  }

}
