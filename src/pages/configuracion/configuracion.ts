import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

  tiposDocumento: TipoDocumento[];
  formasPago: FormaPago[];
  nacionalidades: Nacionalidad[];
  estadosTramite: EstadoTramite[];
  generos: Genero[];
  tiposTramite: TipoTramite[];

  tipoDocumento: TipoDocumento;
  formaPago: FormaPago;
  nacionalidad: Nacionalidad;
  estadoTramite: EstadoTramite;
  genero: Genero;
  tipoTramite: TipoTramite;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private http: HttpProvider,
    private toastCtrl: ToastController) {

    this.getTiposDocumento();
    this.getFormasPago();
    this.getNacionalidades();
    this.getEstadosTramite();
    this.getGeneros();
    this.getTiposTramite();
  }


  getTiposDocumento() {
    this.http.get('tipo_documento').then((data: any) => {
      this.tiposDocumento = data;
    });
  }


  getFormasPago() {
    this.http.get('forma_pago').then((data: any) => {
      this.formasPago = data;
    });
  }

  getNacionalidades() {
    this.http.get('nacionalidad').then((data: any) => {
      this.nacionalidades = data;
    });
  }

  getEstadosTramite() {
    this.http.get('estado_tramite').then((data: any) => {
      this.estadosTramite = data;
    });
  }

  getGeneros() {
    this.http.get('genero').then((data: any) => {
      this.generos = data;
    });
  }

  getTiposTramite() {
    this.http.get('tipo_tramite').then((data: any) => {
      this.tiposTramite = data;
    });
  }


  guardarTipoDocumento(item: any) {

    if (!item)
      this.tipoDocumento = new TipoDocumento();
    else
      this.tipoDocumento = item;

    const prompt = this.alertCtrl.create({
      title: 'Tipo de documento',
      message: "Digite el nombre del tipo de documento",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre',
          value: this.tipoDocumento.nombre
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.tipoDocumento.nombre = data.nombre;
            if (this.tipoDocumento.id) {
              this.actTipoDocumento(this.tipoDocumento);
            }
            else {
              this.nuevoTipoDocumento(this.tipoDocumento);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  actTipoDocumento(data) {
    this.http.put('tipo_documento/' + data.id, data).then((data: any) => {
    });
  }

  nuevoTipoDocumento(data) {
    this.http.post('tipo_documento', data).then((data: any) => {
      this.tiposDocumento.push(data);
    });
  }


  guardarFormaPago(item: any) {

    if (!item)
      this.formaPago = new FormaPago();
    else
      this.formaPago = item;

    const prompt = this.alertCtrl.create({
      title: 'forma de pago',
      message: "Digite el nombre de la forma de pago",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre',
          value: this.formaPago.nombre
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.formaPago.nombre = data.nombre;
            if (this.formaPago.id) {
              this.actFormaPago(this.formaPago);
            }
            else {
              this.nuevoFormaPago(this.formaPago);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  actFormaPago(data) {
    this.http.put('forma_pago/' + data.id, data).then((data: any) => {
    });
  }

  nuevoFormaPago(data) {
    this.http.post('forma_pago', data).then((data: any) => {
      this.formasPago.push(data);
    });
  }

  guardarNacionalidad(item: any) {

    if (!item)
      this.nacionalidad = new Nacionalidad();
    else
      this.nacionalidad = item;

    const prompt = this.alertCtrl.create({
      title: 'Nacionalidad',
      message: "Digite el nombre de la nacionalidad",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre',
          value: this.nacionalidad.nombre
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.nacionalidad.nombre = data.nombre;
            if (this.nacionalidad.id) {
              this.actNacionalidad(this.nacionalidad);
            }
            else {
              this.nuevoNacionalidad(this.nacionalidad);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  actNacionalidad(data) {
    this.http.put('nacionalidad/' + data.id, data).then((data: any) => {
    });
  }

  nuevoNacionalidad(data) {
    this.http.post('nacionalidad', data).then((data: any) => {
      this.nacionalidades.push(data);
    });
  }

  guardarEstTramite(item: any) {

    if (!item)
      this.estadoTramite = new EstadoTramite();
    else
      this.estadoTramite = item;

    const prompt = this.alertCtrl.create({
      title: 'Estado de trámite',
      message: "Digite el nombre del estado de trámite",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre',
          value: this.estadoTramite.nombre
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.estadoTramite.nombre = data.nombre;
            if (this.estadoTramite.id) {
              this.actEstTramite(this.estadoTramite);
            }
            else {
              this.nuevoEstTramite(this.estadoTramite);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  actEstTramite(data) {
    this.http.put('estado_tramite/' + data.id, data).then((data: any) => {
    });
  }

  nuevoEstTramite(data) {
    this.http.post('estado_tramite', data).then((data: any) => {
      this.estadosTramite.push(data);
    });
  }

  guardarGenero(item: any) {

    if (!item)
      this.genero = new Genero();
    else
      this.genero = item;

    const prompt = this.alertCtrl.create({
      title: 'Genero',
      message: "Digite el genero",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre',
          value: this.genero.nombre
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.genero.nombre = data.nombre;
            if (this.genero.id) {
              this.actGenero(this.genero);
            }
            else {
              this.nuevoGenero(this.genero);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  actGenero(data) {
    this.http.put('genero/' + data.id, data).then((data: any) => {
    });
  }

  nuevoGenero(data) {
    this.http.post('genero', data).then((data: any) => {
      this.generos.push(data);
    });
  }

  guardarTipoTramite(item: any) {

    if (!item)
      this.tipoTramite = new TipoTramite();
    else
      this.tipoTramite = item;

    const prompt = this.alertCtrl.create({
      title: 'Genero',
      message: "Digite el tipo de trámite",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre',
          value: this.tipoTramite.nombre
        },
        {
          name: 'valor',
          placeholder: 'Valor',
          value: this.tipoTramite.valor,
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.tipoTramite.nombre = data.nombre;
            this.tipoTramite.valor = data.valor;

            if (this.tipoTramite.id) {
              this.actTipoTramite(this.tipoTramite);
            }
            else {
              this.nuevoTipoTramite(this.tipoTramite);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  actTipoTramite(data) {
    this.http.put('tipo_tramite/' + data.id, data).then((data: any) => {
    });
  }

  nuevoTipoTramite(data) {
    this.http.post('tipo_tramite', data).then((data: any) => {
      this.tiposTramite.push(data);
    });
  }
}

export class TipoDocumento {
  id: number;
  nombre?: string;
}
export class FormaPago {
  id: number;
  nombre?: string;
}

export class Nacionalidad {
  id: number;
  nombre?: string;
}

export class EstadoTramite {
  id: number;
  nombre?: string;
}

export class Genero {
  id: number;
  nombre?: string;
}

export class TipoTramite {
  id: number;
  nombre?: string;
  valor?: string;
}
