import axios from 'axios';
import { apis } from '@constants';

export const findPlaceFromLatLng = latlng => axios({
  url: apis.findPlaceFromLatLng.replace('{{latlng}}', latlng),
  method: 'GET',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
