import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TncPage } from './tnc';

@NgModule({
  declarations: [
    TncPage,
  ],
  imports: [
    IonicPageModule.forChild(TncPage),
  ],
})
export class TncPageModule {}
