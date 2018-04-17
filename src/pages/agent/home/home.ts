import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { RequestPage } from '../request/request';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  openRequest(){
    let modalCss = {
      showBackdrop: true,
      enableBackdropDismiss: false,
      cssClass: "my-modal"
  }
    let modal = this.modalCtrl.create(RequestPage, {}, modalCss);
    modal.present();
    modal.onDidDismiss(data => {
      if(data.accept){
        this.navCtrl.setRoot('OrdersPage', {}, {animate: true});
      }
    });
  }

  doRefresh(refresher) {
    this.openRequest();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 500);
  }

}
