const controller = {};

const { apiKey, apiSecret } = require("../config.json").coinbase;
const Client = require("coinbase").Client;

controller.sellPrice = async (req, res) => {
  try {
    const client = new Client({ apiKey, apiSecret });
    client.getSellPrice({'currencyPair': 'BTC-USD'}, function(err, data) {
        res.json(data);
    });
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = controller;
