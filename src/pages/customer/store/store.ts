import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Products } from '../../../providers/providers';

/**
 * Generated class for the StorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {
  stores: Array<any>
  constructor(public navCtrl: NavController, public navParams: NavParams, public productsP: Products) {
    this.stores = [];
  }

  ionViewDidLoad() {
    this.productsP.getStores().then(res => {
      let result: any = res;
      this.stores = result;
    })
  }

}
