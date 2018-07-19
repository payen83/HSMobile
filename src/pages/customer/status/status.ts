import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Jobs, CommonProvider } from '../../../providers/providers';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private job: Jobs, protected common: CommonProvider ) {
    this.initialize()
  }

  

  ionViewDidEnter() {
    console.log('ionViewDidLoad StatusPage');
    this.status = 'active';
    this.job.getOrders().then(result => {
      let joblist: any = result;
      this.filterList(joblist);
    })
  }

  initialize(){
    this.completedJobs = [];
    this.activeJobs = [];
  }

  statusDetail(job: any){
    if(!this.common.isEmpty(job.agent)){
      this.navCtrl.push('StatusDetailPage', {item: job});
    }
  }

  getProfileImage(url: any){
    if(url){
      return this.common.getProfileImage_URL()+url;
    } else {
      return null;
    }
  }

  getAgentName(job: any){
    if(!this.common.isEmpty(job.agent)){
      return job.agent[0].name;
    } else {
      return null
    }
  }

  getAgentImage(job){
    if(!this.common.isEmpty(job.agent)){
      return job.agent[0].url_image;
    } else {
      return null
    }
    
  }

  filterList(jobs: Array<any>){
    this.initialize()
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
