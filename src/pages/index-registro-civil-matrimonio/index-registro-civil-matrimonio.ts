import { HttpProvider } from './../../providers/http/http';
import { RCMatrimonio, Contrayente, TipoDocumento, Denunciante, Firma, Capitulacion, HijoMatrimonio, ProvidenciaMatrimonio, Providencia } from './../../models/global';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-index-registro-civil-matrimonio',
  templateUrl: 'index-registro-civil-matrimonio.html',
})
export class IndexRegistroCivilMatrimonioPage {

  registro: RCMatrimonio;
  capitulacion: Capitulacion;
  hijoMatrimonio: HijoMatrimonio[];
  providenciaMatrimonio: ProvidenciaMatrimonio;




  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpProvider,
    private file: File) {

    this.registro = new RCMatrimonio();
    this.registro.contrayente_uno = new Contrayente();
    this.registro.contrayente_uno.tipo_documento = new TipoDocumento();
    this.registro.contrayente_dos = new Contrayente();
    this.registro.contrayente_dos.tipo_documento = new TipoDocumento();
    this.registro.denunciante = new Denunciante();
    this.registro.denunciante.tipo_documento = new TipoDocumento();
    this.registro.firma = new Firma();

    this.capitulacion = new Capitulacion;
    this.providenciaMatrimonio = new ProvidenciaMatrimonio;
    this.providenciaMatrimonio.providencia = new Providencia;

    var indicativo_serial = this.navParams.get('data');
    console.log(indicativo_serial);

    this.http.get('rc_matrimonio/' + indicativo_serial).then((data: any) => {
      return data.data;
    }).then((data: any) => {
      this.registro = data
      if (this.registro.capitulacion_id) {
        this.http.get('capitulacion/' + this.registro.capitulacion_id).then((data: any) => this.capitulacion = data.data);
        this.http.get('hijo/' + this.registro.indicativo_serial).then((data: any) => {
          this.hijoMatrimonio = data.data
        });
      }
      this.http.get('providencia/' + this.registro.indicativo_serial).then((data: any) => {
        if (data.data) {
          this.providenciaMatrimonio = data.data;
          console.log(this.providenciaMatrimonio);
        }
      });
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
