const mapToken = 'mapToken';

const apis = {
  // Google service
  findPlaceFromLatLng: `https://maps.googleapis.com/maps/api/geocode/json?latlng={{latlng}}&key=${mapToken}&language=vi`,
};

export default apis;
