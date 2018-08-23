import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Jobs, CommonProvider } from '../../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-status-detail',
  templateUrl: 'status-detail.html',
})
export class StatusDetailPage {
  job: any;
  timeline: Array<any>;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public jobs: Jobs, protected common: CommonProvider) {
    this.job = this.navParams.get('item');
    if(this.common.isEmpty(this.job.agent)) {
      this.job.agent = [{name: null, url_image: null}];
    }
    this.timeline = [];
  }

  agentAvailable(){
    return (this.job.agent[0].name);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusDetailPage');
    this.getTimeline();
  }

  getTimeline(){
    this.jobs.getOrderTimeline(this.job.JobID).then(res => {
      let result: any = res;
      this.timeline = result.order_track;
      this.timeline = this.timeline.reverse();
    })
  }

  call(){
    if(!this.common.isEmpty(this.job.agent)){
      this.common.call((this.job.agent[0].u_phone).toString());
      console.log(this.job.agent[0].u_phone);
    } else {
      return;
    }
    
  }

  wa(){
    if(!this.common.isEmpty(this.job.agent)){
      this.common.openWhatsapp(this.job.agent[0].u_phone);
    } else {
      return;
    }
  }
  
  showAcceptButton(): boolean{
    return this.job.current_status == 'Pending Completion';
  }

  showCancelButton(){
    return this.job.current_status == 'Active';
  }

  showWaitingResponse(){
    return this.job.current_status == 'Reject';
  }

  rejectCancelDelivery(type: string){
    const prompt = this.alertCtrl.create({
      title: 'Are you sure you want to ' + type + ' this delivery?',
      message: "Please state your reason..",
      inputs: [
        {
          name: 'reason',
          placeholder: 'Enter your message here'
        },
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
            let loader: any = this.common.showLoader();
            if(type == 'reject') {

              this.jobs.customerRejectDelivery(this.job.JobID, data.reason).then(res=>{  
                loader.dismiss();            
                console.log(res);
                this.common.showAlert('Delivery rejected', 'The issue has been notified by the agent');
                this.navCtrl.pop();
              }, err => {
                loader.dismiss();
                if(err.message){
                  this.common.showAlert('Error', err.message);
                } else {
                  this.common.showAlert('Error', JSON.stringify(err));
                }
              })

            } else if (type == 'cancel'){
              this.jobs.customerCancelOrder(this.job.JobID, data.reason).then(res=>{  
                loader.dismiss();            
                console.log(res);
                this.common.showAlert('Order cancelled', 'Your cancellation has been processed and the product will be delivered by HQ');
                this.navCtrl.pop();
              }, err => {
                loader.dismiss();
                if(err.message){
                  this.common.showAlert('Error', err.message);
                } else {
                  this.common.showAlert('Error', JSON.stringify(err));
                }
              })
            }
            
          }
        }
      ]
    });
    prompt.present();
  }

  acceptDelivery(){
    const confirm = this.alertCtrl.create({
      title: 'Accept Delivery',
      message: 'Are you sure you want to accept the delivery?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.jobs.customerAcceptDelivery(this.job.JobID).then(res=>{              
              this.common.showAlert('', 'You have accepted the delivery');
              this.navCtrl.pop();
            }, err => {
              if(err.message){
                this.common.showAlert('Error', err.message);
              } else {
                this.common.showAlert('Error', JSON.stringify(err));
              }
            })
          }
        }
      ]
    });
    confirm.present();
  }

  getProfileImage(url: any){
    if(url){
      return this.common.getProfileImage_URL()+url;
    } else {
      return null;
    }
  }

  getProductImage(url: any){
    if (url) {
      return this.common.getAPI_URL() + url;
    } else {
      return null;
    }
  }

}
