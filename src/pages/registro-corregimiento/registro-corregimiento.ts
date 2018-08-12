import { Corregimiento, Municipio } from './../../models/global';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

@Component({
  selector: 'page-registro-corregimiento',
  templateUrl: 'registro-corregimiento.html',
})
export class RegistroCorregimientoPage {

  corregimiento: Corregimiento;
  municipios: Municipio;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private http: HttpProvider,
    private toastCtrl: ToastController) {

    if (this.navParams.get('data')) {
      this.corregimiento = this.navParams.get('data');
    } else {
      this.corregimiento = new Corregimiento();
    }

    this.http.get('municipio').then((data: any) => this.municipios = data.data);
  }

  guardar() {
    if (!this.corregimiento.nombre ||
      !this.corregimiento.municipio_id) {
      const toast = this.toastCtrl.create({
        message: "hay campos vacíos",
        duration: 3000
      });
      toast.present();
    }
    else {
      if (this.corregimiento.id) {
        this.http.put('corregimiento/' + this.corregimiento.id, this.corregimiento).then((data: any) => this.viewCtrl.dismiss());
      } else {
        this.http.post('corregimiento', this.corregimiento).then((data: any) => this.viewCtrl.dismiss());
      }
    }
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
