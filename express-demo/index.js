const express = require('express');
const winston = require('winston');
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

	app.set('view engine','pug');
	app.set('views','./views');
	

const port=process.env.PORT || 8000;
const server=app.listen(port,()=>winston.info(`Hi i am listing to port ${port}`));
module.exports=server;