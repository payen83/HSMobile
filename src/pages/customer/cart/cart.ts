import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  protected num1: number = 1;
  protected num2: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  updateCart() {

  }

  addQuantity(prod: number) {

    if (prod == 1) {
      this.num1 += 1;
    } else {
      this.num2 += 1;
    }


  }

  subtractQuantity(prod: number) {
    if (prod == 1) {
      if (this.num1 != 0) {
        this.num1 -= 1;
      }
    } else {
      if (this.num2 != 0) {
        this.num2 -= 1;
      }
    }

  }

  confirmationPage() {
    this.navCtrl.push('ConfirmationPage')
  }

}
