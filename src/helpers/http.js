import {default as axios} from 'axios';

const http = (url = 'https://sch.labura.go.id/absensiapi', data) => {
  return axios.create({
    baseURL: `${url}/`,
  });
};

export default http;
