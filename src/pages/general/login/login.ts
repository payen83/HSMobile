import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { HomePage } from '../../agent/home/home';
import { User } from '../../../providers/user/user';
import { CommonProvider } from '../../../providers/common/common';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: any = {email: '', password: ''};
  constructor(public userProvider: User, public modalCtrl: ModalController, public common: CommonProvider, public alertCtrl: AlertController, public userP: User, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(type){
    
    if(type == 'Agent'){
      this.userP.setUserType('a');
      this.navCtrl.setRoot(HomePage, {}, {animate: true});
    } else{
      this.userP.setUserType('c');
      this.navCtrl.setRoot('ProductsPage', {}, {animate: true});
    }
  }

  doLogin(){
   let loader = this.common.showLoader();
   this.userProvider.login(this.user).then(res=>{
      console.log(res);
      loader.dismiss();
      if (res.status){
        //this.common.setUserData(res.users[0]);
        this.common.saveData('USER', res.users[0]);
        this.login(res.users[0].role);
      } else {
        this.common.showAlert('','Invalid username or password')
      }
   }, err => {
     loader.dismiss();
     this.common.showAlert('Login failed', JSON.stringify(err.error.error))
   })
  }

  pageSignup(){

  }

  forgotPassword(){
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

  openRegister(){
    let modalCss = {
      showBackdrop: true,
      enableBackdropDismiss: false,
      cssClass: "my-modal"
    }
    let modal = this.modalCtrl.create('RegisterPage', null, modalCss);
    modal.present();
    modal.onDidDismiss(data => {
      if(data.registerItem){
        //this.navCtrl.setRoot('OrdersPage', {}, {animate: true});
        this.common.showAlert('Your registration is successful','Please login to continue');
      } 
    });
  }

  register(){
    let prompt = this.alertCtrl.create({
      title: 'Registration',
      message: "Please enter your details as below",
      inputs: [
        {
          name: 'name',
          placeholder: 'Full name',
          type: 'text'
        },
        {
          name: 'email',
          placeholder: 'Email',
          type: 'text'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        },
        {
          name: 'confirm_password',
          placeholder: 'Confirm password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Register',
          handler: data => {
            if(data.password == data.confirm_password){
              this.doRegister(data);
            } else {
              this.common.showAlert('Your password is not match', '');
            }
            
          }
        }
      ]
    });

    prompt.present();
  
  }

  resetPassword(email){
    this.common.showAlert('Please check your email to reset password','');
  }

  doRegister(data){

  }



}
