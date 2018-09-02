import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';
import { CommonProvider, Jobs } from '../../../providers/providers';

declare var google: any;

@IonicPage()

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild(Content) content: Content;

  map: any;
  showScroll: boolean = false;
  job: any;

  constructor(public alertCtrl: AlertController, public jobs: Jobs, public navCtrl: NavController, public navParams: NavParams, public common: CommonProvider) {
    this.job = this.navParams.get('item');
    console.log(this.job)
  }
  scrollTop(){
    //console.log('scrolltop');
    this.content.scrollToTop();
    //this.showScroll = false;
  }

  initMap() {
    let latitude = this.job.latitude || 101.6978543;
    let longitude = this.job.longitude || 3.1980954;

    console.log(latitude +', '+longitude) 

    let latlng = new google.maps.LatLng(parseFloat(longitude), parseFloat(latitude));

    let mapOptions = {
      center: latlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.map.panTo({ lat: parseFloat(longitude), lng: parseFloat(latitude) });
    this.addMarker();
  }

  getImage(url: string){
    if(url == null){
      return null;
    } else {
      return this.common.getProfileImage_URL() +url;
    }
  }

  getProductImage(url: string) {
    if (url == null) {
      return null;
    } else {
      return this.common.getAPI_URL() + url;
    }
  }

  nav() {
    alert('test')
  }

  call(){
    if(this.job.u_phone){
      this.common.call((this.job.u_phone).toString());
      console.log(this.job.u_phone);
    } else {
      return;
    }
    //this.common.call(this.job);
  }

  wa(){
    if(this.job.u_phone){
      this.common.openWhatsapp(this.job.u_phone);
    } else {
      return;
    }
  }

  markComplete(){
    const confirm = this.alertCtrl.create({
      title: 'Complete Delivery',
      message: 'Are you sure you want to mark this job as delivered?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        { 
          text: 'Yes',
          handler: () => {
            this.jobs.markAsComplete(this.job.JobID).then(res => {
              console.log(res)
              this.common.showAlert('Job Delivered','Your job has been marked as delivered and will be verified by customer.');
              this.navCtrl.pop();
            }, err => {
              this.common.showAlert('Error', JSON.stringify(err));
            })
          }
        }
      ]
    });
    confirm.present();
  }

  showStar(){
    return this.job.job_rating != "0.0";
  }

  showRating(){
    if (this.job.job_rating == "0.0"){
      return null;
    } else {
      return this.job.job_rating;
    }
  }

  showFeedback(){
    if (this.job.job_rating == "0.0"){
      return null;
    } else {
      return this.job.job_feedback;
    }
  }

  showRatingText(){
    if (this.job.job_rating == "0.0"){
      return null;
    } else {
      return 'Feedback';
    }
  }

  isActive(){
    return this.job.current_status === 'Active';
  }

  isCompleted(){
    return this.job.current_status === 'Completed';
  }

  isPending(){
    return this.job.current_status === 'Pending Completion';
  }

  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    })

    let content = '<div style="max-width: 200px;">'+this.job.c_address+'</div><br><button id="btnLocation" style="background-color: #4CAF50; border-radius: 2px; border: none; color: white; padding: 10px 40px; min-width: 200px; text-align: center; text-decoration: none; display: inline-block;">Navigate</button>';

    let infoWindow = new google.maps.InfoWindow({
      content: content
    })

    google.maps.event.addListener(infoWindow, 'domready', () => {
      //now my elements are ready for dom manipulation
      var clickableItem = document.getElementById('btnLocation');
      clickableItem.addEventListener('click', () => {
        console.log('test');
      });
    });

    //google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    //});  

    this.map.panBy(0, 150);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    this.initMap()
  }

}
