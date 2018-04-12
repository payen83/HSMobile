import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  scrollTop(){
    //console.log('scrolltop');
    this.content.scrollToTop();
    //this.showScroll = false;
  }

  initMap() {
    let latitude = 3.1980954;
    let longitude = 101.6978543;

    let latlng = new google.maps.LatLng(latitude, longitude);

    let mapOptions = {
      center: latlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.map.panTo({ lat: latitude, lng: longitude });
    this.addMarker();
  }

  nav() {
    alert('test')
  }

  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    })

    let content = '<div style="max-width: 200px;">Your current location now my elements are ready for dom manipulation</div><br><button id="btnLocation" style="background-color: #4CAF50; border-radius: 2px; border: none; color: white; padding: 10px 40px; min-width: 200px; text-align: center; text-decoration: none; display: inline-block;">Navigate</button>';

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
