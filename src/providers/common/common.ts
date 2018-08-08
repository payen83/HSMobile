import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ActionSheetController, normalizeURL } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';


/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {
  imagePath: string = 'http://healthshoppe.elyzian.xyz/public/upload/images/';
  profileImagePath: string = 'http://healthshoppe.elyzian.xyz/public/upload/userpic/';
  profileImage: string;
  userData: any;
  constructor(public camera: Camera, public actionSheetCtrl: ActionSheetController, public iab: InAppBrowser, public callNumber: CallNumber, public http: HttpClient, public alertCtrl: AlertController, private storage: Storage, private loadingCtrl: LoadingController, protected geolocation: Geolocation) {
    //console.log('Hello CommonProvider Provider');
    this.userData = { name: 'Default User', email: 'user@gmail.com' };
  }

  showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  isEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

  getAPI_URL() {
    return this.imagePath;
  }

  getProfileImage_URL() {
    return this.profileImagePath;
  }

  saveData(property: string, data: any) {
    return new Promise((resolve) => {
      this.setUserData(data);
      console.log(this.userData);
      this.storage.set(property, JSON.stringify(data)).then(res => {
        resolve(res);
      });
    })
  }

  setUserData(user: any) {
    this.userData = user;
  }

  destroyData(property?: string) {

    return new Promise((resolve, reject) => {
      if (property) {
        this.storage.remove(property).then(res => {
          resolve();
        })
      } else {
        this.storage.clear().then(res => {
          resolve();
        })
      }

    })
  }

  showLoader() {
    let loader = this.loadingCtrl.create({ spinner: 'circles' });
    loader.present();
    return loader;
  }

  getUserData() {
    return this.userData;
  }

  setImageUser(){
    this.userData.url_image = '';
  }

  showUserImage(){
    return this.getProfileImage_URL() + this.userData.url_image;
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        resolve(resp.coords);
      }).catch((error) => {
        console.log('Error getting location', error);
        reject(error);
      });
    });
  }

  getData(property: string) {
    return new Promise((resolve, reject) => {
      this.storage.get(property).then(items => {
        if (items) {
          let data: any = JSON.parse(items);
          resolve(data);
        } else {
          console.log('no data')
          reject('no data');
        }
      });
    })
  }

  convertAmount(amount: any) {
    let newNum = parseFloat(amount);
    return newNum.toFixed();
  }

  call(phone: any) {
    this.callNumber.callNumber((phone).toString(), true)
      .then(res => console.log('Launched dialer!', res))
  }

  openWhatsapp(phone: any) {
    let url: string = 'https://wa.me/' + this.setNumber(String(phone));
    console.log(url);
    this.iab.create(url);
  }

  setNumber(phoneNo) {
    phoneNo = phoneNo.replace(/-/g, '');
    phoneNo = phoneNo.replace(/\+/g, '');
    if (phoneNo.substr(0, 1) == '0') {
      phoneNo = '6' + phoneNo;
    }
    if (phoneNo.substr(0, 2) != '60') {
      phoneNo = '60' + phoneNo;
    }
    if (phoneNo.substr(2, 1) == '0') {
      phoneNo = phoneNo.splice(2, 1);
    }
    return phoneNo;
  }

  selectImage() {
    return new Promise<any>((resolve, reject) => {
      const actionSheet = this.actionSheetCtrl.create({
        title: 'Get image from..',
        buttons: [
          {
            text: 'Camera',
            handler: () => {
              resolve('camera')
            }
          }, {
            text: 'Gallery',
            handler: () => {
              resolve('gallery')
            }
          }, {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              // console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    })

  }

  takePicture(source){
    let pictureSource: any;
    return new Promise<any>((resolve, reject) => {
      if(source == 'camera'){
        pictureSource = this.camera.PictureSourceType.CAMERA;
      } else {
        pictureSource = this.camera.PictureSourceType.PHOTOLIBRARY;
      }
  
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: pictureSource,
        targetWidth: 1024,
        targetHeight: 768,
        correctOrientation: true
      }
      
      this.camera.getPicture(options).then((imageData) => {
        //let base64Image = 'data:image/jpeg;base64,' + imageData;
        resolve(normalizeURL(imageData));
      }, (err) => {
       // Handle error
       reject(err);
      });
    })
  }

}
