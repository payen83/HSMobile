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
  }

}
