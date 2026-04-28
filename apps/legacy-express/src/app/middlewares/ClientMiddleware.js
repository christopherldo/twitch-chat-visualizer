const moment = require('moment');
const RequestsController = require("../controllers/RequestsController");

class ClientMiddleware {
  access_token = '';
  expires_at = moment();

  constructor() {}

  clientMiddleware = async (req, res, next) => {
    if (this.access_token === '' || this.expires_at.isBefore(new Date())) {
      await this.fetchAccessToken();
    }
    
    next();
  }

  getAccessToken() {
    return this.access_token;
  }

  async fetchAccessToken() {
    console.log('Fetching new ACCESS_TOKEN');

    const res =
      await RequestsController.twitchLogin(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
  
    const expiringDate = new moment();
    expiringDate.add(res['expires_in'], 'seconds');

    this.access_token = res['access_token'];
    this.expires_at = expiringDate;

    global.access_token = res['access_token'];
  }
}

module.exports = ClientMiddleware;