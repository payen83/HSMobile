import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User, CommonProvider, Jobs } from '../../../providers/providers';

/**
 * Generated class for the MerchantDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-merchant-dashboard',
  templateUrl: 'merchant-dashboard.html',
})
export class MerchantDashboardPage {
 
  dashboardData: {order_today: number, order_month: number, totalsales: number, product_available: number};
  userData: any;
  latestOrders: Array<any>;

  constructor(public job: Jobs, public common: CommonProvider, public user: User, public navCtrl: NavController, public navParams: NavParams) {
    this.dashboardData = {order_today: 0, order_month: 0, totalsales: 0, product_available: 0};
    this.userData = this.navParams.get('user');
    this.latestOrders = [];
  }

  ionViewDidLoad() {
    if (!this.userData){
      this.common.getData('USER').then(response => {
        console.log(response);
        this.userData = response;
        this.dashboard();
        this.getLatestOrders();
      })
    } else {
      this.dashboard();
      this.getLatestOrders();
    }
  }

  dashboard(){
    this.user.getMerchantDashboard(this.userData).then(response => {
      let result: any = response;
      this.dashboardData = result;
      console.log(this.dashboardData);
    }, err => {
      this.common.showAlert('Err', JSON.stringify(err))
    });
  }

  getLatestOrders(){
    this.job.merchantLatestOrder().then(res => {
      let result: any = res;
      this.latestOrders = result;
    })
  }

}
