import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  dashboardData: {orders_today: number, completed_orders: number, total_sales: number, products: number};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dashboardData = {orders_today: 0, completed_orders: 0, total_sales: 0, products: 0};
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MerchantDashboardPage');
  }

}
