import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Wallet, CommonProvider } from '../../../providers/providers';

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
  walletInfo: any;
  constructor(protected common: CommonProvider, public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, protected wallet: Wallet) {
    this.walletInfo = {amount: 0, u_bankame: null, u_accnumber: null};
    this.transactions = [

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
    this.getWalletBalance();
    
  }

  convertAmount(amount: any){
    let newNum = parseFloat(amount);
    return newNum.toFixed();
  }

  getWalletBalance(){
    this.wallet.getBalance().then(res => {
      let result: any = res;
      if (!this.common.isEmpty(result.wallets)){
        this.walletInfo = result.wallets[0];
        console.log('this.walletInfo');
        console.log(this.walletInfo);
        
      }
      this.getWalletTransaction();
    })
  }

  showDebit(status: any){
    return status == 'Withdraw';
  }

  getWalletTransaction(){
    this.wallet.getTransaction().then(res => {
      let result: any = res;
      console.log('this.transactions');
      console.log(result);
      if (!this.common.isEmpty(result.transactions)){
        this.transactions = result.transactions;
        console.log(this.transactions);
      }
    })
  }

  withdraw(){
    let withdrawAmount: number = this.availWithdraw(this.walletInfo.amount);
    let confirm = this.alert.create({
      title: 'Withdrawal',
      message: 'Are you sure you want to request for withdrawal of'+this.walletInfo.amount+'?',
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
            this.wallet.requestWithdrawal(withdrawAmount).then(res => {
              this.common.showAlert('Withdrawal Request','Your request has been sent and will be deposited within 5 business days.');
            }, err => {
              if(err.message){
                this.common.showAlert('Request Failed', err.message);
              }
              this.common.showAlert('Error', JSON.stringify(err));
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
