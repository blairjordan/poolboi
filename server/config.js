const CB_API_KEY = "CB_API_KEY";
const CB_SECRET = "CB_ACCOUNT_SERCRET";
const CB_ACCOUNT = "CB_ACCOUNT_ID";

var Client = require('coinbase').Client;

var client = new Client({'apiKey': CB_API_KEY,
                         'apiSecret': CB_SECRET});

/*
client.getAccount(CB_ACCOUNT, function(err, account) {
  console.log(err);
  account.getTransactions(function(err, txs) {
    console.log(txs);
  });
});
/*/
var client = new Client({'apiKey': 'API KEY', 
                         'apiSecret': 'API SECRET'});

client.getSellPrice({'currencyPair': 'BTC-USD'}, function(err, price) {

  console.log(52/price.data.amount); // +$2.99 USD for $50-200 ? check on next transfer
});