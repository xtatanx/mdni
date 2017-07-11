import angular from 'angular';
import template from './map.html';
import mapController from './map.controller';

export default angular.module('mdniMap', [])
  .component('mdniMap', {
    template,
    controller: mapController,
    controllerAs: 'mdniMapCtrl',
  }).name;
