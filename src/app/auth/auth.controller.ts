import { Express, Request, Response } from 'express';

export class AuthController {
	constructor(private app: Express) {
		this.startController();
	}

	startController() {
		this.app.get('/login', this.login);
	}

	login(req: Request, res: Response) {
		console.log(req.body);

		res.status(400).send('400: Bad Request');
	}
}
