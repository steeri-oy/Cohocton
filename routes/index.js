var rest = require('restler');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.reviews = function(req, res){
  console.log(req.params.product);
  switch(req.params.product) {
    case 'dialog':
      rest.get(process.env.TRELLO_API_URL+'lists/'+process.env.DIALOG_REVIEW_LIST_ID+, {query:{key: process.env.TRELLO_API_KEY, token: process.env.TRELLO_API_TOKEN}}).on('complete', function(data) {
        console.log(data);
      });
      break;
    case 'cdm':
      break;
    default:
      console.error('No product specifed');
  }
  res.send("Get reveiws for passed product");
};
