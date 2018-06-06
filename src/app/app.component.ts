import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/agent/home/home';
import { LoginPage } from '../pages/general/login/login';
import { User } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
 
  rootPage: any = LoginPage;
  hasLoggedIn: boolean = false;
  pages: Array<{title: string, icon?: string, component: any}>;
  pagesCustomer: Array<{title: string, icon?: string, component: any}>;

  //isAgent: boolean;
  constructor(public user: User, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Orders', component: 'OrdersPage', icon: "clipboard" },
      { title: 'Transactions', component: 'TransactionsPage', icon: "cash" },
      { title: 'Products', component: 'ProductsPage', icon: "apps" },
      // { title: 'Status', component: 'StatusPage', icon: "analytics" }
    ];

    this.pagesCustomer = [
      // { title: 'Home', component: HomePage, icon: 'home' },
      // { title: 'Orders', component: 'OrdersPage', icon: "clipboard" },
      // { title: 'Transactions', component: 'TransactionsPage', icon: "cash" },
      { title: 'Products', component: 'ProductsPage', icon: "apps" },
      { title: 'Status', component: 'StatusPage', icon: "analytics" }
    ];
    
    // if (!this.hasLoggedIn){
    //   //this.setProfile();
    //   this.rootPage = LoginPage; 
    //   this.enableMenu();
    //   //this.rootPage = Home;
    //   //localStorage.setItem('hasLoggedIn', JSON.stringify(true));
    //   return;
    // }
    this.user.hasLoggedIn().then((loggedIn) => {
      
        if (!loggedIn){
          this.rootPage = LoginPage;
        }
        this.enableMenu(loggedIn === true);
        
    })

    //this.enableMenu();
    //this.isAgent = true;
  }

  profilePage(){
    this.menuCtrl.close();
    this.nav.setRoot('ProfilePage');
  }

  isAgent():boolean{
    return this.user.userType() == 'a';
  }

  logout(){
    this.menuCtrl.close();
    //this.enableMenu(false);
    this.nav.setRoot('LoginPage', {}, {animate: true});
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
   // console.log('Hi')
   // console.log(loggedIn);
    this.menuCtrl.enable(loggedIn, 'loggedInMenu');
    this.menuCtrl.enable(!loggedIn, 'loggedOutMenu');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
