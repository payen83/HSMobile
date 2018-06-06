import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { RequestPage } from '../request/request';
import { Api } from '../../../providers/api/api';
import { CommonProvider } from '../../../providers/common/common';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  requestList: Array<any>;
  reqTemp: any;

  constructor(public common: CommonProvider, public api: Api, public navCtrl: NavController, public modalCtrl: ModalController) {
    this.requestList=[];
    this.reqTemp = {requests:[
      {
        "id": 1,
        "location": "39-1 Jalan Equine 9A, Equine Park, Seri Kembangan",
        "products": [
          {
            "id": 1,
            "name": "EssensiaPlus",
            "qty": 1
          },
          {
            "id": 2,
            "name": "Night Cream",
            "qty": 1
          }
        ]
      },
      {
        "id": 2,
        "location": "D14-4 Sentul Murni Kondo, Jalan Dato Senu 3, 53200 Kuala Lumpur",
        "products": [
          {
            "id": 1,
            "name": "EssensiaPlus",
            "qty": 2
          }
        ]
      }
    ]}
  }

  ionViewDidLoad(){
    this.getLatestRequest().then(result=>{
      let fetchedRequest: any = result;
      this.requestList = fetchedRequest.requests;
      if(!this.common.isEmpty(this.requestList)){
        this.openRequest(this.requestList.shift());
      }
    });
  }

  openRequest(requestItem: any){
    let modalCss = {
      showBackdrop: true,
      enableBackdropDismiss: false,
      cssClass: "my-modal"
    }
    let modal = this.modalCtrl.create(RequestPage, {item: requestItem}, modalCss);
    modal.present();
    modal.onDidDismiss(data => {
      if(data.accept){
        this.navCtrl.setRoot('OrdersPage', {}, {animate: true});
      } else {
        if(!this.common.isEmpty(this.requestList)){
          this.openRequest(this.requestList.shift());
        }
      }
    });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      //console.log('Async operation has ended');
      refresher.complete();
    }, 500);
  }

  getLatestRequest(){
    return new Promise(resolve=>{
      //this.api.get('request.json', null).subscribe(res=>{
        // resolve(res);
        resolve(this.reqTemp);
      //})
    });
  }

}
