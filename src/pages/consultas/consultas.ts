import { IndexRegistroCivilNacimientoPage } from './../index-registro-civil-nacimiento/index-registro-civil-nacimiento';
import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RCNacimiento } from '../../models/global';

@Component({
  selector: 'page-consultas',
  templateUrl: 'consultas.html',
})
export class ConsultasPage {

  segmento: string;
  registrosNacimiento: RCNacimiento[];
  registrosNacimientoInit: RCNacimiento[];
  registroNacimiento: RCNacimiento;
  indexRCNacimiento: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider) {

    this.segmento = 'nacimiento';

    this.indexRCNacimiento = IndexRegistroCivilNacimientoPage;
    this.poblarData();

  }

  poblarData() {
    this.http.get('rc_nacimiento').then((data: any) => {
      this.registrosNacimiento = this.registrosNacimientoInit = data.data;
    });
  }

  inicializarNacimiento() {
    this.registrosNacimiento = this.registrosNacimientoInit;
  }

  busquedaNacimiento(ev: any) {
    this.inicializarNacimiento();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.registrosNacimiento = this.registrosNacimiento.filter((item) => {
        return (item.inscrito.nuip.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  busquedaMatrimonio($event) {

  }

  busquedaDefuncion($event) {

  }

}
