import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the ConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ConfirmationPage');
  }

  makePayment(){
    this.navCtrl.setRoot('CompletedPage', {}, {animate: true});
  }

  setLocation(){
    let modal = this.modalCtrl.create('MapPage');
    modal.present();
  }

}
