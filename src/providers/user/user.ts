import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/share';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';


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

  constructor(public api: Api) { 
    this._type = 'c';
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any): Promise<any> {
    //let seq = this.api.post('login', accountInfo).share();
    let seq = this.api.post('auth/login', accountInfo);
    return new Promise((resolve, reject)=>{
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

  hasLoggedIn(): Promise<boolean>{
    return new Promise(resolve=>{
      setTimeout(() => {
        resolve(true);
      }, 500);
      
    })
  }

  userType(){
    return this._type;
  }

  setUserType(type){
    this._type = type;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any): Promise<any> {
    // let seq = this.api.post('signup', accountInfo).share();
    let seq = this.api.post('auth/register', accountInfo);
    return new Promise((resolve, reject)=>{
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

  agentInventory(id){
    let seq = this.api.get('products/product-inventory/'+id);
    return new Promise((resolve, reject)=>{
      seq.subscribe((res: any) => {
        resolve(res);
      }, err => {
        console.error('ERROR', err);
        reject(err);
      });
    })
  }

  saveProfile(user: any){
    //console.log('user info');
    //console.log(user);
    let seq = this.api.post('users/update-profile/'+user.id, user);
    return new Promise((resolve, reject)=>{
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

  
}
