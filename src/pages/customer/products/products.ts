import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Products } from '../../../providers/providers';
import { Storage } from '@ionic/storage';
import { CommonProvider } from '../../../providers/common/common';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})

export class ProductsPage {
  items: Array<any>;
  cart: Array<any>;

  itemInCart: Array<any> = [];

  constructor(private common: CommonProvider, private storage: Storage, public products: Products, public navCtrl: NavController, public navParams: NavParams) {
    //this.storage.clear();
  }

  ionViewDidLoad() {
    this.products.query().then(result => {
      let response: any = result;
      this.items = response.products;
    });

    this.storage.get('CART').then(items => {
      if (items) {
        this.itemInCart = JSON.parse(items);
        console.log(this.itemInCart);
      } else {
        console.log('no data')
      }
    });
  }

  cartPage() {
    this.navCtrl.setRoot('CartPage', {}, { animate: true });
  }

  addToCart(newItem: any) {
    if (!this.common.isEmpty((this.itemInCart))) {
      let selectedIndex = this.itemInCart.findIndex(item => item.id == newItem.id);
      if (selectedIndex >= 0) {
        this.updateCart(this.itemInCart[selectedIndex], selectedIndex);
      } else {
        this.addNewItem(newItem);
      }
    } else {
      this.addNewItem(newItem);
    }
  }


  addNewItem(item) {
    item.qty = 1;
    this.itemInCart.push(item);
    this.saveCart();
  }

  updateCart(item, index) {
    let qty = Number(item.qty) + 1;
    this.itemInCart[index].qty = qty;
    this.saveCart();
  }

  saveCart() {
    this.storage.set('CART', JSON.stringify(this.itemInCart));
    this.cartPage();
  }

}
