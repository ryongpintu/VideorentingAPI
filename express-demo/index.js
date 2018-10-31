const express = require('express');
const winston = require('winston');
const exphbs=require('express-handlebars');
const app = express();
require('./startup/loggin')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')(app);
require('./startup/validation')();
require('./startup/prod')(app);
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );
app.use(express.static('public'));
app.engine('handlebars',exphbs({
  // helpers:{
  //   select:select,
  //   formatDate:formatDate,
  //   truncate:truncate,
  //   stripTags:stripTags,
  //   editIcon:editIcon
  // },
  defaultLayout:'main'
}));




app.set('view engine','handlebars');

	

const port=process.env.PORT || 8000;
const server=app.listen(port,()=>winston.info(`Hi i am listing to port ${port}`));
module.exports=server;