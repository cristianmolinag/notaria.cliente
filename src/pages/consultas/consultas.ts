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

  registroNacimiento: RCNacimiento;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider) {

    this.segmento = 'nacimiento';

    this.poblarData();

  }

  poblarData() {
    this.http.get('rc_nacimiento').then((data: any) => this.registrosNacimiento = data.data);
  }

  busquedaNacimiento($event) {

  }

  busquedaMatrimonio($event) {

  }

  busquedaDefuncion($event) {

  }

}
