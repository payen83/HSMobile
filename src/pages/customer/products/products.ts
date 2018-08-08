import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
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
  role: string = 'Customer';
  isGuest: boolean = true;
  user: any;

  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController, private common: CommonProvider, private storage: Storage, public products: Products, public navCtrl: NavController, public navParams: NavParams) {
    //this.storage.clear();
  }
  
  updatePrice(items: Array<any>){
    for (let i in items){
      items[i].Price = parseInt((items[i].Price * (1-parseFloat(items[i].Discount))).toFixed());
    }
    return items;
  }

  ionViewDidLoad() {
    this.common.getData('USER').then(res => {
      this.user = res;
      this.role = this.user.role;
      this.getProducts();
      this.isGuest = false;
    }, err => {
      this.role = 'Customer';
      this.getProducts();
    })
      
    this.storage.get('CART').then(items => {
      if (items) {
        this.itemInCart = JSON.parse(items);
        console.log(this.itemInCart);
      } else {
        console.log('no data in cart')
      }
    });
  }

  showDetails(product){
    let modal = this.modalCtrl.create('ProductDetailsPage', {item: product});
    modal.present();
  }

  getProducts(){
    this.products.getProducts(this.role.toLowerCase()).then(result => {
      let response: any = result;
      this.items = response.products;
      if(this.role == 'Agent'){
        this.items = this.updatePrice(this.items)
      }
      //console.log('latest items')
      //console.log(this.items);
    }, err => {
      this.items = [];
    });
  }

  getPath(url: string){
    return 'http://healthshoppe.elyzian.xyz/public/upload/images/'+url;
  }

  cartPage() {
    console.log(this.user);
    this.navCtrl.setRoot('CartPage', {}, { animate: true });
  }

  addToCart(newItem: any){
    if(!this.isGuest){
      if(this.user.u_address){
        this.findCart(newItem);
      } else {
        this.confirmToProfilePage();
      }
    } else {
      this.common.showAlert('','Please login before proceed to order.');
    }
  }

 confirmToProfilePage(){
  const confirm = this.alertCtrl.create({
    title: '',
    message: 'Before placing an order, please add your delivery address in your profile.',
    buttons: [
      {
        text: 'Cancel',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Go to Profile',
        handler: () => {
          this.navCtrl.setRoot('ProfilePage', {}, {animate: true});
        }
      }
    ]
  });
  confirm.present();
 }

  findCart(newItem: any) {
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

  isAgent(){
    return this.role == 'Agent';
  }


  addNewItem(item) {
    if(this.role == 'Agent'){
      item.qty = parseInt(item.QuantityPerPackage);
    } else {
      item.qty = 1;
    }
    this.itemInCart.push(item);
    this.saveCart();
  }

  updateCart(item, index) {
    let qty: number;
    if(this.role == 'Agent'){
      if(this.itemInCart[index].qty <= parseInt(item.QuantityPerPackage)){
        qty = Number(item.qty) + parseInt(item.QuantityPerPackage);
      } else {
        qty = Number(item.qty) + 1;
      }
    } else {
      qty = Number(item.qty) + 1;
    }
    this.itemInCart[index].qty = qty;
    this.saveCart();
  }

  saveCart() {
    this.storage.set('CART', JSON.stringify(this.itemInCart));
    this.cartPage();
  }

}
