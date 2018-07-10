import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Jobs } from '../../../providers/providers';

/**
 * Generated class for the StatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {
  status: any;
  activeJobs: Array<any>;
  completedJobs: Array<any>
  constructor(public navCtrl: NavController, public navParams: NavParams, private job: Jobs) {
    this.completedJobs = [];
    this.activeJobs = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
    this.status = 'active';
    this.job.getOrders().then(result => {
      let joblist: any = result;
      this.filterList(joblist);
    })
  }

  statusDetail(){
    this.navCtrl.push('StatusDetailPage');
  }

  filterList(jobs: Array<any>){
    for (let job of jobs){
      if (job.current_status == 'Completed'){
        this.completedJobs.push(job);
      } else {
        this.activeJobs.push(job);
      }
    }
  }

}
