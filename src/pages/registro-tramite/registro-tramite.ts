import { RegistroPagoPage } from './../registro-pago/registro-pago';
import { RCNacimiento, Busqueda } from './../../models/global';
import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { TipoTramite, Tramite } from '../../models/global';

@Component({
  selector: 'page-registro-tramite',
  templateUrl: 'registro-tramite.html',
})
export class RegistroTramitePage {

  tiposTramite: TipoTramite[];
  tramite: Tramite;
  registro: RCNacimiento;
  busqueda: Busqueda;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController) {

    this.busqueda = new Busqueda();
    this.registro = new RCNacimiento();
    this.getTiposTramite();
  }

  getTiposTramite() {
    this.http.get('tipo_tramite').then((data: any) => {
      this.tiposTramite = data.data;
    });
  }

  buscar(filtro: any) {
    if (this.busqueda.tipo_tramite && this.busqueda.filtro) {
      this.http.get('rc_nacimiento/' + filtro).then((data: any) => {
        if (!!data.data) {
          if (!data.mensaje) {
            this.registro = data.data;
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
    else {
      const toast = this.toastCtrl.create({
        message: 'Hay campos vacíos',
        duration: 3000
      });
      toast.present();
    }

  }

  solicitar() {
    const modal = this.modalCtrl.create(RegistroPagoPage, { registro: this.registro, busqueda: this.busqueda });
    modal.present();
  }

}



