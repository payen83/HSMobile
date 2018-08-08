import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantDashboardPage } from './merchant-dashboard';

@NgModule({
  declarations: [
    MerchantDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(MerchantDashboardPage),
  ],
})
export class MerchantDashboardPageModule {}
