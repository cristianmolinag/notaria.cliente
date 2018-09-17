import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { RCDefuncion, Pais, Departamento, Municipio, Corregimiento, TipoDocumento, Genero } from '../../models/global';
import { HttpProvider } from '../../providers/http/http';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-registro-civil-defuncion',
  templateUrl: 'registro-civil-defuncion.html',
})
export class RegistroCivilDefuncionPage {

  frmRegistro: FormGroup;
  registro: RCDefuncion;

  file: File;

  paises: Pais[];
  departamentos: Departamento[];
  municipios: Municipio[];
  corregimientos: Corregimiento[];
  tipos_documento: TipoDocumento[];
  generos: Genero[];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    private toastCtrl: ToastController,
    private user: UserProvider,
    private frmBuilder: FormBuilder) {

    this.poblarCombos();

    this.frmRegistro = this.frmBuilder.group({

      lugar_defuncion: ['', { value: null, disabled: false }],
      fecha_defuncion: ['', Validators.compose([Validators.required])],
      hora_defuncion: ['', Validators.compose([Validators.required])],
      certificado_defuncion: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],
      juzgado_defuncion: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      fecha_sentencia: ['', Validators.compose([Validators.required])],
      tipo_certificado: ['', Validators.compose([Validators.required])],
      nombre_funcionario: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      notas_marginales: ['', Validators.compose([Validators.required])],

      lugar_defuncion_pais: ['', Validators.compose([Validators.required])],
      lugar_defuncion_departamento: ['', Validators.compose([Validators.required])],
      lugar_defuncion_municipio: ['', Validators.compose([Validators.required])],
      lugar_defuncion_corregimiento: ['', { value: null, disabled: false }],

      inscrito_id: ['', { value: null, disabled: false }],
      inscrito_nombres: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      inscrito_tipo_documento_id: ['', Validators.compose([Validators.required])],
      inscrito_genero_id: ['', Validators.compose([Validators.required])],
      inscrito_documento: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],

      denunciante_id: ['', { value: null, disabled: false }],
      denunciante_nombres: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      denunciante_tipo_documento_id: ['', Validators.compose([Validators.required])],
      denunciante_documento: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],
      denunciante_firma: ['', { value: null, disabled: false }, Validators.compose([Validators.required])],

      testigo_uno_id: ['', { value: null, disabled: false }],
      testigo_uno_nombres: ['', Validators.compose([Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      testigo_uno_tipo_documento_id: ['', { value: null, disabled: false }],
      testigo_uno_documento: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],
      testigo_uno_firma: ['', { value: null, disabled: false }],

      testigo_dos_id: ['', { value: null, disabled: false }],
      testigo_dos_nombres: ['', Validators.compose([Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      testigo_dos_tipo_documento_id: ['', { value: null, disabled: false }],
      testigo_dos_documento: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],
      testigo_dos_firma: ['', { value: null, disabled: false }],
    });
  }

  inicializar() {

    this.frmRegistro.reset({
      lugar_defuncion: [],
      fecha_defuncion: [],
      hora_defuncion: [],
      certificado_defuncion: [],
      juzgado_defuncion: [],
      fecha_sentencia: [],
      tipo_certificado: [],
      nombre_funcionario: [],
      notas_marginales: [],


      lugar_defuncion_pais: [],
      lugar_defuncion_departamento: [],
      lugar_defuncion_municipio: [],
      lugar_defuncion_corregimiento: [],

      inscrito_id: [],
      inscrito_nombres: [],
      inscrito_tipo_documento_id: [],
      inscrito_genero_id: [],
      inscrito_documento: [],

      denunciante_id: [],
      denunciante_nombres: [],
      denunciante_tipo_documento_id: [],
      denunciante_documento: [],
      denunciante_firma: [],

      testigo_uno_id: [],
      testigo_uno_nombres: [],
      testigo_uno_tipo_documento_id: [],
      testigo_uno_documento: [],
      testigo_uno_firma: [],

      testigo_dos_id: [],
      testigo_dos_nombres: [],
      testigo_dos_tipo_documento_id: [],
      testigo_dos_documento: [],
      testigo_dos_firma: [],
    });
  }

  poblarCombos() {

    this.http.get('pais').then((data: any) => this.paises = data.data);
    this.http.get('departamento').then((data: any) => this.departamentos = data.data);
    this.http.get('municipio').then((data: any) => this.municipios = data.data);
    this.http.get('corregimiento').then((data: any) => this.corregimientos = data.data);
    this.http.get('tipo_documento').then((data: any) => this.tipos_documento = data.data);
    this.http.get('genero').then((data: any) => this.generos = data.data);
  }


  guardarRegistro() {
    console.log(this.frmRegistro.value);
  }

  validarInscrito(ev: any) {
    if (ev.length >= 8 && ev.length <= 10) {
      this.http.get('inscrito/' + ev).then((data: any) => {
        if (data.data) {
          this.frmRegistro.patchValue({
            inscrito_id: data.data.id,
            inscrito_nombres: data.data.nombres,
            inscrito_primer_apellido: data.data.primer_apellido,
            inscrito_segundo_apellido: data.data.segundo_apellido,
            inscrito_documento: data.data.documento,
            inscrito_tipo_documento_id: data.data.tipo_documento.id,
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
  validarTestigoUno(ev: any) {
    if (ev.length >= 8 && ev.length <= 10) {
      this.http.get('testigo/' + ev).then((data: any) => {
        if (data.data) {
          this.frmRegistro.patchValue({
            testigo_uno_id: data.data.id,
            testigo_uno_nombres: data.data.nombres,
            testigo_uno_documento: data.data.documento,
            testigo_uno_tipo_documento_id: data.data.tipo_documento.id,
          });
        }
      });
    }
  }
  validarTestigoDos(ev: any) {
    if (ev.length >= 8 && ev.length <= 10) {
      this.http.get('testigo/' + ev).then((data: any) => {
        if (data.data) {
          this.frmRegistro.patchValue({
            testigo_dos_id: data.data.id,
            testigo_dos_nombres: data.data.nombres,
            testigo_dos_documento: data.data.documento,
            testigo_dos_tipo_documento_id: data.data.tipo_documento.id,
          });
        }
      });
    }
  }

  guardarFirmaDenunciante($event: any) {
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.frmRegistro.patchValue({
        denunciante_firma: myReader.result
      });
    }
    myReader.readAsDataURL(file);
  }
  guardarFirmaTestigoUno($event: any) {
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.frmRegistro.patchValue({
        testigo_uno_firma: myReader.result
      });
    }
    myReader.readAsDataURL(file);
  }
  guardarFirmaTestigoDos($event: any) {
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.frmRegistro.patchValue({
        testigo_dos_firma: myReader.result
      });
    }
    myReader.readAsDataURL(file);
  }
}


