import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/agent/home/home';
//import { LoginPage } from '../pages/general/login/login';
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

  //isAgent: boolean;
  constructor(public events: Events, public common: CommonProvider, public user: User, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Orders', component: 'OrdersPage', icon: "clipboard" },
      { title: 'Transactions', component: 'TransactionsPage', icon: "cash" },
      { title: 'Products', component: 'ProductsPage', icon: "apps" },
    ];

    this.pagesCustomer = [
      { title: 'Products', component: 'ProductsPage', icon: "apps" },
      { title: 'Status', component: 'StatusPage', icon: "analytics" }
    ];

    this.listenToLoginEvents();

    this.user.hasLoggedIn().then((loggedIn) => {
      this.events.publish('user:login', loggedIn);
      if(loggedIn){
        if(loggedIn.role == 'Customer'){
          this.user.setUserType('c');
          this.rootPage = 'ProductsPage';
        } else {
          this.user.setUserType('a');
          this.rootPage = HomePage;
        }
      }
    }, err => {
      this.events.publish('user:logout');
      this.rootPage = 'ProductsPage';
    })
  }

  imageProfile(){
    if(this.showUser().url_image){
      return this.common.getProfileImage_URL() + this.showUser().url_image;
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

  isGuest(): boolean {
    return this.user.userType() == 'g';
  }

  logout(){
    this.common.destroyData().then(res=>{
      this.menuCtrl.close();
      this.user.setUserType('g');
    this.enableMenu(false);
      this.user.logout();
      this.nav.setRoot('LoginPage', {}, {animate: true});
    })
  }

  showUser(){
    return this.common.getUserData();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
 
  enableMenu(loggedIn: boolean) {
    this.menuCtrl.enable(loggedIn, 'loggedInMenu');
    this.menuCtrl.enable(!loggedIn, 'loggedOutMenu');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  listenToLoginEvents() {

    this.events.subscribe('user:login', (user) => {
      //localStorage.setItem('hasLoggedIn', JSON.stringify(true));
      //this.setProfile();
      this.common.setUserData(user)
      this.enableMenu(true);

      //this.isLoggedIn = true;
    });

    this.events.subscribe('user:signup', () => {
      //this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }
}
