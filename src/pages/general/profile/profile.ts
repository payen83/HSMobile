import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: {name?: string, icNo?: string, address?: string, bankName?: string, bankAcc?: string, email: string, phoneNo?: string};
  savedBankAcc: string;

  constructor(public common: CommonProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.user = {
      name: "Farhan Ramli", 
      icNo: "830217-89-003",
      address: "39-1 Jalan Dato Senu 26, Taman Dato Senu, 51000 Kuala Lumpur",
      bankName: "Maybank",
      bankAcc: "165520939293",
      email: "user@gmail.com",
      phoneNo: "+60120043324"
    };
    this.savedBankAcc = this.user.bankAcc;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  changePassword(){
    let prompt = this.alertCtrl.create({
      title: 'Password',
      message: "Enter your new password",
      inputs: [
        {
          name: 'newPwd',
          placeholder: 'New password',
          type: 'password'
        },
        {
          name: 'confirmPwd',
          placeholder: 'Confirm new password',
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
          text: 'Save',
          handler: data => {
            if (data.newPwd != data.confirmPwd) {
              this.common.showAlert('Error', 'New password not matched');
            } else {
              this.updatePassword(data.newPwd);
            }
          }
        }
      ]
    });

    prompt.present();
  
  }

  updatePassword(new_password: string){

  }

  checkPassword(){
    let prompt = this.alertCtrl.create({
      title: 'Confirmation',
      message: "Enter your password to continue",
      inputs: [
        {
          name: 'pwd',
          placeholder: 'Password',
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
          text: 'Submit',
          handler: data => {
            
              this.getPassword(data.pwd);
            
          }
        }
      ]
    });

    prompt.present();
  
  }

  getPassword(pass){

  }

  submitProfile(){
    if(this.user.bankAcc !== this.savedBankAcc){
      this.checkPassword()
    }
  }

}
