import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonProvider } from '../common/common';
import { Api } from '../api/api';
//import { CommonProvider, Api } from '../providers/';

@Injectable()
export class Jobs {

  constructor(public http: HttpClient, public common: CommonProvider, public api: Api) {
    //console.log('Hello JobsProvider Provider');
  }

  getOrders(): Promise<any> {
    return new Promise(resolve => {
      this.common.getData('USER').then(response => {
        let user: any = response;
        this.api.get('job/view-order-status/' + user.id).subscribe(res => {
          resolve(res);
        })
      }, err => {
        console.log('err: ' + JSON.stringify(err))
      })
    });
  }

  purchaseOrder(orders: any, user: any){
    /*total_price: this.totalPrice,
      role: 'customer',
      payment_method: 'PayPal',
      amount: this.totalPrice,
      transaction_id: 'PAY-1AB23456CD789012EF34GHIJ',
      currency: 'USD',
      payment_date: '2018-07-09',
      data: products, 
      location_address: this.address,
      lng: (this.user.lat || 101.6553845),
      lat: (this.user.lng || 3.1639173),
      special_notes: this.note */
   // console.log(orders.products);

    // let body: any = 'total_price=' + orders.total_price;
    // body += '&role=' + orders.role;
    // body += '&payment_method=' + orders.payment_method;
    // body += '&amount=' + orders.amount;
    // body += '&transaction_id=' + orders.transaction_id;
    // body += '&currency=' + orders.currency;
    // body += '&payment_date=' + orders.payment_date;
    // body += '&data=' + '[{ "ProductID": 1, "ProductQuantity": 1, "Discount": 0}, {"ProductID": 3, "ProductQuantity": 2, "Discount": 0}]';
    // body += '&location_address=' + encodeURI(orders.location_address);
    // body += '&Lng=' + orders.lng;
    // body += '&Lat=' + orders.lat;
    // body += '&special_notes=' + orders.special_notes;
    let body = JSON.stringify(orders);
    console.log('body:')
    console.log(body);

    return new Promise((resolve,reject) => {
      this.api.post('purchase/orders/' + user.id, body).subscribe(res => {
        console.log('response');
        
        let response: any = res;
        console.log(response);

        if(response.status){
          resolve(res);
        } else {
          reject(res);
        } 
      }, err => {
        console.log('err: ' + JSON.stringify(err));
        reject(err);
      });
    });
  }
}
