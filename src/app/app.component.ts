import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/agent/home/home';
import { User } from '../providers/user/user';
import { CommonProvider } from '../providers/providers';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'ProductsPage';
  hasLoggedIn: boolean = false;
  pages: Array<{ title: string, icon?: string, component: any }>;
  pagesCustomer: Array<{ title: string, icon?: string, component: any }>;
  pagesMerchant: Array<{ title: string, icon?: string, component: any }>;

  constructor(private oneSignal: OneSignal, public events: Events, public common: CommonProvider, public user: User, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController) {
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
      { title: 'Status', component: 'StatusPage', icon: "analytics" },
      { title: 'Pickup Stores', component: 'StorePage', icon: "pin" },
    ];

    this.pagesMerchant = [
      { title: 'Dashboard', component: 'MerchantDashboardPage', icon: "speedometer" },
      { title: 'Products', component: 'MerchantProductsPage', icon: "cube" },
      { title: 'Orders', component: 'MerchantOrdersPage', icon: "clipboard" },
      { title: 'Transactions', component: 'TransactionsPage', icon: "cash" }
    ];

    this.listenToLoginEvents();

    this.user.hasLoggedIn().then((loggedIn) => {
      this.events.publish('user:login', loggedIn);
    }, err => {
      this.events.publish('user:logout');
      this.rootPage = 'ProductsPage';
    })
  }

  imageProfile() {
    if (this.showUser().url_image) {
      return this.common.showUserImage();
    }
    return 'assets/imgs/user.png';
  }

  profilePage() {
    this.menuCtrl.close();
    this.nav.setRoot('ProfilePage');
  }

  isAgent(): boolean {
    return this.user.userType() == 'a';
  }

  isCustomer(): boolean {
    return this.user.userType() == 'c';
  }

  isMerchant(): boolean {
    return this.user.userType() == 'm';
  }

  logout() {
    this.common.destroyData().then(res => {
      this.menuCtrl.close();
      this.user.setUserType('g');
      this.enableMenu(false);
      this.user.logout();
      this.nav.setRoot('LoginPage', {}, { animate: true });
    });
  }

  showUser() {
    return this.common.getUserData();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.initializeOneSignal();
    });
  }

  initializeOneSignal(){
    this.oneSignal.startInit('1d01174b-ba24-429a-87a0-2f1169f1bc84', '713119621249');
    this.oneSignal.getIds().then(data => {
      // alert(JSON.stringify(data));
      this.common.saveData('PLAYER_ID', data.userId);
    }, err => {
      console.log(err);
    })
    this.oneSignal.endInit();
  }

  enableMenu(loggedIn: boolean) {
    this.menuCtrl.enable(loggedIn, 'loggedInMenu');
    this.menuCtrl.enable(!loggedIn, 'loggedOutMenu');
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  setPlayerId(user){
    this.user.savePlayerId(user).then(res=>{
      console.log('done saved')
    }, err => {
      console.log(err);
    });
  }

  listenToLoginEvents() {

    this.events.subscribe('user:login', (user) => {
      this.common.setUserData(user);
      //disable i
      this.setPlayerId(user);
      if (user.role == 'Customer') {
        this.user.setUserType('c');
        this.nav.setRoot('ProductsPage');
      } else if (user.role == 'Agent') {
        this.user.setUserType('a');
        this.nav.setRoot(HomePage);
      } else if (user.role == 'Merchant') {
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
