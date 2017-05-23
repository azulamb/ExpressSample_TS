import * as express from 'express';
import * as passport from 'passport';
import * as session from 'express-session';
import Router = require( './Router' );

class App
{
	private app: express.Express;

	constructor()
	{
		this.app = express();

		//this.app.use( cookieParser() );
	}

	public setSession( options: session.SessionOptions )
	{
		this.app.use( session( options ) );
	}

	public setPassport( strategy: passport.Strategy)
	{
		passport.use( strategy );
		passport.serializeUser( ( user, done ) => { done( null, user ); } );
		passport.deserializeUser( ( user, done ) => { done( null, user ); } );

		this.app.use( passport.initialize() );
		this.app.use( passport.session() );
	}

	public setDocumentRoot( path: string )
	{
		this.app.use( express.static( path ) );
	}

	public addRoute( path: string, route: Router )
	{
		this.app.use( path, route.get() );

	}

	public start( port: number )
	{
		this.app.listen( port );
	}
}

export = App;