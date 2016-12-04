import Express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import bodyParser from 'body-parser';
import routes from './routes';

const app = new Express();
const logger = morgan('dev');

app.use(logger);
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

routes(app);

export default app;
