import { UserProvider } from './../../providers/user/user';
import { HttpProvider } from './../../providers/http/http';
import { RCNacimiento, Genero, RH, GrupoSanguineo, Pais, Departamento, Municipio, Corregimiento, LugarNacimiento, Antecedente, TipoDocumento } from './../../models/global';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-registro-civil-nacimiento',
  templateUrl: 'registro-civil-nacimiento.html',
})
export class RegistroCivilNacimientoPage {

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
    private user: UserProvider) {

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

  guardarRegistroCivil() {

    this.registro.lugar_nacimiento = this.lugar_nacimiento.pais.nombre + ' ' + this.lugar_nacimiento.departamento.nombre + ' ' + this.lugar_nacimiento.municipio.nombre + ' ' + this.lugar_nacimiento.corregimiento.nombre;

    if (
      !this.registro.nuip ||
      !this.registro.indicativo_serial ||
      !this.registro.primer_apellido ||
      !this.registro.segundo_apellido ||
      !this.registro.fecha_nacimiento ||
      !this.registro.genero_id ||
      !this.registro.grupo_sanguineo_id ||
      !this.registro.factor_rh_id ||
      !this.registro.antecedente_id ||
      !this.registro.num_nacido_vivo ||
      !this.registro.nombres_madre ||
      !this.registro.tipo_documento_madre_id ||
      !this.registro.documento_madre ||
      !this.registro.pais_madre_id ||
      !this.registro.nombres_declarante ||
      !this.registro.tipo_documento_declarante_id ||
      !this.registro.documento_declarante ||
      !this.registro.firma_declarante
    ) {
      const toast = this.toastCtrl.create({
        message: "Hay campos vacíos",
        duration: 3000
      });
      toast.present();
    }
    else {
      this.http.post('rc_nacimiento', this.registro).then((data: any) => {
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
  }

  guardarFirmaDeclarante($event) {

    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.registro.firma_declarante = myReader.result;
    }
    myReader.readAsDataURL(file);

  }

  guardarFirmaTestigoUno($event) {
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.registro.firma_testigo_uno = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  guardarFirmaTestigoDos($event) {
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.registro.firma_testigo_dos = myReader.result;
    }
    myReader.readAsDataURL(file);
  }


}
