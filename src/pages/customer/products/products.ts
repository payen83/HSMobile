import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Products } from '../../../providers/providers';
/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  items: Array<any>
  constructor(public products: Products, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   this.products.query().then(result=>{
      let response: any = result;
      this.items = response.products;
      console.log(this.items);
    });
    
  }

  cartPage(){
    this.navCtrl.setRoot('CartPage', {}, {animate: true});
  }

}
