import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Wallet, CommonProvider } from '../../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {
  transactions: Array<any>;
  walletInfo: any;
  constructor(protected common: CommonProvider, public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, protected wallet: Wallet) {
    this.walletInfo = { amount: 0, u_bankame: null, u_accnumber: null, pending_approval: null };
    this.transactions = [

    ]
  }

  availWithdraw(amount) {
    if (!this.walletInfo.pending_approval || parseInt(this.walletInfo.pending_approval) > 0) {
      if (amount > 5000) {
        return 5000;
      } else if (parseFloat(this.walletInfo.pending_approval) > 0)  {
        return 0;
      } else {
        return amount;
      }
    } else {
      return 0;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
    this.getWalletBalance();
  }

  getWalletBalance() {
    this.wallet.getBalance().then(res => {
      let result: any = res;
      if (!this.common.isEmpty(result.wallets)) {
        this.walletInfo = result.wallets[0];
        console.log('this.walletInfo');
        console.log(this.walletInfo);

      }
      this.getWalletTransaction();
    })
  }

  showDebit(status: any) {
    return status == 'Withdraw';
  }

  enableWithdrawButton() {
    if (this.availWithdraw(this.walletInfo.amount) > 0 && !(Number(this.walletInfo.pending_approval) > 0)) {
      return true;
    } else {
      return false
    }
  }

  getWalletTransaction() {
    this.wallet.getTransaction().then(res => {
      let result: any = res;
      // console.log('this.transactions');
      console.log(result);
      if (!this.common.isEmpty(result.transactions)) {
        this.transactions = result.transactions;

        console.log(this.transactions);
      }
    })
  }

  withdraw() {
    let withdrawAmount: number = this.availWithdraw(this.walletInfo.amount);
    let confirm = this.alert.create({
      title: 'Withdrawal',
      message: 'Are you sure you want to request for withdrawal of $' + withdrawAmount + '?',
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
              this.common.showAlert('Withdrawal Request', 'Your request has been sent and will be deposited within 5 business days.');
            }, err => {
              if (err.message) {
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
