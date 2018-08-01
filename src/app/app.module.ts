import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MyApp } from './app.component';
import { HomePage } from '../pages/agent/home/home';

import { Api, Products, User, Jobs, CommonProvider, Wallet } from '../providers/providers';

import { RequestPageModule } from '../pages/agent/request/request.module';
import { OrdersPageModule } from '../pages/agent/orders/orders.module';
import { DetailsPageModule } from '../pages/agent/details/details.module';
import { ProfilePageModule } from '../pages/general/profile/profile.module';
import { LoginPageModule } from '../pages/general/login/login.module';
import { TransactionsPageModule } from '../pages/agent/transactions/transactions.module';
import { ProductsPageModule } from '../pages/customer/products/products.module';
import { CartPageModule } from '../pages/customer/cart/cart.module';
import { ConfirmationPageModule } from '../pages/customer/confirmation/confirmation.module';
import { CompletedPageModule } from '../pages/customer/completed/completed.module';
import { StatusPageModule } from '../pages/customer/status/status.module';
import { MapPageModule } from '../pages/general/map/map.module';
import { TncPageModule } from '../pages/general/tnc/tnc.module';
import { StatusDetailPageModule } from '../pages/customer/status-detail/status-detail.module';
import { RegisterPageModule } from '../pages/general/register/register.module';
import { ProductDetailsPageModule } from '../pages/customer/product-details/product-details.module';


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
    ProductDetailsPageModule,
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
    CommonProvider,
    Jobs,
    Geolocation,
    Wallet,
    CallNumber,
    InAppBrowser
  ]
})
export class AppModule {}
