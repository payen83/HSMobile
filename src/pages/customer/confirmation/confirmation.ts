import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CommonProvider, Jobs, Wallet } from '../../../providers/providers';
//import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {
  protected itemInCart: Array<any> = [];
  protected totalPrice: Number;
  protected address: string;
  protected orders: any;
  protected user: any;
  protected note: string;
  protected balance: number = 0;
  protected paymentMethod: string;

  constructor(protected wallet: Wallet, protected job: Jobs, protected common: CommonProvider, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.address = '39-1 Jalan Equine 9A, Equine Park, 43300 Seri Kembangan, Selangor Darul Ehsan';
    this.itemInCart = this.navParams.get('itemInCart');
    this.totalPrice = this.navParams.get('totalPrice');
    this.orders = {};
    this.user = { role: 'Customer' };
    this.paymentMethod = 'Paypal';
    console.log(this.itemInCart);
  }

  ionViewDidLoad() {
    
    this.common.getData('USER').then(user => {
      this.user = user;
      //console.log(this.user);
      if (this.user.role == 'Agent') {
        this.wallet.getBalance().then(data => {
          let bal: any = data;
          this.balance = bal.wallets[0].amount;
          //console.log('balance: ',this.balance)
        });
      }
      if (this.user.u_address) {
        this.address = this.user.u_address;
      }
      if(!this.user.lat || !this.user.lng){
        this.common.getLocation().then(location =>{
          let coords: any = location;
          this.user.lat = coords.latitude;
          this.user.lng = coords.longitude;
        }, err => {
          this.user.lat = 101.6553845;
          this.user.lng = 3.1639173; 
        })
      }
    }, err => {
      this.common.showAlert('Error', JSON.stringify(err))
    });
  }

  isAgent() {
    return this.user.role == 'Agent';
  }

  makePayment2() {
    console.log('method', this.paymentMethod)
  }

  makePayment() {
    if (this.paymentMethod == 'Wallet' && this.balance < this.totalPrice) {
      this.common.showAlert('', 'Your credit balance is not enough')
    } else {

      let products: Array<any> = [];
      for (let product of this.itemInCart) {
        products.push(
          {
            ProductID: parseInt(product.id),
            ProductQuantity: product.qty,
            Discount: parseFloat(product.Discount) || 0
          }
        )
      }

      if (this.paymentMethod == 'PayPal') {
        //this.paypalPayment(this.totalPrice).then(resp => {
          //let result: any = resp;
          this.initiatePayment(products, 'PAY-1AB23456CD789012EF34GHIJ');
       // })
      } else {
        this.initiatePayment(products);
      }
    }
  }

  initiatePayment(products, transaction_id?) { 
    this.orders = {
      total_price: this.totalPrice,
      role: this.user.role,
      payment_method: this.paymentMethod,
      transaction_id: transaction_id,
      currency: 'MYR',
      payment_date: this.formatDate(),
      data: products,
      location_address: this.address,
      lng: (this.user.lat || 3.1639173),
      lat: (this.user.lng || 101.6553845),
      special_notes: this.note || ''
    }; 

    // this.orders = {
    //   total_price: this.totalPrice,
    //   role: 'customer',
    //   payment_method: 'PayPal',
    //   transaction_id: 'PAY-1AB23456CD789012EF34GHIJ',
    //   currency: 'MYR',
    //   payment_date: this.formatDate(),
    //   data: products,
    //   location_address: this.address,
    //   lng: (this.user.lat || 101.6553845),
    //   lat: (this.user.lng || 3.1639173),
    //   special_notes: this.note
    // };

    console.log(JSON.stringify(this.orders));

    this.job.purchaseOrder(this.orders, this.user).then(result => {
      let response: any = result;
      console.log(response);
      this.common.destroyData('CART').then(res => {
        this.navCtrl.setRoot('CompletedPage', {}, { animate: true });
      })
    }, err => {
      this.common.showAlert('Error', JSON.stringify(err));
    })
  }

  paypalPayment(amount) {
    return new Promise((resolve, reject) => {
      this.wallet.payViaPaypal(amount).then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
    })
  }

  formatDate() {
    let d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  getPath(url: string) {
    return this.common.imagePath + url;
  }

  setLocation() {
    let modal = this.modalCtrl.create('MapPage', { lat: (this.user.lng || 3.1639173), lng: (this.user.lat || 101.6553845) });
    modal.present();
    modal.onDidDismiss(result => {
      //console.log(result);
      if (result) {
        this.address = result.address;
        this.user.lat = result.coords.lat;
        this.user.lng = result.coords.lng;
      } else {
        return;
      }

    })
  }

}
