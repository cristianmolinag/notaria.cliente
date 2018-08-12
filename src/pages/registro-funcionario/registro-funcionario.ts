import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-registro-funcionario',
  templateUrl: 'registro-funcionario.html',
})
export class RegistroFuncionarioPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroFuncionarioPage');
  }

}
