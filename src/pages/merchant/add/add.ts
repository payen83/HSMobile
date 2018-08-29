import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { CommonProvider, Products } from '../../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  productImage: any;
  product: { ImageURL?: string, sku_number?: string, Name: string, Price: number, Description: string, QuantityPerPackage: number, Discount: number, id?: any }
  isEdit: boolean = false;
  title: string = 'New Product';
  discount: number;
  isTakenPicture: boolean = false;

  constructor(public productsProvider: Products, public common: CommonProvider, public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
    this.product = { sku_number: null, Name: null, Price: null, Description: null, QuantityPerPackage: null, Discount: null }
    let item = this.navParams.get('item');
    console.log('item nav', item);
    this.isEdit = this.navParams.get('edit');
    if (item) {
      this.product = item;
      this.title = 'Edit Product';
      if(item.ImageURL != null){
        this.productImage = 'http://healthshoppe.elyzian.xyz/public/upload/images/'+this.product.ImageURL;
      }
      //console.log('product',this.product)
      this.discount = this.product.Discount * 100;
    }
    
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AddPage');
  }

  save() {
    let loader = this.common.showLoader();
    this.product.Discount = this.discount;
      this.productsProvider.addProductMerchant(this.product, this.isEdit).then(res => {
        loader.dismiss();
        let result: any = res;
        let prod_id: any;
        if(this.isTakenPicture){
          if(this.isEdit){
            prod_id = this.product.id;
          } else {
            prod_id = result.id;
          }
          this.uploadProductImage(prod_id);
        }
        if (result.status) {
          this.common.showAlert('', this.showCompleted(this.isEdit));
          this.navCtrl.pop();
        } else {
          this.common.showAlert('', result.message);
        }
      }, err => {
        loader.dismiss();
        this.common.showAlert('Error', JSON.stringify(err))
      })
  }

  showCompleted(isEdited): string{
    if(isEdited){
      return 'Your product has been updated';
    } else {
      return 'Your product has been created and pending for approval.';
    }
  }

  uploadProductImage(id){
    this.common.uploadImage('product',this.productImage, id).then( res => {
      return;
    })
  }

  getImage() {
    this.common.selectImage().then(response => {
      //console.log(response);
      this.common.takePicture(response).then(image => {
        this.productImage = image;
        this.isTakenPicture = true;
      }, err => {
        this.isTakenPicture = false;
      })
    });
  }

}
