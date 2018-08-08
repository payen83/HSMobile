import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common';
import { User } from '../../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: { lat?: number, lng?: number, url_image?: null, role?: string, id?: number, name?: string, icnumber?: string, u_address?: string, u_bankname?: string, u_accnumber?: string, email: string, u_phone?: string };
  savedBankAcc: string;
  currentUser: any;

  constructor(public userProvider: User, public common: CommonProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.user = {
      name: null,
      icnumber: null,
      u_address: null,
      u_phone: null,
      u_bankname: null,
      u_accnumber: null,
      email: null,
      url_image: null,
      role: 'Customer',
      lat: null,
      lng: null
    }
    this.currentUser = { name: null, email: null };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getProfile();
  }

  getImage(){
    this.common.selectImage().then(response => {
      //console.log(response);
      this.common.takePicture(response).then(image => {
        //this. = image;
        this.showProfileImage(image);
      })
    });
  }

  showProfileImage(image?: any) {
    if(image){
      return image;
    }
    if (this.user.url_image) {
      return this.common.getProfileImage_URL() + this.user.url_image;
    }
    return '../../../assets/imgs/user.png';
  }

  getProfile() {
    this.common.getData('USER').then(response => {
      if (response) {
        console.log(response);
        let result: any = response;
        this.user = result;
        this.setProfile(this.user);
        this.savedBankAcc = this.user.u_accnumber;
      }

      if (!this.user.u_address) {
        this.common.getLocation().then(location => {
          let coords: any = location
          this.user.lat = coords.latitude;
          this.user.lng = coords.longitude;
        });
      }

    }, err => {
      console.log('err: ' + JSON.stringify(err))
    });
  }

  changePassword() {
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

  updatePassword(new_password: string) {

  }

  checkPassword() {
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

  isAgent() {
    return this.user.role == 'Agent';
  }

  getPassword(pass) {
    let user = { email: this.user.email, password: pass };
    this.userProvider.login(user).then(res => {
      //console.log(res);
      if (res.status) {
        this.savedBankAcc = this.user.u_accnumber;
        this.submitProfile();
        //return true;
      } else {
        this.common.showAlert('', 'Invalid username or password')
        return false
      }
    }, err => {
      this.common.showAlert('Login failed', JSON.stringify(err.error.error))
      return false;
    })
  }

  setProfile(data: any) {
    this.currentUser.name = data.name;
    this.currentUser.email = data.email
  }


  submitProfile() {
    if (!this.user.u_address || !this.user.u_phone) {
      this.common.showAlert('', 'Please enter your address and phone number');
    } else {
      if (this.user.u_accnumber !== this.savedBankAcc) {
        this.checkPassword()
      }
      else {
        let loader = this.common.showLoader();
        this.userProvider.saveProfile(this.user).then(response => {
          loader.dismiss();
          this.setProfile(this.user);
          let result: any = response;
          if (result.status) {
            this.common.saveData('USER', this.user);
            this.common.showAlert('Profile', 'Your profile has been updated.');
          }
        }, err => {
          loader.dismiss();
          this.common.showAlert('Error', JSON.stringify(err));
        })
      }
    }
  }

}
