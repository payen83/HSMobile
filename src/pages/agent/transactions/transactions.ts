import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the TransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
  }

  withdraw(){
    let confirm = this.alert.create({
      title: 'Withdrawal',
      message: 'Are you sure you want to request for withdrawal?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}
