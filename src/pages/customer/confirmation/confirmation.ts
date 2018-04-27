import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
  protected itemInCart: Array<any> = [];
  protected totalPrice: Number;

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    // this.storage.get('CART').then(items=>{
    //   if(items){
    //     this.itemInCart = JSON.parse(items);
    //   } else {
    //     console.log('no data');
    //   }
    // });
    this.itemInCart = this.navParams.get('itemInCart');
    this.totalPrice = this.navParams.get('totalPrice');
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
