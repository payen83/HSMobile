import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
//import { Storage } from '@ionic/storage';

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
  protected address: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.address = '39-1 Jalan Equine 9A, Equine Park, 43300 Seri Kembangan, Selangor Darul Ehsan';
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
    modal.onDidDismiss(result=>{
      //console.log(result);
      this.address = result.address;
    })
  }

  
}
