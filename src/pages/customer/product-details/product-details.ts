import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  product: any;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get('item');
    //console.log(this.product);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProductDetailsPage');
  }

  getPath(){
    return 'http://healthshoppe.elyzian.xyz/public/upload/images/'+this.product.ImageURL;
  }

  closeDetail(){
    this.viewCtrl.dismiss();
  }

}
