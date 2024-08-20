const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./app/models');
db.sequelize.sync({ force: true }).then(() => {
	console.log('Drop and re-sync db.');
});

const app = express();

let corsOptions = {
	origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of contents-type 0- application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
	res.json({ message: 'welcome to todo application.' });
});

require('./app/routes/tutorial.routes')(app);

// set port, liston for requests
const PORT = process.env.Port || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
