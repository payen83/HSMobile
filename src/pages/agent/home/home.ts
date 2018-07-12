import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { RequestPage } from '../request/request';
import { Api, User, Jobs } from '../../../providers/providers';
import { CommonProvider } from '../../../providers/common/common';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  requestList: Array<any>;
  reqTemp: any;
  stocks: Array<any>;

  constructor(protected jobs: Jobs, public user: User, public common: CommonProvider, public api: Api, public navCtrl: NavController, public modalCtrl: ModalController) {
    this.requestList=[];
    this.stocks=[];
    //http://healthshoppe.elyzian.xyz/api/products/product-inventory/24

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
    this.loadRequest();
    this.getProductInventory();
  }

  loadRequest(){
    this.getLatestRequest().then(result=>{
      let fetchedRequest: any = result;
      this.requestList = fetchedRequest;
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
        this.jobs.acceptJob(requestItem.JobID).then(res => {
          this.common.showAlert('', 'Congrats! Go send the item ASAP!');
          this.navCtrl.setRoot('OrdersPage', {}, {animate: true});
        }, err => {
          if (err.message){
            this.common.showAlert('', err.message)
          } else {
            this.common.showAlert('Error', JSON.stringify(err))
          }
        }); 
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

  getProductInventory(){
    this.common.getData('USER').then(response => {
      if (response){
        console.log(response);
        let result: any = response;
        //this.user = result;
        this.user.agentInventory(result.id).then(i_response=>{
          let res: any = i_response;
          if (!this.common.isEmpty(res.inventories)){
            this.stocks = res.inventories;
            console.log(this.stocks);
          }
        });
      }
    }, err => {
        console.log('err: ' + JSON.stringify(err))
    })
  }

  getPath(url: string){
    return this.common.getAPI_URL() + url;
  }

  getLatestRequest(){
    return new Promise(resolve=>{
      this.api.get('job/pending-job').subscribe(res=>{
        resolve(res);
      }, err => {
        this.common.showAlert('Error',JSON.stringify(err))
      })
    });
  }

}
