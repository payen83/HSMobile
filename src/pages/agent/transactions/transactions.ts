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
  transactions: Array<any>;
  wallet: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController) {
    this.wallet = 5000;
    this.transactions = [
      {id: 1, date: "25 April 2018", type: "debit", description:"Funds withdrawal", amount: 200},
      {id: 2, date: "21 April 2018", type: "credit", description:"Order completed", amount: 300}
    ]
  }

  availWithdraw(amount){
    if(amount>5000){
      return 5000;
    } else {
      return amount;
    }
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
