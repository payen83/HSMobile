import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Events } from 'ionic-angular';
// import { HomePage } from '../../agent/home/home';
import { User } from '../../../providers/user/user';
import { CommonProvider } from '../../../providers/common/common';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: any = { email: '', password: '' };
  userData: any;
  constructor(public events: Events, public userProvider: User, public modalCtrl: ModalController, public common: CommonProvider, public alertCtrl: AlertController, public userP: User, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

  login() {
    this.common.getData('USER').then(user => {
      let userData: any = user;
      this.events.publish('user:login', userData);
    })
  }

  doLogin() {
    let loader = this.common.showLoader();
    this.userProvider.login(this.user).then(res => {
      console.log(res);
      loader.dismiss();
      if (res.status) {
        let user: any = res.users[0];
        let store_location: any = res.store_location;
        if (store_location) {
          user.store_location = store_location;
        } else {
          user.store_location = null;
        }
        this.common.saveData('USER', user).then(res => {
          this.login();
        });
      } else {
        this.common.showAlert('', 'Invalid username or password')
      }
    }, err => {
      loader.dismiss();
      this.common.showAlert('Login failed', JSON.stringify(err.error.error))
    })
  }

  forgotPassword() {
    let prompt = this.alertCtrl.create({
      title: 'Forgot Password',
      message: "Please enter your email address",
      inputs: [
        {
          name: 'email',
          placeholder: 'i.e user@email.com',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Submit',
          handler: data => {
            this.resetPassword(data.email);
          }
        }
      ]
    });

    prompt.present();

  }

  openRegister() {
    let modalCss = {
      showBackdrop: true,
      enableBackdropDismiss: false,
      cssClass: "my-modal"
    }
    let modal = this.modalCtrl.create('RegisterPage', null, modalCss);
    modal.present();
    modal.onDidDismiss(data => {
      if (data.registerItem) {
        //this.navCtrl.setRoot('OrdersPage', {}, {animate: true});
        this.common.showAlert('Registration Successful', 'Please login to continue');
      }
    });
  }

  resetPassword(email) {
    let loader = this.common.showLoader();
    this.userProvider.forgotPassword(email).then(()=> {
      loader.dismiss();
      this.common.showAlert('Please check your email to reset your password', '');
    }, err => {
      this.common.showAlert('Error', err.message);
    })
  }
}
