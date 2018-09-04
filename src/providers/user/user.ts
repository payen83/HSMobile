import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/share';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { CommonProvider } from '../common/common';


/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;
  _type: string;

  constructor(public api: Api, public common: CommonProvider) {
    this._type = 'g';
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any): Promise<any> {
    //let seq = this.api.post('login', accountInfo).share();
    let seq = this.api.post('auth/login', accountInfo);
    return new Promise((resolve, reject) => {
      seq.subscribe((res: any) => {
        // If the API returned a successful response, mark the user as logged in
        // console.log(res);
        if (res.status == true) {
          this._loggedIn(res);
          resolve(res);
        } else {
          reject(res);
        }
      }, err => {
        reject(err);
        console.error('ERROR', err);
      });
    })
    //return seq;
  }

  hasLoggedIn(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.common.getData('USER').then(resp => {
        let res: any = resp;
        if (res) {
          setTimeout(() => {
            resolve(res);
          }, 500);
        } else {
          reject(false)
        }
      }, err => {
        reject(false)
      })
    })
  }

  userType() {
    return this._type;
  }

  setUserType(type) {
    this._type = type;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any): Promise<any> {
    // let seq = this.api.post('signup', accountInfo).share();
    let seq = this.api.post('auth/register', accountInfo);
    return new Promise((resolve, reject) => {
      seq.subscribe((res: any) => {
        // If the API returned a successful response, mark the user as logged in
        if (res.status == true) {
          this._loggedIn(res);
          resolve(res);
        } else {
          reject(res);
        }
      }, err => {
        console.error('ERROR', err);
        reject(err);
      });
    })

    //return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }

  agentInventory(id) {
    let seq = this.api.get('products/product-inventory/' + id);
    return new Promise((resolve, reject) => {
      seq.subscribe((res: any) => {
        resolve(res);
      }, err => {
        console.error('ERROR', err);
        reject(err);
      });
    })
  }

  getDashboard(user: any) {
    return new Promise((resolve, reject) => {
      // this.common.getData('USER').then(response => {
      //let user: any = response;
      this.api.get('dashboard/view/' + user.id).subscribe(res => {
        let response: any = res;
        if (response.status) {
          resolve(res);
        } else {
          reject(res)
        }
      })
      // }, err => {
      //   console.log('err: ' + JSON.stringify(err))
      // });
    });
  }

  saveProfile(user: any) {
    //console.log('user info');
    //console.log(user);
    let seq = this.api.post('users/update-profile/' + user.id, user);
    return new Promise((resolve, reject) => {
      seq.subscribe((res: any) => {
        // If the API returned a successful response, mark the user as logged in
        if (res.status == true) {
          resolve(res);
        } else {
          reject(res);
        }
      }, err => {
        console.error('ERROR', err);
        reject(err);
      });
    })

  }

  getMerchantDashboard(user: any) {
    return new Promise((resolve, reject) => {
      this.api.get('dashboard/merchant-view/' + user.id).subscribe(res => {
        let response: any = res;
        if (response.status) {
          resolve(res);
        } else {
          reject(res)
        }
      })
    });
  }

  savePlayerId(user) {
    return new Promise((resolve, reject) => {
      this.common.getData('PLAYER_ID').then(response => {
        let playerId: any = response;
        let body = new FormData();
        body.append('playerId', playerId);
        let seq = this.api.post('users/user-save-playerId/' + user.id, body);
        seq.subscribe((res: any) => {
          if (res.status == true) {
            resolve(res);
          } else {
            reject(res);
          }
        }, err => {
          console.error('ERROR', err);
          reject(err);
        });
      }, err => {
        console.log(err);
        reject(err)
      })
    })
  }

  forgotPassword(email){
    return new Promise((resolve, reject) => {
        
        let body = new FormData();
        body.append('email', email);
        let seq = this.api.post('auth/forgot/password', body);
        seq.subscribe((res: any) => {
          if (res.status == true) {
            resolve(res);
          } else {
            reject(res);
          }
        }, err => {
          console.error('ERROR', err);
          reject(err);
        });
      
    })
  }

}
