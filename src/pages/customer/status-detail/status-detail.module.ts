import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatusDetailPage } from './status-detail';

@NgModule({
  declarations: [
    StatusDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StatusDetailPage),
  ],
})
export class StatusDetailPageModule {}
