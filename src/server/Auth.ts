import Router = require( './Router' );
import App = require( './App' );
import * as passport from 'passport';
import * as session from 'express-session';
import * as Twitter from 'passport-twitter';
import * as RedisStore from 'connect-redis';

const Store = RedisStore( session );

class Auth extends Router
{
	protected addAPI()
	{
		this.router.get( '/logout', (req, res) =>
		{
			if ( req.session ) { (<any>req.session).destroy(); }
			res.redirect( '/' );
		} );

		this.router.get( '/twitter', passport.authenticate( 'twitter' ) );

		this.router.get( '/twitter/callback',
			passport.authenticate( 'twitter', { failureRedirect: '/' } ),
			( req, res, next ) =>
			{
				res.redirect( '/app' );
			} );
	}

	public addTwitterAuth( app: App, loginttl: number, port: number )
	{

		app.setSession(
		{
			secret: process.env.SECRET_KEY || 'secret',
			resave: false,
			saveUninitialized: true,
			//rolling : true,
			store: new Store(
			{
				host: process.env.REDIS_HOST || '127.0.0.1',
				port: process.env.REDIS_PORT || 6379,
				prefix: 'sid:',
			} ),
			cookie:
			{
				//path: '/',
				maxAge: ( loginttl || 60 * 60 ) * 1000,
			},
		} );

		app.setPassport( new Twitter.Strategy(
		{
			consumerKey: process.env.TWITTER_CONSUMER_KEY || '',
			consumerSecret: process.env.TWITTER_CONSUMER_SECRET || '',
			callbackURL: (process.env.BASE_URL || ( port && port !== 80 ? 'http://localhost:' + port + '/' : 'http://localhost/' ) ) + 'auth/twitter/callback',
		},
		(token, tokenSecret, profile, done) =>
		{
			// OK : return done(null,profile);
			// Err : return done(null,false);
			// Exc : return done(null);
			process.nextTick( () =>
			{
				return done( null, { id: profile.id, token: 'testtoken' } );
			} );
		} ) );
	}
}

export = Auth;
