import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonProvider } from '../common/common';
import { Api } from '../api/api';
/*
  Generated class for the WalletProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Wallet {

  constructor(public http: HttpClient, public common: CommonProvider, public api: Api) {
    console.log('Hello WalletProvider Provider');
  }

  getBalance(){
    return new Promise(resolve => {
      this.common.getData('USER').then(response => {
        let user: any = response;
        this.api.get('wallet/balance/' + user.id).subscribe(res => {
          resolve(res);
        })
      }, err => {
        console.log('err: ' + JSON.stringify(err))
      });
    });
  }

  getTransaction(){
    let date = new Date();
    let body = new FormData();

    body.append('year', date.getFullYear().toString());

    return new Promise(resolve => {
      this.common.getData('USER').then(response => {
        let user: any = response;
        this.api.post('transaction/history/' + user.id, body).subscribe(res => {
          resolve(res);
        })
      }, err => {
        console.log('err: ' + JSON.stringify(err))
      });
    });
  }

  requestWithdrawal(withdrawAmount: any){
    let body = new FormData();
    body.append('amount', withdrawAmount.toString());
    //console.log(JSON.stringify(body));
    return new Promise((resolve, reject) => {
      this.common.getData('USER').then(response => {
        let user: any = response;
        this.api.post('withdraw/withdraw-request/' + user.id, body).subscribe(res => {
          console.log(res);
          let result: any = res;
          if(result.status){
            resolve(res);
          } else {
            reject(res);
          }
        })
      }, err => {
        console.log('err: ' + JSON.stringify(err));
        reject(err)
      });
    });
  }

}

