import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/agent/home/home';
import { ListPage } from '../pages/list/list';
import { RequestPageModule } from '../pages/agent/request/request.module';
import { OrdersPageModule } from '../pages/agent/orders/orders.module';
import { DetailsPageModule } from '../pages/agent/details/details.module';
import { ProfilePageModule } from '../pages/general/profile/profile.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPageModule } from '../pages/general/login/login.module';
import { TransactionsPageModule } from '../pages/agent/transactions/transactions.module';
import { ProductsPageModule } from '../pages/customer/products/products.module';
import { CartPageModule } from '../pages/customer/cart/cart.module';
import { ConfirmationPageModule } from '../pages/customer/confirmation/confirmation.module';
import { CompletedPageModule } from '../pages/customer/completed/completed.module';
import { StatusPageModule } from '../pages/customer/status/status.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    RequestPageModule,
    DetailsPageModule,
    OrdersPageModule,
    ProfilePageModule,
    LoginPageModule,
    TransactionsPageModule,
    ProductsPageModule,
    CartPageModule,
    ConfirmationPageModule,
    CompletedPageModule,
    StatusPageModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
