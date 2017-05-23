import * as express from 'express';

class Router
{
	protected router: express.Router;

	constructor()
	{
		this.router = express.Router();

		this.addAPI();
	}

	protected addAPI(){}

	public isAuthorized( req: express.Request, res: express.Response, next: express.NextFunction )
	{
		if ( !req.isAuthenticated() )
		{
			res.status( 401 );
			res.json( { message: 'Authorized error.' } );
			return;
		}
		next();
	}

	public get(): express.Router { return this.router; }
}

export = Router;
