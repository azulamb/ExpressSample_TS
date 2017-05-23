import * as express from 'express';
import Router = require( './Router' );
const Info: AppVersionInfo = require( '../config.json' );

class API extends Router
{
	protected addAPI()
	{
		//this.router.use( ( req, res, next ) => { next(); } );

		this.router.get( '/', this.isAuthorized, this.version );
		this.router.post( '/', this.isAuthorized, this.version );

		this.router.get( '/echo/:val', this.isAuthorized, ( req, res, next ) =>
		{
			res.json( { message: 'Get value: ' + req.params.val, value: req.params.val } );
		} );
	}

	private version( req: express.Request, res: express.Response, next: express.NextFunction )
	{
		res.json( Info );
	}
}

export = API;
