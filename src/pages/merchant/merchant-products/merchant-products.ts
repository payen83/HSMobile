import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ItemSliding, ModalController } from 'ionic-angular';

/**
 * Generated class for the MerchantProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-merchant-products',
  templateUrl: 'merchant-products.html',
})
export class MerchantProductsPage {
  myImage: any;
  products = []
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.products = [
      {Name: 'Essential Plus', price: 150, status: 'pending', Description: 'Because EssensiaPlus is fully natural, because it has a symphony of nutrients from over 50 fruits, vegetables, whole grains, nuts, seeds, and herbs; and because of its revolutionary fermentation based on a formula from time-honored traditions; EssensiaPlus is the finest, most effective, healthiest natural food available anywhere. EssensiaPlus means a healthier and longer life for you.' },
    ]
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MerchantProductsPage');
  }

  add(){
    this.navCtrl.push('AddPage');
  }

  confirmDelete(item, slidingItem: ItemSliding){
    const alert = this.alertCtrl.create({
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Delete item',
          handler: () => {
            this.delete(item);
          }
        },{
          text: 'Cancel',
          handler: () => {
            slidingItem.close();
          }
        }
      ]
    });
    alert.present();
  }

  delete(item){

  }

  view(item){

    let modal = this.modalCtrl.create('ProductDetailsPage', {item: item});
    modal.present();
  }

  edit(item, slidingItem: ItemSliding){
    slidingItem.close();
    this.navCtrl.push('AddPage', {item: item});
  }

}
