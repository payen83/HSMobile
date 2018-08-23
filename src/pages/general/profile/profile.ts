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
  user: { store_address?: string, store_postcode?: string, store_state?: string, store_city?: string, availability?: any, store_location?: any, lat?: number, lng?: number, url_image?: null, role?: string, id?: number, name?: string, icnumber?: string, u_address?: string, u_bankname?: string, u_accnumber?: string, email: string, u_phone?: string };
  savedBankAcc: string;
  currentUser: any;
  store: any;
  userImage: any;
  userGetImage: boolean = false;
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
      lng: null,
      store_location: {
        store_address: null,
        store_city: null,
        store_postcode: null,
        store_state: null,
        store_agentphone: null
      },
      availability: null,

    }
    this.store = {

    }
    this.currentUser = { name: null, email: null };
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProfilePage');
    this.getProfile();
  }

  showStore() {
    return (this.user.availability);
  }

  getImage() {
    this.common.selectImage().then(response => {
      //console.log(response);
      this.common.takePicture(response).then(image => {
        //this. = image;
        //this.showProfileImage(image);
        this.userImage = image;
        this.userGetImage = true;
      })
    }, err => {
      return;
    });
  }

  showProfileImage(image?: any) {
    if (image) {
      return this.common.getProfileImage_URL() + image;
    }
    return 'assets/imgs/user.png';
  }

  getProfile() {
    this.common.getData('USER').then(response => {
      if (response) {
        console.log(response);
        let result: any = response;
        this.user = result;
        this.setProfile(this.user);
        this.savedBankAcc = this.user.u_accnumber;
        this.userImage = this.showProfileImage(this.user.url_image);
      }

      if (!this.user.u_address) {
        this.common.getLocation().then(location => {
          let coords: any = location
          this.user.lat = coords.latitude;
          this.user.lng = coords.longitude;
        });
      }

      if (!this.user.store_location) {
        this.user.store_location = {
          store_address: null,
          store_city: null,
          store_postcode: null,
          store_state: null,
          store_agentphone: null
        }
      } else {
        this.user.availability = true;
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
    if (this.user.availability) {
      this.user.store_address = this.user.store_location.store_address;
      this.user.store_city = this.user.store_location.store_city;
      this.user.store_postcode = this.user.store_location.store_postcode;
      this.user.store_state = this.user.store_location.store_state;

      //store_address?: string, store_postcode?: string, store_state?: string, store_city?: string,
    } else {
      this.user.availability = 'false'
    }

    if (!this.user.u_address || !this.user.u_phone) {
      this.common.showAlert('', 'Please enter your address and phone number');
    } else {
      if (this.user.u_accnumber !== this.savedBankAcc) {
        this.checkPassword();
      }
      else {
        let loader = this.common.showLoader();
        //console.log('update', this.user);
        this.userProvider.saveProfile(this.user).then(response => {

        this.setProfile(this.user);

        let result: any = response;
        if (result.status) {
          this.common.saveData('USER', this.user);
          this.common.showAlert('Profile', 'Your profile has been updated.');
        }
        this.uploadImage();
      }, err => {
        loader.dismiss();
        //this.common.showAlert('Error', JSON.stringify(err));
        this.uploadImage();
        this.common.showAlert('Profile', 'Your profile has been updated!');
      })

    }
  }
}

uploadImage(){
  if (this.userGetImage) {
    this.common.uploadImage('profile', this.userImage).then(data => {
      //loader.dismiss();
      let res: any = data;
      if(res.response.status){

      }
      //this.common.showAlert('Success Image', JSON.stringify(data))
    }, err => {
      //loader.dismiss();
      if(err.message){
        this.common.showAlert('Error Image', err.message);
      } else {
        this.common.showAlert('Error Image', JSON.stringify(err));
      }
      
    })
  }
}

}
