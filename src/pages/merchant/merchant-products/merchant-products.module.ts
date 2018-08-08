import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantProductsPage } from './merchant-products';

@NgModule({
  declarations: [
    MerchantProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(MerchantProductsPage),
  ],
})
export class MerchantProductsPageModule {}
