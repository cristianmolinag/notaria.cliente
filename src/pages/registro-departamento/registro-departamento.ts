import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Departamento, Pais } from '../../models/global';

@Component({
  selector: 'page-registro-departamento',
  templateUrl: 'registro-departamento.html',
})
export class RegistroDepartamentoPage {

  departamento: Departamento;
  paises: Pais[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private http: HttpProvider,
    private toastCtrl: ToastController) {

    if (this.navParams.get('data')) {
      this.departamento = this.navParams.get('data');
    } else {
      this.departamento = new Departamento();
    }

    this.http.get('pais').then((data: any) => this.paises = data.data);

  }

  guardar() {
    if (!this.departamento.nombre ||
      !this.departamento.pais_id) {
      const toast = this.toastCtrl.create({
        message: "hay campos vacíos",
        duration: 3000
      });
      toast.present();
    }
    else {
      if (this.departamento.id) {
        this.http.put('departamento/' + this.departamento.id, this.departamento).then((data: any) => this.viewCtrl.dismiss());
      } else {
        this.http.post('departamento', this.departamento).then((data: any) => this.viewCtrl.dismiss());
      }
    }
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
