import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/agent/home/home';
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
import { MapPageModule } from '../pages/general/map/map.module';
import { Api, Products, User } from '../providers/providers';
import { HttpClientModule } from '@angular/common/http';
import { TncPageModule } from '../pages/general/tnc/tnc.module';
import { CommonProvider } from '../providers/common/common';
import { StatusDetailPageModule } from '../pages/customer/status-detail/status-detail.module';
import { RegisterPageModule } from '../pages/general/register/register.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
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
    MapPageModule,
    HttpClientModule,
    TncPageModule,
    StatusDetailPageModule,
    RegisterPageModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    Api, 
    Products, 
    User,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonProvider
  ]
})
export class AppModule {}
