import { RCNacimiento, Busqueda, RCDefuncion, RCMatrimonio, Inscrito } from './../../models/global';
import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { TipoTramite, Tramite } from '../../models/global';
import { RegistroPagoPage } from '../registro-pago/registro-pago';

@Component({
  selector: 'page-registro-tramite',
  templateUrl: 'registro-tramite.html',
})
export class RegistroTramitePage {

  tiposTramite: TipoTramite[];
  tramite: Tramite;
  nacimiento: RCNacimiento;
  defuncion: RCDefuncion;
  matrimonio: RCMatrimonio;
  busqueda: Busqueda;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController) {

    this.getTiposTramite();
    this.busqueda = new Busqueda();
    this.nacimiento = new RCNacimiento;
    this.defuncion = new RCDefuncion;
    this.matrimonio = new RCMatrimonio;

  }

  getTiposTramite() {
    this.http.get('tipo_tramite').then((data: any) => {
      this.tiposTramite = data.data;
    });
  }

  buscar(filtro: any) {
    if (this.busqueda.tipo_tramite && this.busqueda.filtro) {
      this.http.get('tramite/' + filtro).then((data: any) => {
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
    else {
      const toast = this.toastCtrl.create({
        message: 'Hay campos vacíos',
        duration: 3000
      });
      toast.present();
    }
  }

  solicitarNacimiento() {
    const modal = this.modalCtrl.create(RegistroPagoPage, { registro: this.nacimiento, busqueda: this.busqueda });
    modal.present();
  }

  solicitarMatrimonio() {
    const modal = this.modalCtrl.create(RegistroPagoPage, { registro: this.matrimonio, busqueda: this.busqueda });
    modal.present();
  }

  solicitarDefuncion() {
    const modal = this.modalCtrl.create(RegistroPagoPage, { registro: this.defuncion, busqueda: this.busqueda });
    modal.present();
  }
}



