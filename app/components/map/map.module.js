import angular from 'angular';
import MapComponent from './map.component';
import MapService from './map.service';
import './map.styl';

export default angular.module('mdniMap', [])
  .component('mdniMap', MapComponent)
  .service('mdniMapService', MapService)
  .name;
