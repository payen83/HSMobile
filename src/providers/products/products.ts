import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { Api } from '../api/api';

@Injectable()
export class Products {
  products: any;
  constructor(public api: Api) { 
    this.products = { products: [
      {
        "id": 1,
        "name": "EssensiaPlus",
        "price": 500,
        "currency": "USD",
        "description": "Health product",
        "image_url": "../assets/imgs/essentiaplus.png",
        "package": {
          "quantity_per_package": 3,
          "discount": 0.3
        }
      },
      {
        "id": 2,
        "name": "Night Cream",
        "price": 300,
        "currency": "USD",
        "description": "Sleep cream product",
        "image_url": "../assets/imgs/nightcream.jpg",
        "package": {
          "quantity_per_package": 5,
          "discount": 0.2
        }
      }
    ]};
  }

  query(params?: any) {
    return new Promise(resolve=>{
      //this.api.get('products.json', params).subscribe(res=>{
        //resolve(res);
        resolve(this.products);
      //})
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
