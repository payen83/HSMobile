import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonProvider } from '../common/common';
import { Api } from '../api/api';

@Injectable()
export class Jobs {
  user: any;
  constructor(public http: HttpClient, public common: CommonProvider, public api: Api) {
    this.common.getData('USER').then(response => {
      this.user = response;
    });
  }

  getOrderTimeline(jobID: number) {
    return new Promise((resolve, reject) => {
      this.api.get('job/view-order-timeline/' + jobID.toString()).subscribe(res => {
        console.log(res);
        resolve(res);
      }, err => {
        console.log('err: ' + JSON.stringify(err));
        reject(err);
      });
    });
  }

  getOrders(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.common.getData('USER').then(response => {
        let user: any = response;
        this.api.get('job/view-order-status/' + user.id).subscribe(res => {
          resolve(res);
        })
      }, err => {
        console.log('err: ' + JSON.stringify(err));
        reject(err);
      });
    });
  }

  getOrdersAgent() {
    return new Promise((resolve, reject) => {
      this.common.getData('USER').then(response => {
        let user: any = response;
        this.api.get('job/status-job/' + user.id).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
      })
    });
  }

  customerAcceptDelivery(JobID: any) {
    return new Promise((resolve, reject) => {
      this.common.getData('USER').then(response => {
        let user: any = response;

        let body = new FormData();
        body.append('user_id', user.id);

        this.api.post('job/accept-delivery/' + JobID.toString(), body).subscribe(res => {
          let result: any = res;
          if (result.status) {
            resolve(res);
          } else {
            reject(res);
          }
        }, err => {
          console.log('err: ' + JSON.stringify(err))
          reject(err);
        });
      }, err => {
        console.log('err: ' + JSON.stringify(err))
      });
    });
  }

  customerCancelOrder(JobID: any, reason: string) {
    return new Promise((resolve, reject) => {
      this.common.getData('USER').then(response => {
        //let user: any = response;
        let body = new FormData();
        body.append('message', reason.toString());

        this.api.post('job/cancel-job/' + JobID, body).subscribe(res => {
          let result: any = res;
          if (result.status) {
            resolve(res);
          } else {
            reject(res);
          }
        }, err => {
          console.log('err: ' + JSON.stringify(err))
          reject(err);
        });
      }, err => {
        console.log('err: ' + JSON.stringify(err))
      });
    });
  }

  customerRejectDelivery(JobID: any, reason: string) {
    return new Promise((resolve, reject) => {
      this.common.getData('USER').then(response => {
        let user: any = response;
        let body = new FormData();
        body.append('user_id', user.id);
        body.append('message', reason.toString());
        console.log(user.id, ' ', reason);

        this.api.post('job/reject-delivery/' + JobID, body).subscribe(res => {
          let result: any = res;
          if (result.status) {
            resolve(res);
          } else {
            reject(res);
          }
        }, err => {
          console.log('err: ' + JSON.stringify(err))
          reject(err);
        });
      }, err => {
        console.log('err: ' + JSON.stringify(err))
      });
    });
  }

  markAsComplete(JobID: any) {
    return new Promise((resolve, reject) => {
      this.common.getData('USER').then(response => {
        let user: any = response;

        let body = new FormData();
        body.append('user_id', user.id);

        this.api.post('job/agent-update-job/' + JobID, body).subscribe(res => {
          resolve(res);
        }, err => {
          console.log('err: ' + JSON.stringify(err))
          reject(err);
        });

      }, err => {
        console.log('err: ' + JSON.stringify(err))
      });
    });
  }

  acceptJob(jobID: number): Promise<any> {
    //let body = 'user_id=' + (this.user.id).toString();
    return new Promise((resolve, reject) => {
      this.common.getData('USER').then(response => {
        let user: any = response;
        let body = new FormData();
        body.append('user_id', user.id);
        this.api.post('job/accept-job/' + jobID, body).subscribe(res => {
          let result: any = res;
          console.log('result: ' + JSON.stringify(result));
          if (result.status) {
            resolve(res);
          } else {
            reject(res);
          }
        }, err => {
          console.log('err: ' + JSON.stringify(err))
          reject(err);
        })
      })
    });
  }

  purchaseOrder(orders: any, user: any) {
    let body = new FormData();

    body.append('role', orders.role);
    body.append('payment_method', orders.payment_method);
    body.append('total_price', orders.total_price);
    body.append('transaction_id', orders.transaction_id);
    body.append('currency', orders.currency);
    body.append('payment_date', orders.payment_date);
    body.append('data', JSON.stringify(orders.data));
    body.append('location_address', orders.location_address);
    body.append('lng', orders.lng);
    body.append('lat', orders.lat);
    body.append('special_notes', orders.special_notes);
    body.append('city', orders.city);
    body.append('state', orders.state);
    body.append('postcode', orders.postcode);

    return new Promise((resolve, reject) => {
      this.api.post('purchase/orders/' + user.id, body).subscribe(res => {
        console.log('response');

        let response: any = res;
        console.log(response);

        if (response.status) {
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

  merchantLatestOrder(){
    return new Promise((resolve, reject) => {
      this.common.getData('USER').then(response => {
        let user: any = response;
        this.api.get('dashboard/merchant-latest-order/' + user.id).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
      })
    });
  }

  merchantPendingJob(){
    return new Promise((resolve, reject) => {
      this.common.getData('USER').then(response => {
        let user: any = response;
        this.api.get('job/merchant-pending-job/' + user.id).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
      })
    });
  }

  sendRating(jobID, rating, feedback){
    return new Promise((resolve, reject) => {
      let body = new FormData();
      body.append('rating', rating);
      body.append('feedback', feedback);
      this.api.post('rating/job-feedback/' + jobID, body).subscribe(res => {
        let result: any = res;
        if (result.status) {
          resolve(res);
        } else {
          reject(res);
        }
      }, err => {
        console.log('err: ' + JSON.stringify(err))
        reject(err);
      })
    });
  }

}


