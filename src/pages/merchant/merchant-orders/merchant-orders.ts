import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Jobs } from '../../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-merchant-orders',
  templateUrl: 'merchant-orders.html',
})
export class MerchantOrdersPage {
  status: any;
  activeJobs: Array<any>;
  completedJobs: Array<any>
  constructor(public job: Jobs, public navCtrl: NavController, public navParams: NavParams) {
    this.status = 'active';
    this.initialize()
  }

  initialize(){
    this.completedJobs = [];
    this.activeJobs = [];
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad OrdersPage');
    this.job.merchantPendingJob().then(result => {
      let joblist: any = result;
      console.log(joblist)
      this.filterList(joblist);
    });
  }

  pageDetails(item: any){
    this.navCtrl.push('DetailsPage', {item: item});
  }

  filterList(jobs: Array<any>){
    this.initialize();
    for (let job of jobs){
      if (job.current_status == 'Pending'){
        this.activeJobs.push(job);
      } else {
        this.completedJobs.push(job);
      }
    }
    this.activeJobs.reverse();
    this.completedJobs.reverse()
  }

}
