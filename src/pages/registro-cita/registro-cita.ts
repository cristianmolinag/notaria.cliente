import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-registro-cita',
  templateUrl: 'registro-cita.html',
})
export class RegistroCitaPage {


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private user: UserProvider) {


  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
