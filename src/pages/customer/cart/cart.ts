import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommonProvider } from '../../../providers/common/common';


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
  //protected num1: number = 1;
  //protected num2: number = 1;
  protected itemInCart: Array<any> = [];
  protected totalPrice: Number;
  protected role: string;
  constructor(public common: CommonProvider, private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CartPage');
    this.common.getData('USER').then(res => {
      
      let user: any = res;
      this.role = user.role;

      this.storage.get('CART').then(items=>{
        if(items){
          this.itemInCart = JSON.parse(items);
          //console.log(JSON.parse(items));
        } else {
          console.log('no data');
        }
      });
    })
    
  }

  getPath(url: string){
    return 'http://healthshoppe.elyzian.xyz/public/upload/images/'+url;
  }

  updateCart() {
    let newCart: Array<any> = [];
    for(let index in this.itemInCart){
      //console.log(this.itemInCart[index].qty);
      if(this.itemInCart[index].qty != 0){
        //this.removeCart(index); 
        newCart.push(this.itemInCart[index]);
      }
    }
    this.itemInCart = newCart;
    this.saveCart();
  }

  getQuantity(index){
    //let selectedIndex = this.itemInCart.findIndex(item => item.id == id);
    return this.itemInCart[index].qty;
  }

  addQuantity(index: number) {
    if(this.role == 'Agent'){
      if(this.itemInCart[index].qty < this.itemInCart[index].QuantityPerPackage){
        this.itemInCart[index].qty += parseInt(this.itemInCart[index].QuantityPerPackage);
      } else {
        this.itemInCart[index].qty += 1;
      }
    } else {
      this.itemInCart[index].qty +=  1;
    }
    
  }

  subtractQuantity(index: number) {
    if (this.itemInCart[index].qty != 0) {
      if(this.role == 'Agent'){
        if(this.itemInCart[index].qty <= parseInt(this.itemInCart[index].QuantityPerPackage)){
          this.itemInCart[index].qty = 0;
        } else {
          this.itemInCart[index].qty -= 1;
        }  
      } else {
        this.itemInCart[index].qty -= 1;
      }
    }
  }

  confirmationPage() {
    this.updateCart();
    if(!this.common.isEmpty(this.itemInCart)){
      //this.saveCart();
      this.navCtrl.push('ConfirmationPage', {itemInCart: this.itemInCart, totalPrice: this.totalPrice});
    } else {
      this.common.showAlert('', 'Please add at least 1 product');
    }
  }

  removeCart(index){
    this.itemInCart.splice(index, 1);
  }

  saveCart(){
    this.storage.set('CART', JSON.stringify(this.itemInCart));
  }

  emptyCart(){
    return this.common.isEmpty(this.itemInCart);
  }

  getTotal(){
    let total: number = 0;
    for(let item of this.itemInCart){
      total += item.Price * item.qty;
    }
    this.totalPrice = total;
    return total;
  }


}
