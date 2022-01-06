const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cookie = require('cookie-parser');



// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie());
app.use('/', require('./app/routes/route'));
app.use('/', require('./app/routes/contactRoute'));
app.use('/', require('./app/routes/categoryRoute'));
app.use('/', require('./app/routes/testimonialRoute'));
app.use('/', require('./app/routes/portfolioRoute'));

app.use(express.static('app/upload'));





const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${3000}...`));