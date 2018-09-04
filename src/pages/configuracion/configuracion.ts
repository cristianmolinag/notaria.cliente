import { RegistroCorregimientoPage } from './../registro-corregimiento/registro-corregimiento';
import { RegistroDepartamentoPage } from './../registro-departamento/registro-departamento';
import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { FormaPago, TipoDocumento, Nacionalidad, EstadoTramite, Genero, TipoTramite, GrupoSangre, RH, Antecedente, Pais, Departamento, Municipio, Corregimiento } from '../../models/global';
import { RegistroMunicipioPage } from '../registro-municipio/registro-municipio';

@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

  segmento: string;

  gruposSangre: GrupoSangre[];
  factoresRH: RH[];
  tiposDocumento: TipoDocumento[];
  formasPago: FormaPago[];
  nacionalidades: Nacionalidad[];
  estadosTramite: EstadoTramite[];
  generos: Genero[];
  tiposTramite: TipoTramite[];
  antecedentes: Antecedente[];
  paises: Pais[];
  paisesInit: Pais[];
  departamentos: Departamento[];
  departamentosInit: Departamento[];
  municipios: Municipio[];
  municipiosInit: Municipio[];
  corregimientos: Corregimiento[];
  corregimientosInit: Corregimiento[];

  grupoSangre: GrupoSangre;
  factorRH: RH;
  tipoDocumento: TipoDocumento;
  formaPago: FormaPago;
  nacionalidad: Nacionalidad;
  estadoTramite: EstadoTramite;
  genero: Genero;
  tipoTramite: TipoTramite;
  antecedente: Antecedente;
  pais: Pais;
  departamento: Departamento;
  municipio: Municipio;
  corregimiento: Corregimiento;

  registroDepartamento: any;
  registroMunicipio: any;
  registroCorregimiento: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private http: HttpProvider,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController) {

    this.getData();
    this.segmento = 'grupoSanguneo';

    this.registroDepartamento = RegistroDepartamentoPage;
    this.registroMunicipio = RegistroMunicipioPage;
    this.registroCorregimiento = RegistroCorregimientoPage;
  }

  getData() {

    this.http.get('grupo_sanguineo').then((data: any) => this.gruposSangre = data.data);
    this.http.get('factor_rh').then((data: any) => this.factoresRH = data.data);
    this.http.get('tipo_documento').then((data: any) => this.tiposDocumento = data.data);
    this.http.get('forma_pago').then((data: any) => this.formasPago = data.data);
    this.http.get('estado_tramite').then((data: any) => this.estadosTramite = data.data);
    this.http.get('genero').then((data: any) => this.generos = data.data);
    this.http.get('tipo_tramite').then((data: any) => this.tiposTramite = data.data);
    this.http.get('antecedente').then((data: any) => this.antecedentes = data.data);
    this.http.get('pais').then((data: any) => this.paises = this.paisesInit = data.data);
    this.http.get('departamento').then((data: any) => this.departamentos = this.departamentosInit = data.data);
    this.http.get('municipio').then((data: any) => this.municipios = this.municipiosInit = data.data);
    this.http.get('corregimiento').then((data: any) => this.corregimientos = this.corregimientosInit = data.data);

  }


  guardarGrupoSangre(item: any) {

    if (!item)
      this.grupoSangre = new GrupoSangre();
    else
      this.grupoSangre = item;

    const prompt = this.alertCtrl.create({
      title: 'Tipo de sangre',
      message: "Digite el nombre del grupo sanguineo",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre',
          value: this.grupoSangre.nombre
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
            this.grupoSangre.nombre = data.nombre;
            if (this.grupoSangre.id) {
              this.actGrupoSangre(this.grupoSangre);
            }
            else {
              this.nuevoGrupoSangre(this.grupoSangre);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  actGrupoSangre(data) {
    this.http.put('grupo_sanguineo/' + data.id, data).then((data: any) => {
    });
  }

  nuevoGrupoSangre(data) {
    this.http.post('grupo_sanguineo', data).then((data: any) => {
      this.gruposSangre.push(data.data);
    });
  }

  guardarFactorRH(item: any) {

    if (!item)
      this.factorRH = new RH();
    else
      this.factorRH = item;

    const prompt = this.alertCtrl.create({
      title: 'Factor RH',
      message: "Digite el nombre del factor RH",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre',
          value: this.factorRH.nombre
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
            this.factorRH.nombre = data.nombre;
            if (this.factorRH.id) {
              this.actFactorRH(this.factorRH);
            }
            else {
              this.nuevoFactorRH(this.factorRH);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  actFactorRH(data) {
    this.http.put('factor_rh/' + data.id, data).then((data: any) => {
    });
  }

  nuevoFactorRH(data) {
    this.http.post('factor_rh', data).then((data: any) => {
      this.factoresRH.push(data.data);
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
      this.tiposDocumento.push(data.data);
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
      this.formasPago.push(data.data);
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
      this.nacionalidades.push(data.data);
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
      this.estadosTramite.push(data.data);
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
      this.generos.push(data.data);
    });
  }

  guardarTipoTramite(item: any) {

    if (!item)
      this.tipoTramite = new TipoTramite();
    else
      this.tipoTramite = item;

    const prompt = this.alertCtrl.create({
      title: 'Tipo de trámite',
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
      this.tiposTramite.push(data.data);
    });
  }

  guardarAntecedente(item: any) {

    if (!item)
      this.antecedente = new Antecedente();
    else
      this.antecedente = item;

    const prompt = this.alertCtrl.create({
      title: 'Antecedente',
      message: "Digite el Antecedente",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre',
          value: this.antecedente.nombre
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
            this.antecedente.nombre = data.nombre;

            if (this.antecedente.id) {
              this.actAntecedente(this.antecedente);
            }
            else {
              this.nuevoAntecedente(this.antecedente);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  actAntecedente(data) {
    this.http.put('antecedente/' + data.id, data).then();
  }

  nuevoAntecedente(data) {
    this.http.post('antecedente', data).then((data: any) => this.antecedentes.push(data.data));
  }

  guardarPais(item: any) {

    if (!item)
      this.pais = new Pais();
    else
      this.pais = item;

    const prompt = this.alertCtrl.create({
      title: 'Pais',
      message: "Digite el pais",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre',
          value: this.pais.nombre
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
            this.pais.nombre = data.nombre;

            if (this.pais.id) {
              this.actPais(this.pais);
            }
            else {
              this.nuevoPais(this.pais);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  actPais(data) {
    this.http.put('pais/' + data.id, data).then();
  }

  nuevoPais(data) {
    this.http.post('pais', data).then((data: any) => this.paises.push(data.data));
  }

  guardarDepartamento(item) {
    let modal = this.modalCtrl.create(this.registroDepartamento, { data: item });
    modal.onDidDismiss(data => {
      this.http.get('departamento').then((data: any) => this.departamentos = data.data);
    });
    modal.present();
  }

  guardarMunicipio(item) {
    let modal = this.modalCtrl.create(this.registroMunicipio, { data: item });
    modal.onDidDismiss(data => {
      this.http.get('municipio').then((data: any) => this.municipios = data.data);
    });
    modal.present();
  }

  guardarCorregimiento(item) {
    let modal = this.modalCtrl.create(this.registroCorregimiento, { data: item });
    modal.onDidDismiss(data => {
      this.http.get('corregimiento').then((data: any) => this.corregimientos = data.data);
    });
    modal.present();
  }

  inicializarPaises() {
    this.paises = this.paisesInit;
  }

  inicializarDepartamentos() {
    this.departamentos = this.departamentosInit;
  }

  inicializarMunicipios() {
    this.municipios = this.municipiosInit;
  }

  inicializarCorregimientos() {
    this.corregimientos = this.corregimientosInit;
  }

  filtrarPaises(ev: any) {
    this.inicializarPaises();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.paises = this.paises.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  filtrarDepartamentos(ev: any) {
    this.inicializarDepartamentos();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.departamentos = this.departamentos.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.pais.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  filtrarMunicipios(ev: any) {
    this.inicializarMunicipios();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.municipios = this.municipios.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.departamento.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  filtrarCorregimientos(ev: any) {
    this.inicializarCorregimientos();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.corregimientos = this.corregimientos.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.municipio.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

}

