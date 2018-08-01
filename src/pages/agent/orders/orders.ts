import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Jobs } from '../../../providers/jobs/jobs';
import { CommonProvider } from '../../../providers/providers';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  status: any;
  activeJobs: Array<any>;
  completedJobs: Array<any>
  constructor(protected job: Jobs, public navCtrl: NavController, public navParams: NavParams, protected common: CommonProvider) {
    this.status = 'active';
    this.initialize();
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad OrdersPage');
    this.job.getOrdersAgent().then(result => {
      let joblist: any = result;
      console.log(joblist)
      this.filterList(joblist);
    });
  }

  initialize(){
    this.completedJobs = [];
    this.activeJobs = [];
  }

  pageDetails(item: any){
    this.navCtrl.push('DetailsPage', {item: item});
  }

  getImage(url: string){
    if(url == null){
      return null;
    } else {
      return this.common.getProfileImage_URL()+url;
    }
  }

  filterList(jobs: Array<any>){
    this.initialize();
    for (let job of jobs){
      if (job.current_status == 'Completed'){
        this.completedJobs.push(job);
      } else {
        this.activeJobs.push(job);
      }
    }
    this.activeJobs.reverse();
    this.completedJobs.reverse()
  }

}
