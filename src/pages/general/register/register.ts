import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  protected user: {email: string, password: string, type: string};
  public confirmPassword: string
  constructor(private common: CommonProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.user = {email: '', password: '', type: ''};
    this.confirmPassword = '';
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RegisterPage');
  }

  close(){
    this.viewCtrl.dismiss({registerItem: null});
  }

  onRegister(){
    if(this.user.password == this.confirmPassword){
      this.viewCtrl.dismiss({registerItem: this.user});
    } else {
      this.common.showAlert('Password not match','Please try again')
    }
  }

}
