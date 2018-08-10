import { HttpProvider } from './../../providers/http/http';
import { RCNacimiento, Genero, RH, GrupoSanguineo, Pais, Departamento, Municipio, Corregimiento, LugarNacimiento, Antecedente, TipoDocumento } from './../../models/global';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-registro-civil-nacimiento',
  templateUrl: 'registro-civil-nacimiento.html',
})
export class RegistroCivilNacimientoPage {

  registro: RCNacimiento;

  file: File;
  generos: Genero[];
  grupos_anguineos: GrupoSanguineo[];
  rh: RH;
  paises: Pais[];
  departamentos: Departamento[];
  municipios: Municipio[];
  corregimientos: Corregimiento[];
  antecedentes: Antecedente[];
  tipos_documento: TipoDocumento[];

  lugar_nacimiento: LugarNacimiento;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider) {

    this.registro = new RCNacimiento;
    this.lugar_nacimiento = new LugarNacimiento;

    // this.getGeneros();

  }

  // getGeneros() {
  //   this.http.get('genero').then((data: any) => {
  //     if (data.data)
  //       this.generos = data.data;
  //   });

  // }

  guardarFirmaDeclarante($event) {
    this.file = $event.target.files[0];
    console.log(this.file);
  }

  guardarFirmaTestigoUno($event) {

  }

  guardarFirmaTestigoDos($event) {

  }

}
