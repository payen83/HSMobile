import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';


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
  constructor(public http: HttpClient, public alertCtrl: AlertController, private storage: Storage, private loadingCtrl: LoadingController, protected geolocation: Geolocation) {
    console.log('Hello CommonProvider Provider');
    this.userData = {name: 'Default User', email: 'user@gmail.com'};
  }

  showAlert(title: string, message: string){
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

  getAPI_URL(){
    return this.imagePath;
  }

  getProfileImage_URL(){
    return this.profileImagePath;
  }

  saveData(property: string, data: any){
    return new Promise((resolve)=>{
      this.setUserData(data);
      console.log(this.userData);
      this.storage.set(property, JSON.stringify(data)).then(res => {
        resolve(res);
      });
    })
  }

  setUserData(user: any){
    this.userData = user;
  }

  destroyData(property?: string){
    
    return new Promise((resolve, reject) => {
      if(property){
        this.storage.remove(property).then(res=>{
          resolve();
        })
      } else {
        this.storage.clear().then(res=>{
          resolve();
        })
      }

    })
  }

  showLoader(){
    let loader = this.loadingCtrl.create({spinner: 'circles'});
    loader.present();
    return loader;
  }

  getUserData(){
    return this.userData;
  }

  getLocation(){
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

  getData(property: string){
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

  convertAmount(amount: any){
    let newNum = parseFloat(amount);
    return newNum.toFixed();
  }

}
