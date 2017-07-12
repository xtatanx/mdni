import angular from 'angular';
import template from './map.html';

/**
 * Controller class for the map component.
 */
class MapController {
  /**
   * Instantiates a map controller
   * @param  {Object} mdniMapService Service to create maps.
   * @param  {JQLite} $element The current element.
   */
  constructor(mdniMapService, $element) {
    this.$jqElement = $element;
    this.element = $element[0];
    this.mapService = mdniMapService;
  }

  /**
   * Selects the component container and creates a map passing the binded data
   * as options.
   */
  $onInit() {
    const element = this.element.querySelector('.c-map__container');
    const options = {};

    if (angular.isDefined(this.center)) {
      options.center = this.center;
    }

    if (angular.isDefined(this.zoom)) {
      options.zoom = this.zoom;
    }

    this.instance = this.mapService.createMap(element, options);
    this.mapService.getAddresses().then((response) => {
      this.markers = response;
      this.placeMarkers();
    });
  }

  placeMarkers() {
    this.mapService.createMarkers(this.markers, this.instance);
  }
}

export default {
  template,
  controller: MapController,
  controllerAs: 'mdniMapCtrl',
  bindings: {
    center: '<',
    zoom: '<',
  },
};
