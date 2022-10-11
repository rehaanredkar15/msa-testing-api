/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const router = require('./src/v1/router');
const DBConnect = require('./database/DBConnect');
const { verifyFCMToken } = require('./middleware/authMiddleware');
const swaggerUi = require('swagger-ui-express');


swaggerDocument = require('./swagger.json');

// const { signAdminAccessToken, signAdminRefreshToken } = require('./helpers/jwt_helper');
const {
  headerFunction,
  errHandler,
} = require('./middleware/errorMiddleware');

// loading the env variables
dotenv.config({ path: './config/config.env' });

// getting the port from the environment variables
const PORT = process.env.PORT;

// initializing the express app
const app = express();

// setting up the cors
app.use(cors());

// adding helmet
app.use(helmet());

// limiting the request body
app.use(express.json({ limit: '20kb' }));

// Data Sanitization against XSS by preventing users from inserting HTML & Scripts on input.
app.use(xss());
app.use(mongoSanitize());

// configuring the body parser for parsing the data with req
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// header function
app.all('*', headerFunction);

// our server listening
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

// connecting to the database
DBConnect();

// error handlers
app.use(errHandler);
// app.use(notFound);
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.send({
//     error: {
//       status: err.status || 500,
//       message: err.message,
//     },
//   });
// });

//swagger ui
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// api working check
app.get('/', async (req, res) => {
  try {
    // const token = await signAdminAccessToken(req.Id);
    // const refToken = await signAdminRefreshToken(req.Id);
    res.status(200).send({
      message: 'Welcome to Connect Masjid API',
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
});

// adding the routing file
app.use('/v1', router);
