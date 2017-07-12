import angular from 'angular';

const MAP_DEFAULTS = {
  center: {
    lat: 0,
    lng: 0,
  },
  zoom: 8,
};

/**
 * Map service helps creating new map instances and aswell cehcking that google
 * maps is loaded before trying to instantiate any of those.
 */
class MapService {
  /**
   * Instantiate service
   * @param  {!Angular.$interval} $interval Angular $interval service.
   * @param  {!Angular.$q} $q Angular $q service.
   * @param  {!Angular.$http } $http Angular $http service.
   */
  constructor($interval, $q, $http, $window) {
    this.$interval = $interval;
    this.$q = $q;
    this.$http = $http;
    this.$window = $window;
    this.geocoder = new $window.google.maps.Geocoder();
    this.instances = [];
  }

  /**
   * Creates an instance of a map and saved in the services instances array.
   * @param  {Element} element An HTML element to instantiate the map.
   * @param  {Object} options Options to configure the instance.
   * @return {Object} The google maps instance.
   */
  createMap(element, options = MAP_DEFAULTS) {
    const mergedOptions = angular.extend({}, MAP_DEFAULTS, options);
    const instance = new this.$window.google.maps.Map(element, mergedOptions);
    this.instances.push(instance);
    return instance;
  }

  /**
   * [getAddresses description]
   * @return {[type]} [description]
   */
  getAddresses() {
    return this.$http.get('./data/addresses.dat')
      .then(MapService.parseAddresses)
      .catch(() => 'There was a aproblem getting the data.');
  }

  /**
   * [parseAddresses description]
   * @param  {[type]} addressesFile [description]
   * @return {[type]}               [description]
   */
  static parseAddresses(addressesFile) {
    const addressesList = addressesFile.data.split('\n')
      .filter(string => string.trim() !== '');
    return addressesList;
  }

  createMarkers(addresses, mapInstance) {
    const latLngBounds = new this.$window.google.maps.LatLngBounds();
    addresses.forEach((address) => {
      this.geocoder.geocode({
        address,
      }, (result, status) => {
        if (status === 'OK') {
          if (result[0]) {
            const location = result[0].geometry.location;
            const marker = new this.$window.google.maps.Marker({
              map: mapInstance,
              position: location,
            });
            latLngBounds.extend(marker.getPosition());
            mapInstance.fitBounds(latLngBounds);
          }
        }
      });
    });
  }
}

export default MapService;
