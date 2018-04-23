import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { Api } from '../api/api';

@Injectable()
export class Products {

  constructor(public api: Api) { }

  query(params?: any) {
    return new Promise(resolve=>{
      this.api.get('products.json', params).subscribe(res=>{
        resolve(res);
      })
    });
      //return response;
  }

  addToCart(product: Product) {

  }

  updateCart(){

  }

  deleteCart(product: Product) {

  }

  clearCart(){
    
  }

}
