import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content, LoadingController} from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;



@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild(Content) content: Content;

  map: any;
  markerlatlong: any;
  coords: string = 'Drag your marker';
  showMap: boolean;
  autocompleteItems: any;
  autocomplete: any;
  markers: Array<any> = [];
  service = new google.maps.places.AutocompleteService();
  selectedLocation: any;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private zone: NgZone) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  ionViewDidLoad() {
    this.showMap = true;
    this.initMap();
  }

  updateSearch() {
    
    if (this.autocomplete.query == '') {
      this.displayMap();
      this.autocompleteItems = [];
      return;
    }

    let me = this;
    this.service.getPlacePredictions({
      input: this.autocomplete.query,
      componentRestrictions: {
        //country: 'my'
      }
    }, (predictions, status) => {
      me.autocompleteItems = [];

      me.zone.run(() => {
        if (predictions != null) {
          this.showMap = false;
          predictions.forEach((prediction) => {
            me.autocompleteItems.push(prediction.description);
          });
        }
      });
    });
  }

  chooseItem(item: any) {
    let loading = this.loadingCtrl.create({
      spinner: 'circles'
    });
  
    loading.present();

    this.autocomplete.query = item;
     
    //convert Address to lat and long
    this.geoCode(item).then((result) => {
      loading.dismiss();
      let latlng: any = result;
      //console.log('results: + '+JSON.stringify(latlng))
      this.removeMarkers();
      this.addMarker(latlng.lat, latlng.lng, item);
      this.map.panTo({ lat: latlng.lat, lng: latlng.lng });
      this.selectedLocation = {address: item, coords: latlng};
      this.displayMap();
    })
    .catch(err=>{
      console.log('Error in getting latlng: '+ JSON.stringify(err))
    });
    
  }

  geoCode(address:any) {
    let geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ 'address': address }, (results, status) => {
        //console.log('status: '+status+' results: '+JSON.stringify(results))
        let latitude: any = results[0].geometry.location.lat();
        let longitude: any = results[0].geometry.location.lng();
        resolve({lat: latitude, lng: longitude});
      }, err => {
        reject(err);
      });
   });
 }

  displayMap(){
      this.showMap = true;
  }

  initMap() {
    let latitude = 3.1980954;
    let longitude = 101.6978543;

    let latlng = new google.maps.LatLng(latitude, longitude);

    let mapOptions = {
      center: latlng,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.map.panTo({ lat: latitude, lng: longitude });
    this.addMarker(latitude, longitude, 'drag this icon');
  }

  removeMarkers(){
    for(var i=0; i<this.markers.length; i++){
        this.markers[i].setMap(null);
    }
  }

  addMarker(lat, lng, message) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      //position: this.map.getCenter(),
      position: new google.maps.LatLng(lat, lng),
      draggable: true
    })

    this.markers.push(marker);

    let content = message;

    if (content != 'drag this icon'){
      content = '<div style="max-width: 200px;">'+message+'</div>';
    }

    let infoWindow = new google.maps.InfoWindow({
      content: content
    })
    
    infoWindow.open(this.map, marker);

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });  

    google.maps.event.addListener(marker, 'dragend', (res) => {
        this.getAddress(marker.position.lat(), marker.position.lng()).then((results)=>{
          // infoWindow.setContent(JSON.stringify(this.markerlatlong))
          let content = '<div style="max-width: 200px;">' + results + '</div>';
          this.selectedLocation = {address: results, coords: {lat: marker.position.lat(), lng: marker.position.lng() }};
          infoWindow.setContent(content);
        }).catch(err=>{
          infoWindow.setContent('Error: '+JSON.stringify(err));
        });
    });

  }

  closeMap(){
    this.viewCtrl.dismiss();
  }

  getAddress(lat, lng): Promise<any> {
    //console.log(lat + ', ' + lng);
    let geocoder = new google.maps.Geocoder;
    let latlng = {lat: lat, lng: lng};
    return new Promise((resolve, reject) => {
      geocoder.geocode({ 'location': latlng }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            resolve(results[0].formatted_address);
          } else {
            reject ('No results found');
          }
        } else {
          reject ('Geocoder failed due to: ' + status);
        }
      });
    })
    
  }

  saveMap(){
    this.viewCtrl.dismiss(this.selectedLocation);
  }



}
