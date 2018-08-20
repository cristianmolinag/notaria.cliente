import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-registro-civil-matrimonio',
  templateUrl: 'registro-civil-matrimonio.html',
})
export class RegistroCivilMatrimonioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroCivilMatrimonioPage');
  }

}
