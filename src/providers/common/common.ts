import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {

  constructor(public http: HttpClient, public alertCtrl: AlertController) {
    console.log('Hello CommonProvider Provider');
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

}
