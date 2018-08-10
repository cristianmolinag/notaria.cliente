import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {

  segmento: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private satin: DomSanitizer) {

    this.segmento = 'funcionarios';
  }


}
