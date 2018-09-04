import { UserProvider } from './../../providers/user/user';
import { HttpProvider } from './../../providers/http/http';
import { RCNacimiento, Genero, RH, GrupoSanguineo, Pais, Departamento, Municipio, Corregimiento, LugarNacimiento, Antecedente, TipoDocumento } from './../../models/global';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';


@Component({
  selector: 'page-registro-civil-nacimiento',
  templateUrl: 'registro-civil-nacimiento.html',
})
export class RegistroCivilNacimientoPage {

  frmRegistro: FormGroup;
  registro: RCNacimiento;

  file: File;
  generos: Genero[];
  grupos_sanguineos: GrupoSanguineo[];
  rh: RH;
  paises: Pais[];
  departamentos: Departamento[];
  municipios: Municipio[];
  corregimientos: Corregimiento[];
  antecedentes: Antecedente[];
  tipos_documento: TipoDocumento[];

  lugar_nacimiento: LugarNacimiento;
  base64textString: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    private toastCtrl: ToastController,
    private user: UserProvider,
    private frmBuilder: FormBuilder) {


    this.frmRegistro = this.frmBuilder.group({

      inscrito_primer_apellido: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      inscrito_segundo_apellido: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      inscrito_nombres: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      inscrito_fecha_nacimiento: ['', Validators.compose([Validators.required])],
      inscrito_genero_id: ['', Validators.compose([Validators.required])],
      inscrito_grupo_sanguineo_id: ['', Validators.compose([Validators.required])],
      inscrito_factor_rh_id: ['', Validators.compose([Validators.required])],

      lugar_nacimiento_pais: ['', Validators.compose([Validators.required])],
      lugar_nacimiento_departamento: ['', Validators.compose([Validators.required])],
      lugar_nacimiento_municipio: ['', Validators.compose([Validators.required])],
      lugar_nacimiento_corregimiento: ['', { value: null, disabled: false }],

      lugar_nacimiento: ['', { value: null, disabled: false }],

      antecedente_id: ['', Validators.compose([Validators.required])],
      num_nacido_vivo: ['', Validators.compose([Validators.required])],

      madre_id: ['', { value: null, disabled: false }],
      madre_nombres: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      madre_tipo_documento_id: ['', Validators.compose([Validators.required])],
      madre_documento: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],
      madre_pais_id: ['', Validators.compose([Validators.required])],

      padre_id: ['', { value: null, disabled: false }],
      padre_nombres: ['', { value: null, disabled: false }, Validators.compose([Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      padre_tipo_documento_id: ['', { value: null, disabled: false }],
      padre_documento: ['', { value: null, disabled: false }, Validators.compose([Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],
      padre_pais_id: ['', { value: null, disabled: false }],

      declarante_id: ['', { value: null, disabled: false }],
      declarante_nombres: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      declarante_tipo_documento_id: ['', Validators.compose([Validators.required])],
      declarante_documento: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],
      declarante_firma: ['', { value: null, disabled: false }, Validators.compose([Validators.required])],

      testigo_uno_id: ['', { value: null, disabled: false }],
      testigo_uno_nombres: ['', { value: null, disabled: false }, Validators.compose([Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      testigo_uno_tipo_documento_id: ['', { value: null, disabled: false }],
      testigo_uno_documento: ['', { value: null, disabled: false }, Validators.compose([Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],
      testigo_uno_firma: ['', { value: null, disabled: false }],

      testigo_dos_id: ['', { value: null, disabled: false }],
      testigo_dos_nombres: ['', { value: null, disabled: false }, Validators.compose([Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      testigo_dos_tipo_documento_id: ['', { value: null, disabled: false }],
      testigo_dos_documento: ['', { value: null, disabled: false }, Validators.compose([Validators.minLength(8), Validators.maxLength(10), Validators.pattern('\\d+')])],
      testigo_dos_firma: ['', { value: null, disabled: false }],

      notas_marginales: ['', { value: null, disabled: false }],
    });

    this.registro = new RCNacimiento;
    this.lugar_nacimiento = new LugarNacimiento;

    this.lugar_nacimiento.pais = new Pais;
    this.lugar_nacimiento.departamento = new Departamento;
    this.lugar_nacimiento.municipio = new Municipio;
    this.lugar_nacimiento.corregimiento = new Corregimiento;

    this.poblarCombos();

  }

  poblarCombos() {

    this.http.get('genero').then((data: any) => this.generos = data.data);
    this.http.get('grupo_sanguineo').then((data: any) => this.grupos_sanguineos = data.data);
    this.http.get('factor_rh').then((data: any) => this.rh = data.data);
    this.http.get('pais').then((data: any) => this.paises = data.data);
    this.http.get('departamento').then((data: any) => this.departamentos = data.data);
    this.http.get('municipio').then((data: any) => this.municipios = data.data);
    this.http.get('corregimiento').then((data: any) => this.corregimientos = data.data);
    this.http.get('antecedente').then((data: any) => this.antecedentes = data.data);
    this.http.get('tipo_documento').then((data: any) => this.tipos_documento = data.data);
  }

  guardarRegistro() {


    this.frmRegistro.patchValue({
      lugar_nacimiento: this.frmRegistro.value.lugar_nacimiento_pais.nombre + ' ' + this.frmRegistro.value.lugar_nacimiento_departamento.nombre + ' ' + this.frmRegistro.value.lugar_nacimiento_municipio.nombre + ' ' + this.frmRegistro.value.lugar_nacimiento_corregimiento.nombre
    });
    console.log(this.frmRegistro.value);


    this.http.post('rc_nacimiento', this.frmRegistro.value).then((data: any) => {

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
      }
    });

  }

  validarMadre(ev: any) {
    if (ev.length >= 8 && ev.length <= 10) {
      this.http.get('madre/' + ev).then((data: any) => {
        if (data.data) {
          this.frmRegistro.patchValue({
            madre_id: data.data.id,
            madre_nombres: data.data.nombres,
            madre_documento: data.data.documento,
            madre_tipo_documento_id: data.data.tipo_documento.id,
            madre_pais_id: data.data.pais.id,
          });
        }
      });
    }
  }

  validarPadre(ev: any) {
    if (ev.length >= 8 && ev.length <= 10) {
      this.http.get('padre/' + ev).then((data: any) => {
        if (data.data) {
          this.frmRegistro.patchValue({
            padre_id: data.data.id,
            padre_nombres: data.data.nombres,
            padre_documento: data.data.documento,
            padre_tipo_documento_id: data.data.tipo_documento.id,
            padre_pais_id: data.data.pais.id,
          });
        }
      });
    }
  }

  validarDeclarante(ev: any) {
    if (ev.length >= 8 && ev.length <= 10) {
      this.http.get('declarante/' + ev).then((data: any) => {
        if (data.data) {
          this.frmRegistro.patchValue({
            declarante_id: data.data.id,
            declarante_nombres: data.data.nombres,
            declarante_documento: data.data.documento,
            declarante_tipo_documento_id: data.data.tipo_documento.id,
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

  guardarFirmaDeclarante($event) {

    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.frmRegistro.patchValue({
        declarante_firma: myReader.result
      });
    }
    myReader.readAsDataURL(file);

  }

  guardarFirmaTestigoUno($event) {
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.frmRegistro.patchValue({
        testigo_uno_firma: myReader.result
      });
    }
    myReader.readAsDataURL(file);
  }

  guardarFirmaTestigoDos($event) {
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.frmRegistro.patchValue({
        testigo_dos_firma: myReader.result
      });
      //this.registro.firma_testigo_dos = myReader.result;
    }
    myReader.readAsDataURL(file);
  }


}
