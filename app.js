const express = require('express');

const app = express();

const storeRoutes = require('./routes/store');

app.set('port', process.env.PORT || 8000);

app.use('/', storeRoutes);

app.listen(app.get('port'), function(){
	console.log(`server is listening on port ${app.get('port')}`);
})
