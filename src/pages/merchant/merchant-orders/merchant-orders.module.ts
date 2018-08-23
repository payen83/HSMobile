import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantOrdersPage } from './merchant-orders';

@NgModule({
  declarations: [
    MerchantOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(MerchantOrdersPage),
  ],
})
export class MerchantOrdersPageModule {}
