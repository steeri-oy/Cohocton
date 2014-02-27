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
  switch(req.params.product) {
    case 'dialog':
      client.cards(process.env.DIALOG_REVIEW_LIST_ID).on('complete', function(data) {
        res.send(data);
      });
      break;
    case 'cdm':
      res.send({error: 'No URL for CDM configured'});
      break;
    default:
      res.send({error: 'No product specified'});

  }
}

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.reviews = getReviewCards;
