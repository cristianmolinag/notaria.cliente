import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Municipio, Departamento } from '../../models/global';
import { HttpProvider } from '../../providers/http/http';

@Component({
  selector: 'page-registro-municipio',
  templateUrl: 'registro-municipio.html',
})
export class RegistroMunicipioPage {

  municipio: Municipio;
  departamentos: Departamento[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private http: HttpProvider,
    private toastCtrl: ToastController) {

    if (this.navParams.get('data')) {
      this.municipio = this.navParams.get('data');
    } else {
      this.municipio = new Municipio();
    }

    this.http.get('departamento').then((data: any) => this.departamentos = data.data);
  }

  guardar() {
    if (!this.municipio.nombre ||
      !this.municipio.departamento_id) {
      const toast = this.toastCtrl.create({
        message: "hay campos vacíos",
        duration: 3000
      });
      toast.present();
    }
    else {
      if (this.municipio.id) {
        this.http.put('municipio/' + this.municipio.id, this.municipio).then((data: any) => this.viewCtrl.dismiss());
      } else {
        this.http.post('municipio', this.municipio).then((data: any) => this.viewCtrl.dismiss());
      }
    }
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
