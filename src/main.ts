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
	(async () => {
		const key = await openpgp.generateKey({
			userIds: [{}], // you can pass multiple user IDs
			rsaBits: 4096, // RSA key size
			passphrase: 'super long and hard to guess secret', // protects the private key
		});
		console.log(key);
	})();
}
bootstrap();
