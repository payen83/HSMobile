import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Jobs, CommonProvider } from '../../../providers/providers';

/**
 * Generated class for the DeliverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deliver',
  templateUrl: 'deliver.html',
})
export class DeliverPage {
  method: string;
  tracking: string;
  jobID: any;
  constructor(public job: Jobs, public common: CommonProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.jobID = this.navParams.get('jobID');
  }

  ionViewDidLoad() {
  }

  close(){
    this.viewCtrl.dismiss();
  }

  submitDelivery(){
    let loader = this.common.showLoader();
    this.job.merchantMarkDelivered(this.method, this.tracking, this.jobID).then(() => {
      loader.dismiss();
      this.common.showAlert('','This order has been marked as complete')
      this.viewCtrl.dismiss(true);
    }, err => {
      loader.dismiss();
      this.common.showAlert('Error', err.message);
    })
  }

}
