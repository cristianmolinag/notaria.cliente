import { HttpProvider } from './../../providers/http/http';
import { UserProvider } from './../../providers/user/user';
import { FormaPago, Usuario } from './../../models/global';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-factura',
  templateUrl: 'factura.html',
})
export class FacturaPage {

  registro: any;
  formaPago: FormaPago;
  cliente: Usuario;
  fecha: string;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private file: File,
    private user: UserProvider,
    private http: HttpProvider) {

    this.formaPago = new FormaPago();
    this.registro = new Object();
    this.cliente = user.getUsuario();
    this.fecha = new Date().toLocaleDateString();
    this.registro = this.navParams.get('data');

    this.http.get('forma_pago/' + this.registro.forma_pago_id).then((data: any) => this.formaPago = data.data);
  }

  guardar() {

    const div = document.getElementById("content");
    const options = { background: "white", height: div.clientHeight, width: div.clientWidth };
    html2canvas(div, options).then((canvas) => {

      let imgData = canvas.toDataURL("image/PNG");
      var imgWidth = 150;
      var pageHeight = 150;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm', 'c7');
      var position = 5;

      doc.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
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

      const fileName = "Comprobante de pago.pdf";

      doc.save(fileName);
      this.navCtrl.pop();
      // Writing File to Device
      // this.file.writeFile(directory, fileName, buffer)
      //   .then((success) => console.log("File created Succesfully" + JSON.stringify(success)))
      //   .catch((error) => console.log("Cannot Create File " + JSON.stringify(error)));
    });
  }


}
