import { InscritoDefuncion, TipoDocumento, Genero } from './../../models/global';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { File } from '@ionic-native/file';
import { HttpProvider } from '../../providers/http/http';
import { RCDefuncion, Denunciante, Testigo } from '../../models/global';

@Component({
  selector: 'page-index-registro-civil-defuncion',
  templateUrl: 'index-registro-civil-defuncion.html',
})
export class IndexRegistroCivilDefuncionPage {

  registro: RCDefuncion;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpProvider,
    private file: File) {

    this.registro = new RCDefuncion;
    this.registro.inscrito_defuncion = new InscritoDefuncion;
    this.registro.inscrito_defuncion.tipo_documento = new TipoDocumento;
    this.registro.inscrito_defuncion.genero = new Genero;
    this.registro.denunciante = new Denunciante;
    this.registro.denunciante.tipo_documento = new TipoDocumento;
    this.registro.testigo_uno = new Testigo;
    this.registro.testigo_uno.tipo_documento = new TipoDocumento;
    this.registro.testigo_dos = new Testigo;
    this.registro.testigo_dos.tipo_documento = new TipoDocumento;

    var indicativo_serial = this.navParams.get('data');

    this.http.get('rc_defuncion/' + indicativo_serial).then((data: any) => {
      this.registro = data.data;
    })

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
