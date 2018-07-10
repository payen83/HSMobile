import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common';
import { User } from '../../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  protected user: {email: string, password: string, type: string};
  public confirmPassword: string
  constructor(private userProvider: User, private common: CommonProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
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
      let loader = this.common.showLoader();
      this.userProvider.signup(this.user).then(res=>{
        loader.dismiss();
        console.log(res);
        //this.login(res.users[0].role);
        //this.common.showAlert('Registration', res.message);
        this.viewCtrl.dismiss({registerItem: this.user});
      }, err => {
        loader.dismiss();
        this.common.showAlert('Signup failed', JSON.stringify(err.error.error))
      })

      
    } else {
      this.common.showAlert('Password not match','Please try again')
    }
  }

}
