import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Jobs, CommonProvider } from '../../../providers/providers';

/**
 * Generated class for the StatusDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    this.timeline = [];
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

  showAcceptButton(): boolean{
    return this.job.current_status == 'Pending Completion';
  }

  showCancelButton(){
    return this.job.current_status == 'Active';
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
    if (url.url_image == null) {
      return null;
    } else {
      return this.common.getAPI_URL() + url.url_image;
    }
  }

}
