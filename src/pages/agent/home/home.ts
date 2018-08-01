import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
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
  availableStock: number;
  userData: any;
  dashboardData: {status: boolean, completed_job: string, activetask: string, totalsales: string};
  total_sales: any;
  constructor(protected navParams: NavParams, protected jobs: Jobs, public user: User, public common: CommonProvider, public api: Api, public navCtrl: NavController, public modalCtrl: ModalController) {
    this.requestList = [];
    this.stocks = [];
    this.dashboardData = {status: null, completed_job: null, activetask: null, totalsales: null};
    this.availableStock = null;
    this.userData = this.navParams.get('user');
  }
 
  ionViewDidLoad(){
    console.log('dashboard here');

    console.log('userData: ')
    console.log(this.userData);
    if (!this.userData){
      this.common.getData('USER').then(response => {
        console.log(response);
        this.userData = response;
        this.getProductInventory();
        this.dashboard();
      })
    } else {
      this.getProductInventory();
      this.dashboard();
    }
  }

  dashboard() {
    this.user.getDashboard(this.userData).then(response => {
      let result: any = response;
      this.dashboardData = result;
      this.total_sales = this.convertAmount(result.totalsales);
      console.log(this.dashboardData);
    }, err => {
      this.common.showAlert('Err', JSON.stringify(err))
    });
  }

  convertAmount(amount: any){
    if(!(amount)){ 
      return 0;
    } else {
      return parseFloat(amount).toFixed();
    }
  }

  loadRequest(){
    this.getLatestRequest().then(result=>{
      console.log(result);
      let fetchedRequest: any = result;
      this.requestList = fetchedRequest;
      if(!this.common.isEmpty(this.requestList)){
        this.openRequest(this.requestList.shift());
      }
    });
  }

  stockAvailable(requestItem: any){
    //console.log('request');
   // console.log(requestItem);
    if (!this.common.isEmpty((this.stocks))) {
      for (let item of requestItem.orders){
        let selectedIndex = this.stocks.findIndex(avail_item => avail_item.product_id == item.ProductID);
        if (selectedIndex >= 0) {
          if(parseInt(item.ProductQuantity) <= parseInt(this.stocks[selectedIndex].quantity)){
            continue;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
      return true;
      
    } else {
      return false;
    }
    
  }

  openRequest(requestItem: any){

    let modalCss = {
      showBackdrop: true,
      enableBackdropDismiss: false,
      cssClass: "my-modal"
    }
    if(this.stockAvailable(requestItem)){
      let modal = this.modalCtrl.create(RequestPage, {item: requestItem}, modalCss);
      modal.present();
      modal.onDidDismiss(data => {
        if(data.accept){
          if(this.userData.u_phone){
            this.jobs.acceptJob(requestItem.JobID).then(res => {
              this.common.showAlert('', 'Congratulations! Go send the item ASAP!');
              this.navCtrl.setRoot('OrdersPage', {}, {animate: true});
            }, err => {
              if (err.message){
                this.common.showAlert('', err.message)
              } else {
                this.common.showAlert('Error', JSON.stringify(err))
              }
            });
          } else {
            this.common.showAlert('', 'Before you accept any order request, please enter your phone number in profile');
          }
        } else {
          if(!this.common.isEmpty(this.requestList)){
            this.openRequest(this.requestList.shift());
          }
        }
      });
    } else {
      if(!this.common.isEmpty(this.requestList)){
        this.openRequest(this.requestList.shift());
      }
    }
  }

  doRefresh(refresher) {
    setTimeout(() => {
      //console.log('Async operation has ended');
      this.ionViewDidLoad();
      refresher.complete();
    }, 500);
  }

  countStock(stocks: Array<any>): number{
    let quantity: number = 0;
    for (let stock of stocks){ quantity += parseInt(stock.quantity) }
    return quantity;
  }

  getProductInventory(){
    this.user.agentInventory(this.userData.id).then(i_response=>{
      let res: any = i_response;
      console.log('inventory');
      console.log(res);
      if (!this.common.isEmpty(res)){
        this.stocks = res;
        this.availableStock = this.countStock(this.stocks);
        // console.log(this.stocks);
        this.loadRequest();
      }
    }, err=>{
      console.log(JSON.stringify(err));
    });
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


 //this.navParams.get('user')
    // this.reqTemp = {requests:[
    //   {
    //     "id": 1,
    //     "location": "39-1 Jalan Equine 9A, Equine Park, Seri Kembangan",
    //     "products": [
    //       {
    //         "id": 1,
    //         "name": "EssensiaPlus",
    //         "qty": 1
    //       },
    //       {
    //         "id": 2,
    //         "name": "Night Cream",
    //         "qty": 1
    //       }
    //     ]
    //   },
    //   {
    //     "id": 2,
    //     "location": "D14-4 Sentul Murni Kondo, Jalan Dato Senu 3, 53200 Kuala Lumpur",
    //     "products": [
    //       {
    //         "id": 1,
    //         "name": "EssensiaPlus",
    //         "qty": 2
    //       }
    //     ]
    //   }
    // ]}