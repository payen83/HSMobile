import { Injectable } from '@angular/core';
// import { Product } from '../../models/product';
import { Api } from '../api/api';
import { CommonProvider } from '../common/common';

@Injectable()
export class Products {
  products: any;
  constructor(public api: Api, public common: CommonProvider) {
    // this.products = { products: [
    //   {
    //     "id": 1,
    //     "name": "EssensiaPlus",
    //     "price": 500,
    //     "currency": "USD",
    //     "description": "Health product",
    //     "image_url": "./assets/imgs/essentiaplus.png",
    //     "package": {
    //       "quantity_per_package": 3,
    //       "discount": 0.3
    //     }
    //   },
    //   {
    //     "id": 2,
    //     "name": "Night Cream",
    //     "price": 300,
    //     "currency": "USD",
    //     "description": "Sleep cream product",
    //     "image_url": "./assets/imgs/nightcream.jpg",
    //     "package": {
    //       "quantity_per_package": 5,
    //       "discount": 0.2
    //     }
    //   }
    // ]};
  }

  agentStockDeduct(products) {
    return new Promise((resolve, reject) => {
      this.common.getData('USER').then(response => {
        let user: any = response;
        let body = new FormData();
        body.append('data', JSON.stringify(products));
        this.api.post('product/stock-deduction/' + user.id, body).subscribe(res => {
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

  getProductMerchant() {
    return new Promise((resolve, reject) => {
      this.common.getData('USER').then(response => {
        let user: any = response;
        this.api.get('products/merchant-view-product/' + user.id).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err)
        })
      })
    });
  }

  addProductMerchant(product?: any, isEdit?: boolean) {
    return new Promise((resolve, reject) => {
      this.common.getData('USER').then(response => {
        let user: any = response;
        let body = new FormData();
        body.append('sku_number', product.sku_number);
        body.append('Name', product.Name);
        body.append('Price', product.Price);
        body.append('Description', product.Description);
        body.append('QuantityPerPackage', product.QuantityPerPackage);
        body.append('Discount', product.Discount);
        let url: string;
        if(isEdit){
          url = 'products/merchant-edit-product/' + product.id;
          body.append('user_id', user.id);
        } else {
          url = 'products/add-product-merchant/' + user.id;
        }
        // this.api.post('products/add-product-merchant/' + user.id, body).subscribe(res => {
        this.api.post(url, body).subscribe(res => {
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

  deleteProductMerchant(product: any){
    return new Promise((resolve, reject) => {
      this.common.getData('USER').then(response => {
        let user: any = response;
        let url: string = 'products/merchant-delete-product/' + product.id;;
        let body = new FormData();
        body.append('user_id', user.id);
        this.api.post(url, body).subscribe(res => {
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

  query(params?: any) {
    return new Promise(resolve => {
      this.api.get('products/product-customer', params).subscribe(res => {
        //resolve(res);
        resolve(this.products);
      })
    });
    //return response;
  }

  getProducts(params?: any) {
    return new Promise(resolve => {
      this.api.get('products/product-' + params, params).subscribe(res => {
        resolve(res);
      })
    });
  }

  getStores() {
    return new Promise((resolve, reject) => {
      this.api.get('store-location/view-list').subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    });
  }

}
