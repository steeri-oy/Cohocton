var rest = require('restler');
/*
 * GET home page.
 */

Trello = rest.service(function() {
  this.key = process.env.TRELLO_API_KEY;
  this.token = process.env.TRELLO_API_TOKEN;
}, {
  baseURL: process.env.TRELLO_API_URL
}, {
  cards: function(list_id) {
    return this.get('lists/'+list_id+'/cards', {query: {key: this.key, token: this.token}});
  }
});

var client = new Trello();

function getReviewCards(req, res) {
  req.accepts('json, text');
  res.type('json');
  switch(req.params.product) {
    case 'dialog':
      client.cards(process.env.DIALOG_REVIEW_LIST_ID).on('complete', function(data) {
        res.send(data);
      });
      break;
    case 'cdm':
      console.error('No URL for CDM configured');
      res.send({});
      break;
    default:
      console.error('No priduct given, can\'t get cards');
      res.send({});

  }
}

exports.index = function(req, res){
  res.render('index', { title: 'Open review cards' });
};

exports.reviews = getReviewCards;
