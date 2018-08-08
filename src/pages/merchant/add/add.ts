import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { CommonProvider } from '../../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  productImage: any;
  constructor(public common: CommonProvider, public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AddPage');
  }

  save(){

  }

  getImage(){
    this.common.selectImage().then(response => {
      //console.log(response);
      this.common.takePicture(response).then(image => {
        this.productImage = image;
      })
    });
  }

  // takePicture(source){
  //   let pictureSource: any;

  //   if(source == 'camera'){
  //     pictureSource = this.camera.PictureSourceType.CAMERA;
  //   } else {
  //     pictureSource = this.camera.PictureSourceType.PHOTOLIBRARY;
  //   }

  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.PNG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     sourceType: pictureSource,
  //     correctOrientation: true
  //   }
    
  //   this.camera.getPicture(options).then((imageData) => {
  //     //let base64Image = 'data:image/jpeg;base64,' + imageData;
  //     this.productImage = normalizeURL(imageData);
  //   }, (err) => {
  //    // Handle error
  //   });

  // }

}
