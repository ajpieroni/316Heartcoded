import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://duke-intrakit.sclintra.com/' // The external API URL // The base URL for your Rails proxy endpoint
});

export default instance;