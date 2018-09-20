import { IndexRegistroCivilMatrimonioPage } from './../index-registro-civil-matrimonio/index-registro-civil-matrimonio';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { RCMatrimonio, Pais, Departamento, Municipio, Corregimiento, TipoDocumento, LugarCelebracion } from '../../models/global';
import { HttpProvider } from '../../providers/http/http';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-registro-civil-matrimonio',
  templateUrl: 'registro-civil-matrimonio.html',
})
export class RegistroCivilMatrimonioPage {

  frmRegistro: FormGroup;
  registro: RCMatrimonio;

  file: File;

  paises: Pais[];
  departamentos: Departamento[];
  municipios: Municipio[];
  corregimientos: Corregimiento[];
  tipos_documento: TipoDocumento[];
  lugar_celebracion: LugarCelebracion;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    private toastCtrl: ToastController,
    private user: UserProvider,
    private frmBuilder: FormBuilder) {

    this.frmRegistro = this.frmBuilder.group({

      fecha_celebracion: ['', Validators.compose([Validators.required])],
      tipo_matrimonio: ['', Validators.compose([Validators.required])],
      tipo_documento: ['', Validators.compose([Validators.required])],
      notas_marginales: ['', { value: null, disabled: false }],
      lugar_celebracion: ['', { value: null, disabled: false }],

      lugar_celebracion_pais: ['', Validators.compose([Validators.required])],
      lugar_celebracion_departamento: ['', Validators.compose([Validators.required])],
      lugar_celebracion_municipio: ['', Validators.compose([Validators.required])],
      lugar_celebracion_corregimiento: ['', { value: null, disabled: false }],


      contrayente_uno_id: ['', { value: null, disabled: false }],
      contrayente_uno_nombres: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      contrayente_uno_tipo_documento_id: ['', Validators.compose([Validators.required])],
      contrayente_uno_documento: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],


      contrayente_dos_id: ['', { value: null, disabled: false }],
      contrayente_dos_nombres: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      contrayente_dos_tipo_documento_id: ['', Validators.compose([Validators.required])],
      contrayente_dos_documento: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],


      denunciante_id: ['', { value: null, disabled: false }],
      denunciante_nombres: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      denunciante_tipo_documento_id: ['', Validators.compose([Validators.required])],
      denunciante_documento: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],
      denunciante_firma: ['', { value: null, disabled: false }, Validators.compose([Validators.required])],

      capitulacion_lugar_escritura: ['', Validators.compose([Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      capitulacion_num_notaria: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(3), Validators.pattern('\\d+')])],
      capitulacion_num_escritura: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(10), Validators.pattern('\\d+')])],
      capitulacion_fecha_escritura: ['', { value: null, disabled: false }],

      hijo_uno_nombres: ['', Validators.compose([Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      hijo_uno_tipo_documento_id: ['', { value: null, disabled: false }],
      hijo_uno_documento: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],
      hijo_uno_indicativo_serial: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],

      hijo_dos_nombres: ['', Validators.compose([Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      hijo_dos_tipo_documento_id: ['', { value: null, disabled: false }],
      hijo_dos_documento: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],
      hijo_dos_indicativo_serial: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],

      providencia_tipo: ['', { value: null, disabled: false }],
      providencia_num_escritura: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],
      providencia_num_notaria: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],
      providencia_fecha: ['', { value: null, disabled: false }],
      providencia_firma: ['', { value: null, disabled: false }],
    });

    this.registro = new RCMatrimonio;
    this.lugar_celebracion = new LugarCelebracion;

    this.lugar_celebracion.pais = new Pais;
    this.lugar_celebracion.departamento = new Departamento;
    this.lugar_celebracion.municipio = new Municipio;
    this.lugar_celebracion.corregimiento = new Corregimiento;

    this.poblarCombos();
  }

  inicializar() {
    this.frmRegistro.controls['fecha_celebracion'].setValue(null);
    this.frmRegistro.controls['capitulacion_fecha_escritura'].setValue(null);
    this.frmRegistro.controls['providencia_fecha'].setValue(null);

    this.frmRegistro.reset({
      fecha_celebracion: [],
      tipo_matrimonio: [],
      tipo_documento: [],
      fecha_inscripcion: [],
      autoriza_firma: [],
      notas_marginales: [],
      lugar_celebracion: [],
      lugar_celebracion_pais: [],
      lugar_celebracion_departamento: [],
      lugar_celebracion_municipio: [],
      lugar_celebracion_corregimiento: [],
      contrayente_uno_id: [],
      contrayente_uno_nombres: [],
      contrayente_uno_tipo_documento_id: [],
      contrayente_uno_documento: [],
      contrayente_dos_id: [],
      contrayente_dos_nombres: [],
      contrayente_dos_tipo_documento_id: [],
      contrayente_dos_documento: [],
      denunciante_id: [],
      denunciante_nombres: [],
      denunciante_tipo_documento_id: [],
      denunciante_documento: [],
      denunciante_firma: [],
      capitulacion_lugar_escritura: [],
      capitulacion_num_notaria: [],
      capitulacion_num_escritura: [],
      capitulacion_fecha_escritura: [],
      hijo_uno_nombres: [],
      hijo_uno_tipo_documento_id: [],
      hijo_uno_documento: [],
      hijo_uno_indicativo_serial: [],
      hijo_dos_nombres: [],
      hijo_dos_tipo_documento_id: [],
      hijo_dos_documento: [],
      hijo_dos_indicativo_serial: [],
      providencia_tipo: [],
      providencia_num_escritura: [],
      providencia_num_notaria: [],
      providencia_fecha: [],
      providencia_firma: [],
    });
  }

  poblarCombos() {

    this.http.get('pais').then((data: any) => this.paises = data.data);
    this.http.get('departamento').then((data: any) => this.departamentos = data.data);
    this.http.get('municipio').then((data: any) => this.municipios = data.data);
    this.http.get('corregimiento').then((data: any) => this.corregimientos = data.data);
    this.http.get('tipo_documento').then((data: any) => this.tipos_documento = data.data);
  }

  guardarRegistro() {

    this.frmRegistro.patchValue({
      lugar_celebracion: this.frmRegistro.value.lugar_celebracion_pais.nombre + ' ' +
        this.frmRegistro.value.lugar_celebracion_departamento.nombre + ' ' +
        this.frmRegistro.value.lugar_celebracion_municipio.nombre + ' ' +
        this.frmRegistro.value.lugar_celebracion_corregimiento.nombre ?
        this.frmRegistro.value.lugar_celebracion_corregimiento.nombre : ''
    });

    console.log(this.frmRegistro.value);
    this.http.post('rc_matrimonio', this.frmRegistro.value).then((data: any) => {

      console.log(data);
      if (data.mensaje) {
        const toast = this.toastCtrl.create({
          message: data.mensaje,
          duration: 3000
        });
        toast.present();
      } else {
        const toast = this.toastCtrl.create({
          message: "Registro creado con éxito",
          duration: 3000
        });
        toast.present();
        this.inicializar();
        this.navCtrl.push(IndexRegistroCivilMatrimonioPage, { data: data.data.indicativo_serial });
      }
    });
  }

  validarContrayenteUno(ev: any) {
    if (ev.length >= 8 && ev.length <= 10) {
      this.http.get('contrayente/' + ev).then((data: any) => {
        if (data.data) {
          this.frmRegistro.patchValue({
            contrayente_uno_id: data.data.id,
            contrayente_uno_nombres: data.data.nombres,
            contrayente_uno_documento: data.data.documento,
            contrayente_uno_tipo_documento_id: data.data.tipo_documento.id,
          });
        }
      });
    }
  }

  validarContrayenteDos(ev: any) {
    if (ev.length >= 8 && ev.length <= 10) {
      this.http.get('contrayente/' + ev).then((data: any) => {
        if (data.data) {
          this.frmRegistro.patchValue({
            contrayente_dos_id: data.data.id,
            contrayente_dos_nombres: data.data.nombres,
            contrayente_dos_documento: data.data.documento,
            contrayente_dos_tipo_documento_id: data.data.tipo_documento.id,
          });
        }
      });
    }
  }

  validarDenunciante(ev: any) {
    if (ev.length >= 8 && ev.length <= 10) {
      this.http.get('denunciante/' + ev).then((data: any) => {
        if (data.data) {
          this.frmRegistro.patchValue({
            denunciante_id: data.data.id,
            denunciante_nombres: data.data.nombres,
            denunciante_documento: data.data.documento,
            denunciante_tipo_documento_id: data.data.tipo_documento.id,
          });
        }
      });
    }
  }

  guardarFirmaDenunciante($event) {

    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.frmRegistro.patchValue({
        denunciante_firma: myReader.result
      });
    }
    myReader.readAsDataURL(file);
  }

  guardarFirmaProvidencia($event) {

    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.frmRegistro.patchValue({
        providencia_firma: myReader.result
      });
    }
    myReader.readAsDataURL(file);
  }


}
