import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ItemSliding, ModalController } from 'ionic-angular';
import { CommonProvider, Products } from '../../../providers/providers';

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
  products = [];
  constructor(public productP: Products, public common: CommonProvider, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.products = [];
  }

  ionViewDidLoad() {
    this.viewProducts();
  }

  add(){
    this.navCtrl.push('AddPage');
  }

  doRefresh(refresher){
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  confirmDelete(item, slidingItem: ItemSliding, i){
    const alert = this.alertCtrl.create({
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Delete item',
          handler: () => {
            this.delete(item, i);
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

  delete(item, index){
    let loader = this.common.showLoader();
    this.productP.deleteProductMerchant(item).then(res => {
      loader.dismiss();
      let result: any = res;
      if (result.status){
        this.products.splice(index, 1);
        this.common.showAlert('', 'Your product has been deleted');
      }
    }, err => {
      loader.dismiss();
      this.common.showAlert('', err.message);
    })  
  }

  view(item){
    let modal = this.modalCtrl.create('ProductDetailsPage', {item: item});
    modal.present();
  }

  edit(item, slidingItem: ItemSliding){
   // console.log('go to edit', item)
    slidingItem.close();
    this.navCtrl.push('AddPage', {item: item, edit: true});
  }

  viewProducts(){
    this.productP.getProductMerchant().then(res => {
      let result: any = res;
      this.products = result.products;
      console.log(this.products);
    })
  }

  
  getPath(url: string){
    if (url == null){
      return 'http://healthshoppe.elyzian.xyz/public/upload/images/no-image.png';
    }
    return 'http://healthshoppe.elyzian.xyz/public/upload/images/'+url;
  }
  

}
