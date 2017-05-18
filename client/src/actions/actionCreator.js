import axios from 'axios';

export function getProfile() {
  let profileData = axios.get(API_ENDPOINT + '/api/teachers')
  return {
    type: 'GET_PROFILE',
    payload: profileData
  }
}
