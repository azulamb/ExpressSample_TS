import App = require( './App' );
import Auth = require( './Auth' );
import API = require( './API' );

const app = new App();

const PORT = process.env.PORT || 3080;

const auth = new Auth();
auth.addTwitterAuth( app, parseInt( process.env.COOKIE_TIME ) || 0, PORT );

app.setDocumentRoot( './docs' );

app.addRoute( '/auth', auth );
app.addRoute( '/api', new API() );

app.start( PORT );
