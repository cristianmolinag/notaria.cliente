import { UserProvider } from './../../providers/user/user';
import { IndexRegistroCivilMatrimonioPage } from './../index-registro-civil-matrimonio/index-registro-civil-matrimonio';
import { IndexRegistroCivilNacimientoPage } from './../index-registro-civil-nacimiento/index-registro-civil-nacimiento';
import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RCNacimiento, RCMatrimonio, RCDefuncion } from '../../models/global';
import { IndexRegistroCivilDefuncionPage } from '../index-registro-civil-defuncion/index-registro-civil-defuncion';

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
  usuario: any;

  registrosMatrimonio: RCMatrimonio[];
  registrosMatrimonioInit: RCMatrimonio[];
  registroMatrimonio: RCMatrimonio;
  indexRCMatrimonio: any;

  registrosDefuncion: RCDefuncion[];
  registrosDefuncionInit: RCDefuncion[];
  registroDefuncion: RCDefuncion;
  indexRCDefuncion: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    private user: UserProvider) {

    this.segmento = 'nacimiento';
    this.usuario = this.user.getUsuario();
    this.indexRCNacimiento = IndexRegistroCivilNacimientoPage;
    this.indexRCMatrimonio = IndexRegistroCivilMatrimonioPage;
    this.indexRCDefuncion = IndexRegistroCivilDefuncionPage;
    this.validaUsuario();

  }

  poblarDataFuncionario() {
    this.http.get('rc_nacimiento').then((data: any) => {
      this.registrosNacimiento = this.registrosNacimientoInit = data.data;
    });

    this.http.get('rc_matrimonio').then((data: any) => {
      this.registrosMatrimonio = this.registrosMatrimonioInit = data.data;
    });

    this.http.get('rc_defuncion').then((data: any) => {
      this.registrosDefuncion = this.registrosDefuncionInit = data.data;
    });
  }

  poblarDataCliente() {

    this.http.get('rc_nacimiento/cliente/' + this.usuario.id).then((data: any) => {
      this.registrosNacimiento = this.registrosNacimientoInit = data.data;
    });

    this.http.get('rc_matrimonio/cliente/' + this.usuario.id).then((data: any) => {
      this.registrosMatrimonio = this.registrosMatrimonioInit = data.data;
    });

    this.http.get('rc_defuncion/cliente/' + this.usuario.id).then((data: any) => {
      this.registrosDefuncion = this.registrosDefuncionInit = data.data;
    });
  }

  inicializarNacimiento() {
    this.registrosNacimiento = this.registrosNacimientoInit;
  }

  inicializarMatrimonio() {
    this.registrosMatrimonio = this.registrosMatrimonioInit;
  }

  inicializarDefuncion() {
    this.registrosDefuncion = this.registrosDefuncionInit;
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

  busquedaMatrimonio(ev: any) {
    this.inicializarMatrimonio();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.registrosMatrimonio = this.registrosMatrimonio.filter((item) => {
        return (item.indicativo_serial.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  busquedaDefuncion(ev: any) {
    this.inicializarDefuncion();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.registrosDefuncion = this.registrosDefuncion.filter((item) => {
        return (item.indicativo_serial.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  validaUsuario() {

    if (this.usuario.perfil.nombre === 'Cliente') {
      this.poblarDataCliente();
    }
    if (this.usuario.perfil.nombre === 'Funcionario') {
      this.poblarDataFuncionario();
    }
  }
}
