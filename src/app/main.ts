import * as bodyParser from 'body-parser';
import * as express from 'express';
import { AuthController } from './auth/auth.controller';

function bootstrap() {
	const port = 3000;
	const openpgp = require('openpgp');

	const app = express();
	app.use(bodyParser.urlencoded({ extended: true }));

	const ac = new AuthController(app);

	app.listen(port, () => {
		console.log(`App listening on port: ${port}`);
	});
}
bootstrap();
