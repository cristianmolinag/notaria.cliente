import { RCNacimiento, Genero, GrupoSanguineo, RH, Antecedente, Madre, TipoDocumento, Pais, Padre, Declarante, Testigo } from './../../models/global';
import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Inscrito } from '../../models/global';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-index-registro-civil-nacimiento',
  templateUrl: 'index-registro-civil-nacimiento.html',
})
export class IndexRegistroCivilNacimientoPage {
  registro: RCNacimiento;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    private file: File) {

    this.registro = new RCNacimiento();
    this.registro.inscrito = new Inscrito();
    this.registro.inscrito.genero = new Genero();
    this.registro.inscrito.grupo_sanguineo = new GrupoSanguineo();
    this.registro.inscrito.factor_rh = new RH();

    this.registro.antecedente = new Antecedente();

    this.registro.madre = new Madre();
    this.registro.madre.tipo_documento = new TipoDocumento();
    this.registro.madre.pais = new Pais();

    this.registro.padre = new Padre();
    this.registro.padre.tipo_documento = new TipoDocumento();
    this.registro.padre.pais = new Pais();

    this.registro.declarante = new Declarante();
    this.registro.declarante.tipo_documento = new TipoDocumento();

    this.registro.testigo_uno = new Testigo();
    this.registro.testigo_uno.tipo_documento = new TipoDocumento();

    this.registro.testigo_dos = new Testigo();
    this.registro.testigo_dos.tipo_documento = new TipoDocumento();

    var indicativo_serial = this.navParams.get('data');

    this.http.get('rc_nacimiento/' + indicativo_serial).then((data: any) => {
      this.registro = data.data
    });
  }

  guardar() {

    const div = document.getElementById("content");
    const options = { background: "white", height: div.clientHeight, width: div.clientWidth };
    html2canvas(div, options).then((canvas) => {

      let imgData = canvas.toDataURL("image/PNG");
      var imgWidth = 216;
      var pageHeight = 351;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm', 'legal');
      var position = 5;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      let pdfOutput = doc.output();
      let buffer = new ArrayBuffer(pdfOutput.length);
      let array = new Uint8Array(buffer);
      for (var i = 0; i < pdfOutput.length; i++) {
        array[i] = pdfOutput.charCodeAt(i);
      }

      const directory = this.file.externalApplicationStorageDirectory;

      const fileName = "Registro civil.pdf";

      doc.save(fileName);
      this.navCtrl.pop();
      // Writing File to Device
      // this.file.writeFile(directory, fileName, buffer)
      //   .then((success) => console.log("File created Succesfully" + JSON.stringify(success)))
      //   .catch((error) => console.log("Cannot Create File " + JSON.stringify(error)));
    });
  }
}
