import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/agent/home/home';
import { User } from '../providers/user/user';
import { CommonProvider } from '../providers/providers';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
 
  rootPage: any = 'ProductsPage';
  hasLoggedIn: boolean = false;
  pages: Array<{title: string, icon?: string, component: any}>;
  pagesCustomer: Array<{title: string, icon?: string, component: any}>;
  pagesMerchant: Array<{title: string, icon?: string, component: any}>;

  //isAgent: boolean;
  constructor(public events: Events, public common: CommonProvider, public user: User, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Orders', component: 'OrdersPage', icon: "clipboard" },
      { title: 'Transactions', component: 'TransactionsPage', icon: "cash" },
      { title: 'Products', component: 'ProductsPage', icon: "cube" },
    ];

    this.pagesCustomer = [
      { title: 'Products', component: 'ProductsPage', icon: "cube" },
      { title: 'Status', component: 'StatusPage', icon: "analytics" }
    ];

    this.pagesMerchant = [
      { title: 'Dashboard', component: 'MerchantDashboardPage', icon: "speedometer" },
      { title: 'Products', component: 'MerchantProductsPage', icon: "cube" }
    ];

    this.listenToLoginEvents();

    this.user.hasLoggedIn().then((loggedIn) => {
      this.events.publish('user:login', loggedIn);
    }, err => {
      this.events.publish('user:logout');
      this.rootPage = 'ProductsPage';
    })
  }

  imageProfile(){
    if(this.showUser().url_image){
      return this.common.showUserImage();
    }
    return 'assets/imgs/user.png';
  }

  profilePage(){
    this.menuCtrl.close();
    this.nav.setRoot('ProfilePage');
  }

  isAgent():boolean{
    return this.user.userType() == 'a';
  }

  isCustomer(): boolean {
    return this.user.userType() == 'c';
  }

  isMerchant(): boolean {
    return this.user.userType() == 'm';
  }

  logout(){
    this.common.destroyData().then(res => {
      this.menuCtrl.close();
      this.user.setUserType('g');
    this.enableMenu(false);
      this.user.logout();
      this.nav.setRoot('LoginPage', {}, {animate: true});
    });
  }

  showUser(){
    return this.common.getUserData();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
 
  enableMenu(loggedIn: boolean) {
    this.menuCtrl.enable(loggedIn, 'loggedInMenu');
    this.menuCtrl.enable(!loggedIn, 'loggedOutMenu');
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  listenToLoginEvents() {

    this.events.subscribe('user:login', (user) => {
      this.common.setUserData(user);
      if(user.role == 'Customer'){
        this.user.setUserType('c');
        this.nav.setRoot('ProductsPage');
      } else if (user.role == 'Agent'){
        this.user.setUserType('a');
        this.nav.setRoot(HomePage);
      } else if (user.role == 'Merchant'){
        this.user.setUserType('m');
        this.nav.setRoot('MerchantDashboardPage');
      }
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      //this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }
}
