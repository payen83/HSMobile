import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Jobs, CommonProvider } from '../../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {
  status: any;
  activeJobs: Array<any>;
  completedJobs: Array<any>
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, private job: Jobs, protected common: CommonProvider ) {
    this.initialize()
  }

  ionViewDidEnter() {
    // console.log('ionViewDidLoad StatusPage');
    // let loader = this.common.showLoader()
    this.job.getOrders().then(result => {
      //loader.dismiss();
      let joblist: any = result;
      this.filterList(joblist);
    })
  }

  ionViewDidLoad(){
    this.status = 'active';
  }

  initialize(){
    this.completedJobs = [];
    this.activeJobs = [];
  }

  statusDetail(job: any){
    //if(!this.common.isEmpty(job.agent)){
      this.navCtrl.push('StatusDetailPage', {item: job});
    //}
  }

  agentAvailable(job){
    return !this.common.isEmpty(job.agent)
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

  isStatusPending(job){
    return job.current_status == 'Pending';
  }

  call(job: any){
    if(!this.common.isEmpty(job.agent)){
      console.log(job.agent[0].u_phone);
      this.common.call((job.agent[0].u_phone).toString());
      // this.callNumber.callNumber((job.agent[0].u_phone).toString(), true)
      // .then(res => console.log('Launched dialer!', res))
    } else {
      return;
    }
  }

  wa(job: any){
    if(!this.common.isEmpty(job.agent)){
      this.common.openWhatsapp(job.agent[0].u_phone);
    } else {
      return;
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
    // console.log(this.activeJobs);
    console.log(this.completedJobs);
  }

  showStar(job){
    if(this.common.isEmpty(job.agent)){
      return false
    } else {
      return (job.agent[0].u_rating != "0.0")
    }
  }

  

  isRatingSubmitted(job){
    return job.job_rating != "0.0"
  }

  ratingNumber(job, rating){
    return parseInt(job.job_rating) >= rating;
  }

  showRating(job){
    if (this.showStar(job)){
      return job.agent[0].u_rating
    } else {
      return null;
    }
  }

  leaveFeedback(job){
    let modalCss = {
      showBackdrop: true,
      enableBackdropDismiss: false,
      cssClass: "my-modal"
    }
    let modal = this.modalCtrl.create('RatingPage', null, modalCss);

    modal.onDidDismiss(data => {
      if(data) {
        let loader = this.common.showLoader();
        this.job.sendRating(job.JobID, data.rating, data.feedback).then((data) => {
          loader.dismiss();
          console.log(data);
          this.common.showAlert('','Thank you for your feedback.');
        }, err => {
          loader.dismiss();
          this.common.showAlert('Feedback error', JSON.stringify(err.message));
        })
      }
    });
    modal.present();
  }


}
